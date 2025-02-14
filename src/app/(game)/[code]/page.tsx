'use client';
import SudokuBoard from '@/components/sudoku-board';
import { constructUrl } from '@/units/general';
import { use, useEffect, useState } from 'react';

interface ApiResponseCell {
	coordinate: { x: number; y: number };
	boxContent: number;
}

interface Cell {
	isEditable: boolean;
	initialValue: number | null;
}

const dummyBoard: Cell[][] = Array(9)
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
	const [focus, setFocus] = useState<Record<string, number | null>>({});

	const convertApiDataToBoard = (data: ApiResponseCell[]) => {
		const newBoard = dummyBoard;

		data.forEach((cell) => {
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

	const handleEraseClick = () => false;

	const onFocus = (x: number | null, y: number | null, val: number | null) => {
		setFocus({ val, x, y });
	};

	const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const value = event.currentTarget.value;

		if(focus.x && focus.y) {
			
		}
	  
		// Call onFocus with the value (convert to number if needed)
		onFocus(null, null, Number(value));
	  
	  };

	if (loading) {
		return <div>Loading Game...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-3xl font-bold mb-8'>Sudoku Puzzle</h1>
			<SudokuBoard addNote={note} initialBoard={board} code={code} onFocus={onFocus} focusValue={focus} />
			<div className='flex justify-evenly w-1/3 m-4 '>
				<button onClick={handleNoteClick} className='relative text-slate-100 w-1/3 py-4 rounded-lg bg-gray-800'>
					<span className=''>Note</span>
					<span
						className={`${note ? 'bg-green-800' : 'bg-red-800'} p-1 rounded-xl text-[8px] absolute -right-2 -top-2`}
					>
						{note ? 'On' : 'Off'}
					</span>
				</button>
				<button onClick={() => true} className='text-slate-100 w-1/3 py-4 rounded-lg bg-gray-800'>
					<span className=''>Erase</span>
				</button>
			</div>
			<div className='flex m-4 justify-around w-full'>
				{[...Array(9)].map((_, index) => {
					const value = index + 1; // Button value (1-9)
					return (
						<button key={value} value={value} className='bg-slate-800 p-4 rounded-lg' onClick={handleButtonClick}>
							{value}
						</button>
					);
				})}
			</div>
		</div>
	);
}
