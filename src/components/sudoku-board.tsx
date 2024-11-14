'use client';

import SudokuMiniBoard from './sudoku-mini-board';

// type CellValue = number | null;

const BOARD_SIZE = 3;

const SudokuBoard = (props: { addNote: boolean }) => {
	const { addNote } = props;
	// Render the Sudoku grid
	const renderCell = (row: number, col: number) => {
		// const cellValue = board[row][col];
		// const borderColor = row % 3 === 0 ? 'border-t-2' : '';
		return (
			<td
				key={`${row}-${col}`}
				className={`border border-gray-300 p-0`}
				// onClick={() => handleCellClick(row, col)}
			>
				{/* <input type='number' value={cellValue ?? ''} onChange={handleInputChange} disabled={cellValue !== null} /> */}
				<SudokuMiniBoard rowOffset={row} colOffset={col} addNote={addNote} />
			</td>
		);
	};

	// Render the board grid (9x9)
	const renderBoard = () => {
		return (
			<table>
				<tbody>
					{Array.from({ length: BOARD_SIZE }, (_, row) => (
						<tr key={row} id={`row-${row}`}>
							{Array.from({ length: BOARD_SIZE }, (_, col) => renderCell(row, col))}
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	// You can add the styles below or use external CSS/Styled-components
	return (
		<div className='my-5'>
			{renderBoard()}
			{/* {isGameOver && <div>Game Over! Player {currentPlayer} won!</div>} */}
		</div>
	);
};

export default SudokuBoard;
