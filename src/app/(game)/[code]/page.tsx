'use client';
import SudokuBoard from '@/components/sudoku-board';
import { constructUrl } from '@/units/general';
import { use, useEffect, useState } from 'react';

const dummyBoard = Array(9)
	.fill(null)
	.map(() =>
		Array(9)
			.fill(null)
			.map(() => ({ isEditable: true, initialValue: null }))
	);

export default function Game({ params }: { params: Promise<{ code: string }> }) {
	const { code } = use(params);
	const [board, setBoard] = useState<{ initialValue: number | null; isEditable: boolean }[][]>(dummyBoard); // State for board data
	const [note, setNote] = useState(false);
	const [loading, setLoading] = useState(true); // Loading state
	const [error, setError] = useState<string | null>(null); // Error state

	const convertApiDataToBoard = (data: any) => {
		const newBoard = dummyBoard;

		data.forEach((cell: any) => {
			const { x, y } = cell.coordinate;
			newBoard[x][y].initialValue = cell.boxContent;
			newBoard[x][y].isEditable = false;
		});

		return newBoard;
	};

	useEffect(() => {
		const fetchGameData = async () => {
			try {
				setLoading(true);
				const response = await fetch(constructUrl('API.GAME.ID', `/${code}`), {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				});

				if (!response.ok) {
					throw new Error('Failed to fetch game data');
				}

				const { data } = await response.json();

				const newBoard = convertApiDataToBoard(data);

				setBoard(newBoard); // Update board state with API data
			} catch (err) {
				setError((err as Error).message || 'Something went wrong');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchGameData();
	}, [code]);

	const handleNoteClick = () => setNote(!note);

	if (loading) {
		return <div>Loading Game...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-3xl font-bold mb-8'>Sudoku Puzzle</h1>
			<SudokuBoard addNote={note} initialBoard={board} code={code} />
			<div>
				<button onClick={handleNoteClick} className='relative text-slate-100 p-2 my-2 rounded-lg inline-flex bg-gray-800'>
					<span className='py-2 px-4'>Note</span>
					<span
						className={`${note ? 'bg-green-800' : 'bg-red-800'} p-1 rounded-lg text-[8px] absolute right-2 bottom-2`}
					>
						{note ? 'On' : 'Off'}
					</span>
				</button>
				{/* <button onClick={() => true} className='text-slate-100 p-2 my-2 mx-2 rounded-lg'>
					<p>Erase</p>
				</button> */}
			</div>
		</div>
	);
}
