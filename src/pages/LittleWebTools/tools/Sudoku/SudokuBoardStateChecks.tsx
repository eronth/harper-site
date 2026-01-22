import type { SudokuValidityFailures } from "./Sudoku";
import type { SudokuCell, SudokuGridType } from "./SudokuGrid/SudokuGrid";

// Various board state checks
export function isBoardFull(grid: SudokuGridType): boolean {
  for (const row of grid) {
    for (const cell of row) {
      if (cell.value === null) {
        return false;
      }
    }
  }
  return true;
}

export function isBoardValid(grid: SudokuGridType): boolean {
  // Check rows and columns
  for (let i = 0; i < 9; i++) {
    const rowValues = new Set<number>();
    const colValues = new Set<number>();
    for (let j = 0; j < 9; j++) {
      // Check row
      const rowCellValue = grid[i][j].value;
      if (rowCellValue !== null) {
        if (rowValues.has(rowCellValue)) {
          return false; // Duplicate in row
        }
        rowValues.add(rowCellValue);
      }
      // Check column
      const colCellValue = grid[j][i].value;
      if (colCellValue !== null) {
        if (colValues.has(colCellValue)) {
          return false; // Duplicate in column
        }
        colValues.add(colCellValue);
      }
    }
  }
  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const boxValues = new Set<number>();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const cellValue = grid[boxRow * 3 + i][boxCol * 3 + j].value;
          if (cellValue !== null) {
            if (boxValues.has(cellValue)) {
              return false; // Duplicate in box
            }
            boxValues.add(cellValue);
          }
        }
      }
    }
  }
  return true;
}

function boardFillCount (grid: SudokuGridType): number {
  let count = 0;
  for (const row of grid) {
    for (const cell of row) {
      if (cell.value !== null) {
        count++;
      }
    }
  }
  return count;
}

export function deepCopyGrid(grid: SudokuGridType): SudokuGridType {
  return grid.map(row => row.map(cell => ({ value: cell.value, validOptions: [...cell.validOptions] })));
}

type TrySolveResult = {
  solvable: boolean;
  failures: SudokuValidityFailures;
};
function trySolveBoard(gridToCheck: SudokuGridType, print: boolean = false): TrySolveResult {
  const trySolveResult: TrySolveResult = {
    solvable: true,
    failures: { rows: [], cols: [], boxes: [], other: [] },
  };

  const grid = deepCopyGrid(gridToCheck);

  // Check all rows
  for (let row = 0; row < 9; row++) {
    const { possible, missingValues } = flashCheckRowIsPossible(grid, row);
    if (!possible) {
      trySolveResult.solvable = false;
      trySolveResult.failures.rows.push({index: row, missingValues: missingValues});
    }
  }

  // Check all columns
  for (let col = 0; col < 9; col++) {
    const { possible, missingValues } = flashCheckColIsPossible(grid, col);
    if (!possible) {
      trySolveResult.solvable = false;
      trySolveResult.failures.cols.push({index: col, missingValues: missingValues});
    }
  }

  // Check all boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const { possible, missingValues } = flashCheckBoxIsPossible(grid, boxRow, boxCol);
      if (!possible) {
        trySolveResult.solvable = false;
        trySolveResult.failures.boxes.push({ boxRow, boxCol, missingValues: missingValues });
      }
    }
  }

  if (!trySolveResult.solvable) { return trySolveResult; }
  
  const fullCanSolve = trySolveBoardFull(grid, print);
  if (!fullCanSolve) {
    trySolveResult.solvable = false;
    trySolveResult.failures.other.push('Full board solve failed');
  }

  return trySolveResult;
}

type PossibilityResult = {
  possible: boolean;
  missingValues: number[];
};
function flashCheckRowIsPossible(grid: SudokuGridType, row: number): PossibilityResult {
  const seen = new Set<number>();
  for (let col = 0; col < 9; col++) {
    const cell = grid[row][col];
    seenCheck(seen, cell);
  }
  if (seen.size === 9) {
    return { possible: true, missingValues: [] };
  } else {
    console.log('Row', row, 'is NOT possible with seen:', seen);
    return { possible: false, missingValues: missingNumbers(seen) };
  }
}

function flashCheckColIsPossible(grid: SudokuGridType, col: number): PossibilityResult {
  const seen = new Set<number>();
  for (let row = 0; row < 9; row++) {
    const cell = grid[row][col];
    seenCheck(seen, cell);
  }
  if (seen.size === 9) {
    return { possible: true, missingValues: [] };
  } else {
    console.log('Col', col, 'is NOT possible with seen:', seen); 
    return { possible: false, missingValues: missingNumbers(seen) };
  }
}

function flashCheckBoxIsPossible(grid: SudokuGridType, boxRow: number, boxCol: number): PossibilityResult {
  const seen = new Set<number>();
  const boxStartRow = boxRow * 3;
  const boxStartCol = boxCol * 3;
  for (let r = boxStartRow; r < boxStartRow + 3; r++) {
    for (let c = boxStartCol; c < boxStartCol + 3; c++) {
      const cell = grid[r][c];
      seenCheck(seen, cell);
    }
  }
  if (seen.size === 9) {
    return { possible: true, missingValues: [] };
  } else {
    console.log('Box', boxRow, boxCol, 'is NOT possible with seen:', seen);
    return { possible: false, missingValues: missingNumbers(seen) };
  }
}

function seenCheck(seen: Set<number>, cell: SudokuCell) {
  const val = cell.value;
  if (val !== null) {
    seen.add(val);
  }
  const options = cell.validOptions;
  for (const option of options) {
    seen.add(option);
  }
}

function missingNumbers(seen: Set<number>): number[] {
  const missing: number[] = [];
  for (let num = 1; num <= 9; num++) {
    if (!seen.has(num)) {
      missing.push(num);
    }
  }
  return missing;
}

function trySolveBoardFull(grid: SudokuGridType, print: boolean = false): boolean {
  // Backtracking solver
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value === null) {
        for (let num = 1; num <= 9; num++) {
          // Check if num can be placed
          let canPlace = true;
          // Check row and column
          for (let k = 0; k < 9; k++) {
            if (grid[row][k].value === num || grid[k][col].value === num) {
              canPlace = false;
              break;
            }
          }
          // Check box
          const boxStartRow = Math.floor(row / 3) * 3;
          const boxStartCol = Math.floor(col / 3) * 3;
          for (let r = boxStartRow; r < boxStartRow + 3; r++) {
            for (let c = boxStartCol; c < boxStartCol + 3; c++) {
              if (grid[r][c].value === num) {
                canPlace = false;
                break;
              }
            }
            if (!canPlace) break;
          }
          if (canPlace) {
            grid[row][col].value = num;
            if (trySolveBoardFull(grid, print)) {
              return true;
            }
            grid[row][col].value = null; // Backtrack
          }
        }
        return false; // No valid number found
      }
    }
  }
  // Print grid real quick
  if (print) {
    console.log('Solved grid:');
    console.log(turnGridToSudokuFormat(grid));
  }
  return true; // Solved
}

function turnGridToSudokuFormat(grid: SudokuGridType): string {
  const niceGrid: number[][] = grid.map(row => row.map(cell => cell.value || 0));
  return niceGrid.map(row => row.join(' ')).join('\n');
}

export function isBoardSolvable(
  grid: SudokuGridType,
  setFailures: React.Dispatch<React.SetStateAction<SudokuValidityFailures | null>>,
  print: boolean = false,
): boolean {
  if (!isBoardValid(grid)) { return false; }
  if (isBoardFull(grid)) { return true; }
  if (boardFillCount(grid) <= 4) { return true; }

  // Try to solve board and see if it works.
  const solveResult = trySolveBoard(grid, print);
  if (!solveResult.solvable) {
    setFailures?.(solveResult.failures);
    return false;
  }

  return true;
}

export function isGameOver(grid: SudokuGridType): boolean {
  return (
    isBoardFull(grid)
    || !isBoardValid(grid)
    || !isBoardSolvable(grid, () => {}, false)
  );
}
