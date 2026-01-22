import { useMemo } from "react";
import type { SudokuMove, SudokuValidityFailures } from "../Sudoku";
import { isGameOver, type ValidBoardResult } from "../SudokuBoardStateChecks";
import './SudokuGrid.css';

export type SudokuCell = {
  value: number | null;
  validOptions: number[];
}
export type SudokuGridType = SudokuCell[][];
  
type Props = {
  grid: SudokuGridType;
  validityFailures: SudokuValidityFailures | null;
  lastBotMove: SudokuMove | null;
  lastPlayerMove: SudokuMove | null;
  botDesiredChoice: { chosenCell: { row: number; col: number }; chosenValue: number } | null;
  selectedCell: { row: number; col: number } | null;
  handleCellClick: (row: number, col: number) => void;
  boardValidity: ValidBoardResult | null;
  showHints?: boolean;
  isPlayerTurn: boolean;
};

export default function SudokuGrid({
  grid,
  validityFailures,
  lastBotMove,
  lastPlayerMove,
  botDesiredChoice,
  selectedCell,
  handleCellClick,
  boardValidity,
  showHints = false,
  isPlayerTurn,
}: Props) {


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

  function disableGridButton(cell: SudokuCell): boolean {
    if (cell.value !== null) { return true; }
    if (isGameOver(grid)) { return true; }
    if (!isPlayerTurn) { return true; }

    return false;
  }

  function cellsToMarkForDuplicity() {
    const cellsToMark: { row: number; col: number }[] = [];
    if (!boardValidity) { return cellsToMark; }

    for (const rowDupe of boardValidity.rowDupes) {
      for (let col = 0; col < 9; col++) {
        if (grid[rowDupe.row][col].value === rowDupe.number) {
          cellsToMark.push({ row: rowDupe.row, col });
        }
      }
    }
    for (const colDupe of boardValidity.colDupes) {
      for (let row = 0; row < 9; row++) {
        if (grid[row][colDupe.col].value === colDupe.number) {
          cellsToMark.push({ row, col: colDupe.col });
        }
      }
    }
    for (const boxDupe of boardValidity.boxDupes) {
      const startRow = boxDupe.boxRow * 3;
      const startCol = boxDupe.boxCol * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const row = startRow + i;
          const col = startCol + j;
          if (grid[row][col].value === boxDupe.number) {
            cellsToMark.push({ row, col });
          }
        }
      }
    }
    
    return cellsToMark;
  }

  const dupeCells = useMemo(cellsToMarkForDuplicity, [grid, boardValidity]);

  const getCellCssPack = (row: number, col: number): string[] => {
    const cssPack: string[] = [];
    
    const rowIdx = row;
    const colIdx = col;

    const isFailedRow = validityFailures?.rows.some(r => r.index === rowIdx);
    const isFailedCol = validityFailures?.cols.some(c => c.index === colIdx);
    const boxRow = Math.floor(rowIdx / 3);
    const boxCol = Math.floor(colIdx / 3);
    const isFailedBox = validityFailures?.boxes.some(b => b.boxRow === boxRow && b.boxCol === boxCol);
    const isFailedCell = isFailedRow || isFailedCol || isFailedBox;
    
    const isDesiredChoice = botDesiredChoice
      ? (botDesiredChoice.chosenCell.row === rowIdx && botDesiredChoice.chosenCell.col === colIdx)
      : false;
    
    const dupeCellCss = dupeCells.some(c => c.row === row && c.col === col) ? 'dupe-cell' : null;
    if (dupeCellCss) { cssPack.push(dupeCellCss); }

    const failedCss = isFailedCell ? 'failed' : null;
    if (failedCss) { cssPack.push(failedCss); }

    const turnCss = (lastBotMove?.row === rowIdx && lastBotMove?.col === colIdx)
      ? 'bot-move'
      : (lastPlayerMove?.row === rowIdx && lastPlayerMove?.col === colIdx)
        ? 'player-move'
        : null;
    if (turnCss) { cssPack.push(turnCss); }

    const selectedCss = (selectedCell?.row === rowIdx && selectedCell?.col === colIdx)
      ? 'selected'
      : null;
    if (selectedCss) { cssPack.push(selectedCss); }

    const choiceCss = isDesiredChoice ? 'desired-choice' : null;
    if (choiceCss) { cssPack.push(choiceCss); }
    return cssPack;
  }

  return <div className="sudoku-grid">
    {grid.map((row, rowIdx) => (
      <div key={rowIdx} className="row">
        {row.map((cell, colIdx) => {

          return (
          <button
            key={`${rowIdx}-${colIdx}`}
            className={`cell ${getCellCssPack(rowIdx, colIdx).join(' ')} ${getBorderClass(rowIdx, colIdx)}`}
            onClick={() => handleCellClick(rowIdx, colIdx)}
            disabled={disableGridButton(cell)}
          >
            {cell.value ? (
              <span>{cell.value}</span>
            ) : (
              <div className="valid-options-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <span
                    key={num}
                    className={`option-number ${
                      (showHints && cell.validOptions.includes(num))
                        ? 'visible'
                        : 'hidden'
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
}
