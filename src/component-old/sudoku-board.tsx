'use client';
import React from 'react';
import SudokuGrid from './sudoku-grid';

// type CellValue = number | null;

const BOARD_SIZE = 9;

const SudokuBoard2 = (props: { addNote: boolean }) => {
	const { addNote } = props;

	// Render the Sudoku grid
	const renderCell = (row: number, col: number) => {
		return (
			<td
				key={`${row}-${col}`}
				className={`border-x border-x-gray-500 first:border-l-gray-300 [&:nth-child(3n)]:border-r-gray-300`}
				// onClick={() => handleCellClick(row, col)}
			>
				{/* <input type='number' value={cellValue ?? ''} onChange={handleInputChange} disabled={cellValue !== null} /> */}
				<SudokuGrid addNote={addNote} />
			</td>
		);
	};

	// Render the board grid (9x9)
	const renderBoard = () => {
		return (
			<table>
				<tbody>
					{Array.from({ length: BOARD_SIZE }, (_, row) => (
						<tr 
                            key={row} 
                            id={`row-${row}`} 
                            className='border border-gray-500 first:border-t-gray-300 [&:nth-child(3n)]:border-b-gray-300'
                        >
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

export default SudokuBoard2;
