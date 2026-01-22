import { useCallback, useEffect, useMemo, useState } from 'react';
import WebTool from '../../WebTool';
import { deepCopyGrid, getBoardValidity, isBoardFull, isBoardSolvable, isBoardValid, isGameOver } from './SudokuBoardStateChecks';
import './Sudoku.css';
import type { SudokuGridType } from './SudokuGrid/SudokuGrid';
import SudokuGrid from './SudokuGrid/SudokuGrid';




type fff = {
  index: number;
  missingValues: number[];
};
type f2 = {
  boxRow: number;
  boxCol: number;
  missingValues: number[];
};

export type SudokuMove = {
  row: number;
  col: number;
  num: number;
};

export type SudokuValidityFailures = {
  rows: fff[];
  cols: fff[];
  boxes: f2[];
  other: string[];
};

interface SelectedCell {
  row: number;
  col: number;
}

export default function Sudoku() {
  const allNums = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9], []);
  const debug = false;

  /// -- Initializing board state on load. --
  const [solveableStatus, setSolveableStatus] = useState<'yes' | 'no' | 'checking'>('yes');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [lastBotMove, setLastBotMove] = useState<SudokuMove | null>(null);
  const [lastPlayerMove, setLastPlayerMove] = useState<SudokuMove | null>(null);
  const [validityFailures, setValidityFailures] = useState<SudokuValidityFailures | null>(null);

  type UpdateValuesParams = {
    row: number;
    col: number;
    num: number | null;
  };
  const updateGridCellWithValue = useCallback((grid: SudokuGridType, {row, col, num}: UpdateValuesParams) => {
    const newGrid = grid.map((r, rowIdx) =>
      r.map((cell, colIdx) =>
        rowIdx === row && colIdx === col ? { value: num, validOptions: [] } : cell
      )
    );
    // update all items in the same row, column, and box to remove this number from validOptions
    for (let i = 0; i < 9; i++) {
      // Row
      if (newGrid[row][i].value === null) {
        newGrid[row][i].validOptions = newGrid[row][i].validOptions.filter(n => n !== num);
      }
      // Column
      if (newGrid[i][col].value === null) {
        newGrid[i][col].validOptions = newGrid[i][col].validOptions.filter(n => n !== num);
      }
    }
    // Box
    const boxStartRow = Math.floor(row / 3) * 3;
    const boxStartCol = Math.floor(col / 3) * 3;
    for (let r = boxStartRow; r < boxStartRow + 3; r++) {
      for (let c = boxStartCol; c < boxStartCol + 3; c++) {
        if (newGrid[r][c].value === null) {
          newGrid[r][c].validOptions = newGrid[r][c].validOptions.filter(n => n !== num);
        }
      }
    }
    return newGrid;
  }, []);
  const updateGridWithValues = useCallback((grid: SudokuGridType, updates: UpdateValuesParams[]): SudokuGridType => {
    for (const update of updates) {
      grid = updateGridCellWithValue(grid, update);
    }
    return grid;
  }, [updateGridCellWithValue]);
  const createStartingGrid = useCallback((): SudokuGridType => {
    // First create a blank grid.
    const blankGrid =  Array(9).fill(null).map(() => Array(9).fill(null).map(() => ({ value: null, validOptions: [...allNums] })));
    const sudoGrid = updateGridWithValues(blankGrid, [
      { row: 0, col: 0, num: 1 },
      { row: 1, col: 1, num: 2 },
      { row: 2, col: 2, num: 3 },
      { row: 3, col: 3, num: 4 },
      { row: 4, col: 4, num: 5 },
      { row: 5, col: 5, num: 6 },
      { row: 6, col: 6, num: 7 },
      { row: 7, col: 7, num: 8 },
      { row: 8, col: 8, num: 9 },
    ]);
    return sudoGrid;
  }, [allNums, updateGridWithValues]);
  const [grid, setGrid] = useState<SudokuGridType>(createStartingGrid());  

  
  /// --- Game State Updates ---
  const updateGameCellWithValue = useCallback((row: number, col: number, num: number | null) => {
    setGrid((prevGrid) => updateGridCellWithValue(prevGrid, { row, col, num }));
  }, [updateGridCellWithValue]);

  const onTurnEnd = useCallback(() => {
    setIsPlayerTurn((prev) => !prev);
    checkIfBoardIsSolvable();
    setSelectedCell(null);
  }, []);

  function handleResetGame() {
    setGrid(createStartingGrid());
    setIsPlayerTurn(true);
    setSelectedCell(null);
    setSolveableStatus('yes');
    setLastBotMove(null);
    setLastPlayerMove(null);
    setValidityFailures(null);
  }


  /// --- Handle Player Actions ---
  function handleCellClick(row: number, col: number) {
    if (!isPlayerTurn) { return; }
    setSelectedCell({ row, col });
  }
  
  function handlePlayerNumberSelect(num: number | null) {
    if (isPlayerTurn && selectedCell) {
      updateGameCellWithValue(selectedCell.row, selectedCell.col, num);
      setLastPlayerMove({ row: selectedCell.row, col: selectedCell.col, num: num as number });
      onTurnEnd();
    }
  }

  

  /// --- Bot Actions ---
  type EmptyCell = {
    row: number;
    col: number;
    validOptions: number[];
  };
  const getEmptyCells = useCallback((testGrid: SudokuGridType): EmptyCell[] => {
    const emptyCells: EmptyCell[] = [];
    testGrid.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (cell.value === null && cell.validOptions.length > 0) {
          emptyCells.push({ row: rowIdx, col: colIdx, validOptions: cell.validOptions });
        }
      });
    });
    return emptyCells;
  }, []);

  type TryBotOptionsParams = {
    targetGrid: SudokuGridType;
    emptyCells: EmptyCell[];
  };
  type TryBotChoice = {
    chosenCell: EmptyCell, chosenValue: number
  };
  const tryBotOptions = useCallback(({
    targetGrid,
    emptyCells,
  }: TryBotOptionsParams): TryBotChoice | null => {
    let testGrid = deepCopyGrid(targetGrid);
    while (emptyCells.length > 0) {
      const randomCellIndex = Math.floor(Math.random() * emptyCells.length);
      const randomCell: EmptyCell = emptyCells[randomCellIndex];
      const randomOptionIndex = Math.floor(Math.random() * randomCell.validOptions.length);
      const randomOption: number = randomCell.validOptions[randomOptionIndex];

      console.log(`Can still try ${emptyCells.length} cells:`, emptyCells);
      console.log(`The bot is trying to put ${randomOption} at cell:`, randomCell);

      // Test the random option on the testGrid.
      const resultGrid = updateGridCellWithValue(testGrid, { row: randomCell.row, col: randomCell.col, num: randomOption });
      const isSolveable = isBoardSolvable(resultGrid, () => { });

      if (isSolveable) {
        // If solveable, commit the move.
        console.log('The bot found a valid move:', randomCell, randomOption);
        return { chosenCell: randomCell, chosenValue: randomOption };

      } else {
        console.log('The bot move was invalid, trying again.');
        // Remove this option from validOptions and try again
        randomCell.validOptions = randomCell.validOptions.filter(n => n !== randomOption);
        if (randomCell.validOptions.length === 0) {
          // If we run out of options to try, remove this cell from consideration
          emptyCells.splice(randomCellIndex, 1);
        }
        // Reset testGrid
        testGrid = deepCopyGrid(targetGrid);
      }
    };
    return null;
  }, [updateGridCellWithValue]);

  const commitBotChoice = useCallback((chosenCell: EmptyCell, value: number) => {
    updateGameCellWithValue(chosenCell.row, chosenCell.col, value);
    setLastBotMove({ row: chosenCell.row, col: chosenCell.col, num: value });
  }, [updateGameCellWithValue]);

  // const [botChoice, setBotChoice] = useState<TryBotChoice | null>(null);

  const botTurn = useCallback((targetGrid: SudokuGridType) => {
    if (isGameOver(targetGrid)) { return; }
    
    console.log('Bot turn starting...');
    const testGrid = deepCopyGrid(targetGrid);
    console.log('Bot test grid:', testGrid);
    const emptyCells: EmptyCell[] = getEmptyCells(testGrid);
    console.log('Bot found empty cells:', emptyCells);
    
    if (emptyCells.length > 0) {
      const choice = tryBotOptions({ targetGrid: testGrid, emptyCells });
      if (choice) {
        commitBotChoice(choice.chosenCell, choice.chosenValue);
        //setBotChoice(choice);
      } else {
        // No valid moves found
        console.log('Bot could not find any valid moves.');
      }
    } else {
      // No valid moves left for bot
      console.log('Bot has no valid moves left.');
    }

    onTurnEnd();
  }, [getEmptyCells, commitBotChoice, onTurnEnd, tryBotOptions]);

  // const testBotsDesiredTurn = useCallback(() => {
  //   console.log('===================================');
  //   if (!botChoice) {
  //     console.log('No bot choice to test.');
  //     console.log('===================================');
  //     return;
  //   } else {
  //     console.log('Testing bot choice:', botChoice);
  //     console.log(`Placing the number ${botChoice.chosenValue} at cell (Row: ${botChoice.chosenCell.row+1}, Column: ${botChoice.chosenCell.col+1})`);
  //   }
  //   const initialGrid = deepCopyGrid(grid);
  //   const solv1 = isBoardSolvable(initialGrid, () => { }, true);
  //   const resultGrid = updateGridCellWithValue(initialGrid, {
  //     row: botChoice.chosenCell.row,
  //     col: botChoice.chosenCell.col,
  //     num: botChoice.chosenValue
  //   });
  //   const solv2 = isBoardSolvable(resultGrid, () => { }, true);

  //   console.log(`Testing bot's desired turn: Cell(${botChoice.chosenCell.row+1}, ${botChoice.chosenCell.col+1}) = ${botChoice.chosenValue}`);
  //   console.log(`Board solvability before move: ${solv1}, after move: ${solv2}`);
  //   console.log('===================================');

  // }, [botChoice, grid, updateGridCellWithValue]);




  /// --- Board State Checks ---
  const checkIfBoardIsSolvable = () => { setSolveableStatus('checking'); };

  // Triggers when we need to check solveability.
  useEffect(() => {
    if (solveableStatus === 'checking') {
      // Simulate checking solveability
      const solvable = isBoardSolvable(grid, setValidityFailures);
      setSolveableStatus(solvable ? 'yes' : 'no');
      //setCheckingSolvability(false);
    }
  }, [solveableStatus, grid]);

  // Triggers whenever the player turn ends to let the bot act.
  // useEffect(() => {
  //   if (!isPlayerTurn) {
  //     // After player turn, let bot play
  //     botTurn();
  //     //setIsPlayerTurn(true);
  //   }
  // }, [botTurn, isPlayerTurn]);


  const boardStateDebuggerView = (show: boolean) => {
    if (!show) return null;
    return (<>
      <div className='board-state-dump'>
        <span className={isPlayerTurn ? 'green' : 'red'}>
          isPlayerTurn? {isPlayerTurn.toString()}
        </span>
        <span className='split'>--</span>
        <span className={isBoardFull(grid) ? 'green' : 'red'}>
          isBoardFull? {isBoardFull(grid).toString()}
        </span>
        <span className='split'>--</span>
        <span className={isBoardValid(grid) ? 'green' : 'red'}>
          isBoardValid? {isBoardValid(grid).toString()}
        </span>
        <span className='split'>--</span>
        <span className={solveableStatus === 'checking' ? 'yellow' : (solveableStatus === 'yes' ? 'green' : 'red')}>
          isBoardSolvable? {solveableStatus === 'checking' ? 'Checking...' : solveableStatus}
        </span>
      </div>
    </>)
  }

  const gameStateHeader = () => {
    const winner = (isGameOver(grid)
      && isBoardValid(grid)
      && isBoardFull(grid)
    );
    return (
      <div className="game-state-header">
        {isGameOver(grid)
          ? (winner ? 'Success!' : 'Game Over!')
          : 'Play On!'}
      </div>
    );
  };

  type DupeParams = {
    type: 'Column' | 'Row' | 'Box';
    num: number;
    index: number;
  }
  const dupeText = ({type, num, index}: DupeParams) => {
    return (<>
      The number <b>{num}</b> appears more than once in <b>{type} {index+1}</b>.
    </>);
  };

  const validationStateDisplay = () => {
    const boardvalidity = getBoardValidity(grid);
    console.log('Board is invalid due to duplicity errors:', boardvalidity);
    if (!boardvalidity.valid) {
      return (
        <div className="validity-failures">
          <h4>Board State Errors:</h4>
          {boardvalidity.rowDupes.map(r => dupeText({type: 'Row', num: r.number, index: r.row}))}
          {boardvalidity.colDupes.map(r => dupeText({type: 'Column', num: r.number, index: r.col}))}
          {boardvalidity.boxDupes.map(b => dupeText({type: 'Box', num: b.number, index: b.boxRow * 3 + b.boxCol}))}
        </div>
      );
    }

    if (!validityFailures) { return null; }
    if (
      (validityFailures.rows.length ?? 0) === 0
      && (validityFailures.cols.length ?? 0) === 0
      && (validityFailures.boxes.length ?? 0) === 0
    ) {
      return null;
    }

    return (
      <div className="validity-failures">
        <h4>Board State Errors:</h4>
        {(validityFailures?.rows.length ?? 0) > 0 && (<>
          {noLongerUseHtml1({type: 'rows', fails: validityFailures?.rows??[]})}
        </>)}

        {(validityFailures?.cols.length ?? 0) > 0 && (<>
          {noLongerUseHtml1({type: 'cols', fails: validityFailures?.cols??[]})}
        </>)}

        {(validityFailures?.boxes.length ?? 0) > 0 && (<>
          {noLongerUseHtml2({type: 'boxes', fails: validityFailures?.boxes??[]})}
        </>)}
      </div>
    );
  }

  type RenderParams1 = {
    type: 'cols' | 'rows';
    fails: fff[];
  };
  const noLongerUseHtml1 = ({type, fails}: RenderParams1) => {
    return (<>
      {(fails).map((fail, index) => (
        <div key={index}>
          You can no longer play the
          number {fail.missingValues.length !== 1 ? 's' : ''} <b>
            {fail.missingValues.join(', ')}
          </b> in <b>{dispText({type, fail})}</b>.
        </div>
        ))}
    </>);
  }
  type RenderParams2 = {
    type: 'boxes';
    fails: f2[];
  };
  const noLongerUseHtml2 = ({type, fails}: RenderParams2) => {
    return (<>
      {(fails).map((fail, index) => (
        <div key={index}>
          You can no longer play the
          number {fail.missingValues.length !== 1 ? 's' : ''} <b>
            {fail.missingValues.join(', ')}
          </b> in <b>{dispText({type, fail})}</b>.
        </div>
        ))}
    </>);
  }
  type RendTextParams = {
    type: 'cols' | 'rows';
    fail: fff;
  } | {
    type: 'boxes';
    fail: f2;
  };
  const dispText = ({type, fail}: RendTextParams) => {
    switch(type) {
      case 'rows': return `Row ${fail.index+1}`;
      case 'cols': return `Column ${fail.index+1}`;
      case 'boxes': return `Box (Row: ${fail.boxRow+1}, Column: ${fail.boxCol+1})`;
    };
    return 'SOMETHING WRONG';
  };

  return (
    <WebTool css="sudoku-tool">
      <h3>Sudoku</h3>
      <p className="description-text">
        You and a simple bot take turns filling out the grid using the standard sudoku rules.
        Click a cell to select it, then choose a number from the selector. The bot will automatically
        fill in a random valid number in an empty cell on its turn. Try to keep the board valid
        and solvable as you add more numbers. Completely fill the board to win!
      </p>

      {boardStateDebuggerView(debug)}

      {gameStateHeader()}

      {validationStateDisplay()}

      <div className="sudoku-container">
        <SudokuGrid
          grid={grid}
          validityFailures={validityFailures}
          lastBotMove={lastBotMove}
          lastPlayerMove={lastPlayerMove}
          // botDesiredChoice={botChoice}
          botDesiredChoice={null}
          selectedCell={selectedCell}
          handleCellClick={handleCellClick}
          boardValidity={getBoardValidity(grid)}
        />

        {selectedCell && (
          <div className="number-selector-overlay" onClick={() => setSelectedCell(null)}>
            <div className="number-selector" onClick={(e) => e.stopPropagation()}>
              <h4>Select Number</h4>
              <div className="number-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    className="number-button"
                    onClick={() => handlePlayerNumberSelect(num)}
                  >
                    {num}
                  </button>
                ))}
                <div className="gap"></div>
                <button
                  className="number-button close-cell"
                  onClick={() => setSelectedCell(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sudoku-controls">
        <button onClick={() => {
          setIsPlayerTurn(false);
          botTurn(grid);
        }}>
          Make Bot Go
        </button>
        {/* <button className="tool-button" onClick={testBotsDesiredTurn}>
          Test Bot's Desired Turn: {botChoice ? ` Cell (${botChoice.chosenCell.row+1}, ${botChoice.chosenCell.col+1}) = ${botChoice.chosenValue}` : 'No Choice Yet'}
        </button>
        <button className="tool-button" onClick={() => {
          if (botChoice) {
            commitBotChoice(botChoice.chosenCell, botChoice.chosenValue);
            setBotChoice(null);
          }
        }}>
          Commit Bot Choice: {botChoice ? ` Cell (${botChoice.chosenCell.row+1}, ${botChoice.chosenCell.col+1}) = ${botChoice.chosenValue}` : 'No Choice Yet'}
        </button> */}
        <button className="tool-button" onClick={handleResetGame}>
          Reset Game
        </button>
      </div>
    </WebTool>
  );
}
