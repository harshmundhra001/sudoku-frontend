'use client';
import SudokuGrid from '@/components/sudoku/grid';

export default function CreateGame() {
	return (
		<div className=''>
			<SudokuGrid
				addNote={true}
				initialValue={null}
				isEditable={true}
				numberFocus={null}
				isBlockFocus={true}
				x={0}
				y={0}
				onFocus={() => {}}
				onValueChange={() => {}}
				onValueDelete={() => {}}
			/>
		</div>
	);
}
