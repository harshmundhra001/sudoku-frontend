'use client';
import SudokuGrid from '@/components/sudoku/grid';

export default function CreateGame() {
	return (
		<div className=''>
			<SudokuGrid addNote={true} initialValue={null} isEditable={true} numberFocus={null} isBlockFocus={true} />
		</div>
	);
}
