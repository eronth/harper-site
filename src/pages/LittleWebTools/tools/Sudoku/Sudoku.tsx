import { useCallback, useEffect, useState } from 'react';
import WebTool from '../../WebTool';
import './Sudoku.css';

type SudokuCell = {
  value: number | null;
  validOptions: number[];
}
type SudokuGrid = SudokuCell[][];

interface SelectedCell {
  row: number;
  col: number;
}

export default function Sudoku() {
  const [boardIsvalid, setBoardIsValid] = useState(true);
  const allNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [grid, setGrid] = useState<SudokuGrid>(createEmptyGrid());
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);

  

  function createEmptyGrid(): SudokuGrid {
    const sudoGrid =  Array(9).fill(null).map(() => Array(9).fill(null).map(() => ({ value: null, validOptions: [...allNums] })));
    return sudoGrid;
  }

  function handleCellClick(row: number, col: number) {
    setSelectedCell({ row, col });
  }

  function handleNumberSelect(num: number | null) {
    if (isPlayerTurn && selectedCell) {
      updateCellWithValue(selectedCell.row, selectedCell.col, num);
    }
  }

  const updateCellWithValue = useCallback((row: number, col: number, num: number | null) => {
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
    setGrid(newGrid);
    setSelectedCell(null);
    setIsPlayerTurn(false);
  }, [grid]);

  function handleClear() {
    setGrid(createEmptyGrid());
    setSelectedCell(null);
  }

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
      updateCellWithValue(randomCell.row, randomCell.col, randomOption);
    }
  }, [grid, updateCellWithValue]);

  function isBoardFull(): boolean {
    for (let row of grid) {
      for (let cell of row) {
        if (cell.value === null) {
          return false;
        }
      }
    }
    return true;
  }

  function isBoardSolvable(): boolean {
    // Try to solve board and see if it works.
    
    return true;
  }


  // Triggers whenever the player turn ends to let the bot act.
  useEffect(() => {
    if (!isPlayerTurn) {
      // After player turn, let bot play
      //setTimeout(() => { botTurn(); }, 100);
      //setIsPlayerTurn(true);
    }
  }, [botTurn, isPlayerTurn]);

  return (
    <WebTool css="sudoku-tool">
      <h3>Sudoku</h3>
      <p className="description-text">
        You and a simple bot take turns filling out the grid using the standard sudoku rules.
        Click a cell to select it, then choose a number from the selector. The bot will automatically
        fill in a random valid number in an empty cell on its turn. Try to keep the board valid
        and solvable to win!
      </p>

      <div>
        isPlayerTurn? {isPlayerTurn.toString()} -
        - isBoardFull? {isBoardFull().toString()} -
        - boardIsvalid? {boardIsvalid.toString()} -
        - isBoardSolvable? {isBoardSolvable().toString()}
      </div>

      <div className="sudoku-container">
        <div className="sudoku-grid">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="row">
              {row.map((cell, colIdx) => (
                <button
                  key={`${rowIdx}-${colIdx}`}
                  className={`cell ${
                    selectedCell?.row === rowIdx && selectedCell?.col === colIdx
                      ? 'selected'
                      : ''
                  } ${getBorderClass(rowIdx, colIdx)}`}
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
                </button>
              ))}
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
                    onClick={() => handleNumberSelect(num)}
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
        <button className="tool-button" onClick={handleClear}>
          Clear Grid
        </button>
      </div>
    </WebTool>
  );
}

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
