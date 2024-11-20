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
				<button onClick={handleNoteClick} className='relative text-slate-100 p-2 my-2 rounded-lg inline-flex'>
					Note
					<span className={`${note ? 'bg-green-800' : 'bg-red-800'} p-1 rounded-lg text-[8px] mt-2 mr-3`}>
						{note ? 'On' : 'Off'}
					</span>
				</button>
				<button onClick={handleNoteClick} className='text-slate-100 p-2 my-2 mx-2 rounded-lg'>
					<p>Erase</p>
				</button>
			</div>
		</div>
	);
}
