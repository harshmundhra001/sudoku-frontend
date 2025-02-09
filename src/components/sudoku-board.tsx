'use client';

import React from 'react';
import SudokuGrid from './sudoku-grid';
import { SudokuBoardProps } from '@/types/board';

const BOARD_SIZE = 9;

const SudokuBoard = (props: SudokuBoardProps) => {
	const { addNote, initialBoard } = props;

	// Render the Sudoku grid
	const renderCell = (row: number, col: number) => {
		return (
			<td
				key={`${row}-${col}`}
				className={`border-x border-x-gray-500 first:border-l-gray-300 [&:nth-child(3n)]:border-r-gray-300`}
				// Other way to do it (Got this form Deepseek)
				// className={`
				// 	border border-gray-500
				// 	${col % 3 === 0 ? 'border-l-gray-300' : ''}
				// 	${(col + 1) % 3 === 0 ? 'border-r-gray-300' : ''}
				// 	${row % 3 === 0 ? 'border-t-gray-300' : ''}
				// 	${(row + 1) % 3 === 0 ? 'border-b-gray-300' : ''}
				// `}
				role='gridcell'
			>
				<SudokuGrid addNote={addNote} initialValue={initialBoard[row][col].initialValue} isEditable={initialBoard[row][col].isEditable} />
			</td>
		);
	};

	// Render the board grid (9x9)
	const renderBoard = () => {
		return (
			<table role='grid' aria-label='Sudoku Board'>
				<tbody>
					{Array.from({ length: BOARD_SIZE }, (_, row) => (
						<tr
							key={row}
							id={`row-${row}`}
							className='border border-gray-500 first:border-t-gray-300 [&:nth-child(3n)]:border-b-gray-300'
							role='row'
						>
							{Array.from({ length: BOARD_SIZE }, (_, col) => renderCell(row, col))}
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	return <div>{renderBoard()}</div>;
};

export default SudokuBoard;
