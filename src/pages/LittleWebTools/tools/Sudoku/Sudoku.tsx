import { useCallback, useEffect, useMemo, useState } from 'react';
import WebTool from '../../WebTool';
import { deepCopyGrid, getBoardValidity, isBoardFull, isBoardSolvable, isBoardValid, isGameOver } from './SudokuBoardStateChecks';
import './Sudoku.css';
import type { SudokuGridType } from './SudokuGrid/SudokuGrid';
import SudokuGrid from './SudokuGrid/SudokuGrid';




type RowColumnFailure = {
  index: number;
  missingValues: number[];
};
type BoxFailure = {
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
  rows: RowColumnFailure[];
  cols: RowColumnFailure[];
  boxes: BoxFailure[];
  other: string[];
};

interface SelectedCell {
  row: number;
  col: number;
}

const GRID_SIZE = 9;
const BOX_SIZE = 3;

export default function Sudoku() {
  const allNums = useMemo(() => Array.from({ length: GRID_SIZE }, (_, i) => i + 1), []);
  const debug = false;

  /// -- Initializing board state on load. --
  const [solveableStatus, setSolveableStatus] = useState<'yes' | 'no' | 'checking'>('yes');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [lastBotMove, setLastBotMove] = useState<SudokuMove | null>(null);
  const [lastPlayerMove, setLastPlayerMove] = useState<SudokuMove | null>(null);
  const [validityFailures, setValidityFailures] = useState<SudokuValidityFailures | null>(null);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [overlayMessage, setOverlayMessage] = useState<string | null>(null);

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
    for (let i = 0; i < GRID_SIZE; i++) {
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
    const boxStartRow = Math.floor(row / BOX_SIZE) * BOX_SIZE;
    const boxStartCol = Math.floor(col / BOX_SIZE) * BOX_SIZE;
    for (let r = boxStartRow; r < boxStartRow + BOX_SIZE; r++) {
      for (let c = boxStartCol; c < boxStartCol + BOX_SIZE; c++) {
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
    const blankGrid =  Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null).map(() => ({ value: null, validOptions: [...allNums] })));
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

      { row: 1, col: 5, num: 1 },
      { row: 2, col: 6, num: 2 },
      { row: 3, col: 7, num: 3 },

      { row: 5, col: 1, num: 7 },
      { row: 6, col: 2, num: 8 },
      { row: 7, col: 3, num: 9 },

    ]);
    return sudoGrid;
  }, [allNums, updateGridWithValues]);
  const [grid, setGrid] = useState<SudokuGridType>(createStartingGrid());  

  
  /// --- Game State Updates ---
  const updateGameCellWithValue = useCallback((row: number, col: number, num: number | null) => {
    setGrid((prevGrid) => updateGridCellWithValue(prevGrid, { row, col, num }));
  }, [updateGridCellWithValue]);

  const onTurnEnd = useCallback((skipSolveabilityCheck: boolean = false) => {
    setIsPlayerTurn((prev) => !prev);
    if (!skipSolveabilityCheck) {
      checkIfBoardIsSolvable();
    }
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
    setOverlayMessage(null);
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

      // Test the random option on the testGrid.
      const resultGrid = updateGridCellWithValue(testGrid, { row: randomCell.row, col: randomCell.col, num: randomOption });
      const isSolveable = isBoardSolvable(resultGrid, () => { });

      if (isSolveable) {
        // If solveable, commit the move.
        return { chosenCell: randomCell, chosenValue: randomOption };

      } else {
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

  const botTurn = useCallback((targetGrid: SudokuGridType) => {
    if (isGameOver(targetGrid)) { return; }
    
    const testGrid = deepCopyGrid(targetGrid);
    const emptyCells: EmptyCell[] = getEmptyCells(testGrid);
    
    if (emptyCells.length > 0) {
      const choice = tryBotOptions({ targetGrid: testGrid, emptyCells });
      if (choice) {
        commitBotChoice(choice.chosenCell, choice.chosenValue);
      }
    }

    onTurnEnd(true); // Skip solveability check since bot already validated before moving
  }, [getEmptyCells, commitBotChoice, onTurnEnd, tryBotOptions]);

  /// --- Board State Checks ---
  const checkIfBoardIsSolvable = () => { setSolveableStatus('checking'); };




  // Triggers when we need to check solveability.
  useEffect(() => {
    if (solveableStatus === 'checking') {
      setOverlayMessage('Validating...');
      const solvable = isBoardSolvable(grid, setValidityFailures);
      setSolveableStatus(solvable ? 'yes' : 'no');
      setOverlayMessage(null);
    }
  }, [solveableStatus, grid]);

  // Automatically trigger bot turn when it's the bot's turn
  useEffect(() => {
    if (!isPlayerTurn && !isGameOver(grid)) {
      setOverlayMessage('Thinking...');
      const timeoutId = setTimeout(() => {
        botTurn(grid);
        setOverlayMessage(null);
      }, 700); // Small delay so user can see their move before bot goes
      
      return () => clearTimeout(timeoutId);
    }
  }, [isPlayerTurn, grid, botTurn]);

  // Check for game end and show win/fail overlay
  useEffect(() => {
    if (isGameOver(grid)) {
      const winner = isBoardValid(grid) && isBoardFull(grid);
      setOverlayMessage(winner ? 'Win!' : 'Fail');
    }
  }, [grid]);




  /// --- Render Helpers ---
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

  const showHintToggle = () => {
    return (<div className='show-hint-toggle'>
      <label htmlFor="show-hints-checkbox">
        <input
          id="show-hints-checkbox"
          type="checkbox"
          checked={showHints}
          onChange={() => setShowHints((prev) => !prev)}
        />
        Show Hints
      </label>
    </div>)
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
    if (!boardvalidity.valid) {
      return (
        <div className="validity-failures">
          <h4>Board State Errors:</h4>
          {boardvalidity.rowDupes.map((r, i) => <div key={i}>{dupeText({type: 'Row', num: r.number, index: r.row})}</div>)}
          {boardvalidity.colDupes.map((c, i) => <div key={i}>{dupeText({type: 'Column', num: c.number, index: c.col})}</div>)}
          {boardvalidity.boxDupes.map((b, i) => <div key={i}>{dupeText({type: 'Box', num: b.number, index: b.boxRow * 3 + b.boxCol})}</div>)}
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
        {(validityFailures?.rows.length ?? 0) > 0 && renderFailures('rows', validityFailures.rows)}
        {(validityFailures?.cols.length ?? 0) > 0 && renderFailures('cols', validityFailures.cols)}
        {(validityFailures?.boxes.length ?? 0) > 0 && renderFailures('boxes', validityFailures.boxes)}
      </div>
    );
  }

  const renderFailures = (
    type: 'cols' | 'rows' | 'boxes',
    fails: RowColumnFailure[] | BoxFailure[]
  ) => {
    return (<>
      {fails.map((fail, index) => {
        let location = '';
        if (type === 'rows' || type === 'cols') {
          const f = fail as RowColumnFailure;
          location = type === 'rows' ? `Row ${f.index+1}` : `Column ${f.index+1}`;
        } else {
          const f = fail as BoxFailure;
          location = `Box (Row: ${f.boxRow+1}, Column: ${f.boxCol+1})`;
        }
        
        return (
          <div key={index}>
            You can no longer play the
            number{fail.missingValues.length !== 1 ? 's' : ''} <b>
              {fail.missingValues.join(', ')}
            </b> in <b>{location}</b>.
          </div>
        );
      })}
    </>);
  }

  return (
    <WebTool css="sudoku-tool">
      <h3>Pseudosudoku</h3>
      <p className="description-text">
        You and a simple bot take turns filling out the grid using the standard sudoku rules.
        Click a cell to select it, then choose a number from the selector. The bot will automatically
        fill in a random valid number in an empty cell on its turn. Try to keep the board valid
        and solvable as you add more numbers. Completely fill the board to win!
      </p>
      <p>
        Note: Sometimes this gets really slow and laggy as the bot looks hard for validity.
      </p>

      {boardStateDebuggerView(debug)}

      {gameStateHeader()}
      {showHintToggle()}
      {validationStateDisplay()}

      <div className="sudoku-container">
        <SudokuGrid
          grid={grid}
          validityFailures={validityFailures}
          lastBotMove={lastBotMove}
          lastPlayerMove={lastPlayerMove}
          selectedCell={selectedCell}
          handleCellClick={handleCellClick}
          boardValidity={getBoardValidity(grid)}
          showHints={showHints}
          isPlayerTurn={isPlayerTurn}
          overlayMessage={overlayMessage}
        />

        {selectedCell && (
          <div className="number-selector-overlay" onClick={() => setSelectedCell(null)}>
            <div className="number-selector" onClick={(e) => e.stopPropagation()}>
              <h4>Select Number</h4>
              <div className="number-grid">
                {allNums.map((num) => (
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
        {debug ? <button onClick={() => { botTurn(grid); }}>
          Make Bot Go
        </button> : null}
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
