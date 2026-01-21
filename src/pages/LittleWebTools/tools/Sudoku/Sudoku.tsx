import { useCallback, useEffect, useMemo, useState } from 'react';
import WebTool from '../../WebTool';
import { isBoardFull, isBoardSolvable, isBoardValid } from './SudokuBoardStateChecks';
import './Sudoku.css';

export type SudokuCell = {
  value: number | null;
  validOptions: number[];
}
export type SudokuGrid = SudokuCell[][];

type fff = {
  index: number;
  missingValues: number[];
};
type f2 = {
  boxRow: number;
  boxCol: number;
  missingValues: number[];
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

  /// -- Initializing board state on load. --
  const [solveableStatus, setSolveableStatus] = useState<'yes' | 'no' | 'checking'>('yes');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [lastBotMove, setLastBotMove] = useState<{ row: number; col: number; num: number } | null>(null);
  const [lastPlayerMove, setLastPlayerMove] = useState<{ row: number; col: number; num: number } | null>(null);
  const [validityFailures, setValidityFailures] = useState<SudokuValidityFailures | null>(null);

  type UpdateValuesParams = {
    row: number;
    col: number;
    num: number | null;
  };
  const updateGridCellWithValue = useCallback((grid: SudokuGrid, {row, col, num}: UpdateValuesParams) => {
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
  const updateGridWithValues = useCallback((grid: SudokuGrid, updates: UpdateValuesParams[]): SudokuGrid => {
    for (const update of updates) {
      grid = updateGridCellWithValue(grid, update);
    }
    return grid;
  }, [updateGridCellWithValue]);
  const createStartingGrid = useCallback((): SudokuGrid => {
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
  const [grid, setGrid] = useState<SudokuGrid>(createStartingGrid());


  // TODO replace this with smart CSS
  function getBorderClass(row: number, col: number): string {
    const classes: string[] = [];
    
    // Right border for 3x3 boxes
    if (col === 2 || col === 5) {
      classes.push('border-right-thick');
    }
    
    // Bottom border for 3x3 boxes
    if (row === 2 || row === 5) {
      classes.push('border-bottom-thick');
    }
    
    return classes.join(' ');
  }

  
  /// --- Game State Updates ---
  const updateGameCellWithValue = useCallback((row: number, col: number, num: number | null) => {
    setGrid((prevGrid) => updateGridCellWithValue(prevGrid, { row, col, num }));
  }, [updateGridCellWithValue]);

  function onTurnEnd() {
    //setIsPlayerTurn((prev) => !prev);
    checkIfBoardIsSolvable();
    setSelectedCell(null);
  }

  function handleResetGame() {
    setGrid(createStartingGrid());
    setIsPlayerTurn(true);
    setSelectedCell(null);
    setSolveableStatus('yes');
    setLastBotMove(null);
    setLastPlayerMove(null);
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
  const botTurn = useCallback(() => {
    // Simple bot that fills a random empty cell with a valid option
    const emptyCells: { row: number; col: number; validOptions: number[] }[] = [];
    grid.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        if (cell.value === null && cell.validOptions.length > 0) {
          emptyCells.push({ row: rowIdx, col: colIdx, validOptions: cell.validOptions });
        }
      });
    });
    
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const randomOption = randomCell.validOptions[Math.floor(Math.random() * randomCell.validOptions.length)];
      updateGameCellWithValue(randomCell.row, randomCell.col, randomOption);
      setLastBotMove({ row: randomCell.row, col: randomCell.col, num: randomOption });
    }

    onTurnEnd();
  }, [grid, updateGameCellWithValue]);




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
  useEffect(() => {
    if (!isPlayerTurn) {
      // After player turn, let bot play
      //setTimeout(() => { botTurn(); }, 100);
      //setIsPlayerTurn(true);
    }
  }, [botTurn, isPlayerTurn]);



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
        and solvable to win!
      </p>

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


      <div className="validity-failures">
        <h4>Board State Failures:</h4>
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


      <div className="sudoku-container">
        <div className="sudoku-grid">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="row">
              {row.map((cell, colIdx) => {
                const isFailedRow = validityFailures?.rows.some(r => r.index === rowIdx);
                const isFailedCol = validityFailures?.cols.some(c => c.index === colIdx);
                const boxRow = Math.floor(rowIdx / 3);
                const boxCol = Math.floor(colIdx / 3);
                const isFailedBox = validityFailures?.boxes.some(b => b.boxRow === boxRow && b.boxCol === boxCol);
                const isFailedCell = isFailedRow || isFailedCol || isFailedBox;

                const failedCss = isFailedCell ? 'failed' : '';
                const turnCss = (lastBotMove?.row === rowIdx && lastBotMove?.col === colIdx)
                  ? 'bot-move'
                  : (lastPlayerMove?.row === rowIdx && lastPlayerMove?.col === colIdx)
                    ? 'player-move'
                    : '';
                const selectedCss = (selectedCell?.row === rowIdx && selectedCell?.col === colIdx)
                  ? 'selected'
                  : '';
                return (
                <button
                  key={`${rowIdx}-${colIdx}`}
                  className={`cell ${turnCss} ${selectedCss} ${failedCss} ${getBorderClass(rowIdx, colIdx)}`}
                  onClick={() => handleCellClick(rowIdx, colIdx)}
                  disabled={cell.value !== null}
                >
                  {cell.value ? (
                    <span>{cell.value}</span>
                  ) : (
                    <div className="valid-options-grid">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <span
                          key={num}
                          className={`option-number ${
                            cell.validOptions.includes(num) ? 'visible' : 'hidden'
                          }`}
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  )}
                </button>)
              })}
            </div>
          ))}
        </div>

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
        <button className="tool-button" onClick={handleResetGame}>
          Reset Game
        </button>
      </div>
    </WebTool>
  );
}
