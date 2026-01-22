import type { SudokuMove, SudokuValidityFailures } from "../Sudoku";
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
};

export default function SudokuGrid({
  grid,
  validityFailures,
  lastBotMove,
  lastPlayerMove,
  botDesiredChoice,
  selectedCell,
  handleCellClick,
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

  return <div className="sudoku-grid">
    {grid.map((row, rowIdx) => (
      <div key={rowIdx} className="row">
        {row.map((cell, colIdx) => {
          const isFailedRow = validityFailures?.rows.some(r => r.index === rowIdx);
          const isFailedCol = validityFailures?.cols.some(c => c.index === colIdx);
          const boxRow = Math.floor(rowIdx / 3);
          const boxCol = Math.floor(colIdx / 3);
          const isFailedBox = validityFailures?.boxes.some(b => b.boxRow === boxRow && b.boxCol === boxCol);
          const isFailedCell = isFailedRow || isFailedCol || isFailedBox;
          
          const isDesiredChoice = botDesiredChoice
            ? (botDesiredChoice.chosenCell.row === rowIdx && botDesiredChoice.chosenCell.col === colIdx)
            : false;

          const failedCss = isFailedCell ? 'failed' : '';
          const turnCss = (lastBotMove?.row === rowIdx && lastBotMove?.col === colIdx)
            ? 'bot-move'
            : (lastPlayerMove?.row === rowIdx && lastPlayerMove?.col === colIdx)
              ? 'player-move'
              : '';
          const selectedCss = (selectedCell?.row === rowIdx && selectedCell?.col === colIdx)
            ? 'selected'
            : '';
          const choiceCss = isDesiredChoice ? 'desired-choice' : 'hm';
          return (
          <button
            key={`${rowIdx}-${colIdx}`}
            className={`cell ${turnCss} ${selectedCss} ${failedCss} ${choiceCss} ${getBorderClass(rowIdx, colIdx)}`}
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
}
