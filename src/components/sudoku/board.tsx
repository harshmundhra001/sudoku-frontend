'use strict';
import { SudokuBoardProps2 } from '@/types/sudoku';
import SudokuGrid from './grid';

const BOARD_SIZE = 9;

const SudokuBoard = (props: SudokuBoardProps2) => {
	const { addNote, initialBoard, focusValue, editBoard, onFocus, onValueChange, onValueDelete, incorrectCells } = props;

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
				<SudokuGrid
					addNote={addNote}
					initialValue={initialBoard[row][col]}
					isEditable={editBoard[row][col]}
					x={row}
					y={col}
					numberFocus={focusValue?.value}
					isBlockFocus={
						focusValue?.x === row ||
						focusValue?.y === col ||
						(
							focusValue?.x !== undefined &&
							focusValue?.y !== undefined &&
							focusValue.x !== null &&
							focusValue.y !== null &&
							Math.floor(focusValue.x / 3) === Math.floor(row / 3) &&
							Math.floor(focusValue.y / 3) === Math.floor(col / 3)
						)
					}
					isIncorrect={incorrectCells?.[row]?.[col]}
					onFocus={onFocus}
					onValueChange={onValueChange}
					onValueDelete={onValueDelete}
				/>
			</td>
		);
	};

	// Render the board grid (9x9)
	const renderBoard = () => {
		return (
			<table role='grid' aria-label='Sudoku Board' className='shadow-lg shadow-gray-950'>
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
