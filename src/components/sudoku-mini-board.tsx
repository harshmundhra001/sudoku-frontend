'use client';
import React from 'react';
import SudokuGrid from './sudoku-grid';


// type CellValue = number | null;

const BOARD_SIZE = 3;

const SudokuMiniBoard = (props: { rowOffset: number, colOffset: number, addNote: boolean}) => {

	const { rowOffset, colOffset, addNote } = props;

	// Render the Sudoku grid
	const renderCell = (row: number, col: number) => {
		// const cellValue = board[row][col];
        // const borderColor = row % 3 === 0 ? 'border-t-2' : '';
		return (
			<td
				key={`${rowOffset}-${row}-${colOffset}-${col}`}
				className={`border border-gray-500`}
				// onClick={() => handleCellClick(row, col)}
			>
				{/* <input type='number' value={cellValue ?? ''} onChange={handleInputChange} disabled={cellValue !== null} /> */}
                <SudokuGrid 
					addNote={addNote}
				/>
			</td>
		);
	};

	// Render the board grid (9x9)
	const renderBoard = () => {
		return (
			<table>
				<tbody>
					{Array.from({ length: BOARD_SIZE }, (_, row) => (
						<tr key={row} id={`offset-${rowOffset}-row-${row}`}>
							{Array.from({ length: BOARD_SIZE }, (_, col) => renderCell(row, col))}
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	// You can add the styles below or use external CSS/Styled-components
	return (
		<div>
			{renderBoard()}
			{/* {isGameOver && <div>Game Over! Player {currentPlayer} won!</div>} */}
		</div>
	);
};

export default SudokuMiniBoard;
