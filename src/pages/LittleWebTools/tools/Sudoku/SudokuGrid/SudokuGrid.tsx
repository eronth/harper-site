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
  selectedCell: { row: number; col: number } | null;
  handleCellClick: (row: number, col: number) => void;
  boardValidity: ValidBoardResult | null;
  showHints?: boolean;
  isPlayerTurn: boolean;
  overlayMessage?: string | null;
  botDesiredChoice?: {
    chosenCell: { row: number; col: number };
    chosenNumber: number;
  } | null;
};

export default function SudokuGrid({
  grid,
  validityFailures,
  lastBotMove,
  lastPlayerMove,
  selectedCell,
  handleCellClick,
  boardValidity,
  showHints = false,
  isPlayerTurn,
  overlayMessage = null,
  botDesiredChoice = null,  
}: Props) {
  const GRID_SIZE = 9;
  const BOX_SIZE = 3;

  // TODO replace this with smart CSS
  function getBorderClass(row: number, col: number): string {
    const classes: string[] = [];
    
    // Right border for 3x3 boxes
    if (col === BOX_SIZE - 1 || col === (BOX_SIZE * 2) - 1) {
      classes.push('border-right-thick');
    }
    
    // Bottom border for 3x3 boxes
    if (row === BOX_SIZE - 1 || row === (BOX_SIZE * 2) - 1) {
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
      for (let col = 0; col < GRID_SIZE; col++) {
        if (grid[rowDupe.row][col].value === rowDupe.number) {
          cellsToMark.push({ row: rowDupe.row, col });
        }
      }
    }
    for (const colDupe of boardValidity.colDupes) {
      for (let row = 0; row < GRID_SIZE; row++) {
        if (grid[row][colDupe.col].value === colDupe.number) {
          cellsToMark.push({ row, col: colDupe.col });
        }
      }
    }
    for (const boxDupe of boardValidity.boxDupes) {
      const startRow = boxDupe.boxRow * BOX_SIZE;
      const startCol = boxDupe.boxCol * BOX_SIZE;
      for (let i = 0; i < BOX_SIZE; i++) {
        for (let j = 0; j < BOX_SIZE; j++) {
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
    const boxRow = Math.floor(rowIdx / BOX_SIZE);
    const boxCol = Math.floor(colIdx / BOX_SIZE);
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

  return <div className="sudoku-grid-wrapper">
    <div className="sudoku-grid">
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
                {Array.from({ length: GRID_SIZE }, (_, i) => i + 1).map((num) => (
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
  
  {overlayMessage && (
    <div className={`game-overlay ${overlayMessage === 'Win!' || overlayMessage === 'Fail' ? 'game-end' : ''}`}>
      <div className="overlay-message">{overlayMessage}</div>
    </div>
  )}
  </div>
}
