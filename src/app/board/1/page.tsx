'use client';
import SudokuBoard from '@/components/sudoku-board';
import { useState } from 'react';

export default function CreateGame() {
	const [note, setNote] = useState(false);
	const handleNoteClick = () => {
		setNote(!note);
		console.log(note);
	};
	return (
		<div>
			<h1>Grid</h1>
			<SudokuBoard addNote={note} />
			<div>
				<button onClick={handleNoteClick} className='bg-slate-100 text-black p-2 my-2 rounded-lg'>
					<p>Note</p>
				</button>
				<button onClick={handleNoteClick} className='bg-slate-100 text-black p-2 my-2 mx-2 rounded-lg'>
				<p>Erase</p>
			</button>
			</div>
		</div>
	);
}
