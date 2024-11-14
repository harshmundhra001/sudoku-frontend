'use client';
import SudokuBoard2 from '@/components/sudoku-board2';
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
			<SudokuBoard2 addNote={note} />
			<div>
				<button onClick={handleNoteClick} className='relative bg-slate-100 text-black p-2 my-2 rounded-lg inline-flex'>
					Note
					<span className='bg-red-600 p-1 rounded-xl text-[8px] mr-3'>{note ? 'On' : 'Off'}</span>
				</button>
				<button onClick={handleNoteClick} className='bg-slate-100 text-black p-2 my-2 mx-2 rounded-lg'>
					<p>Erase</p>
				</button>
			</div>
		</div>
	);
}
