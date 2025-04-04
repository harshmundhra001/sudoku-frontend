'use client';

import LoadingSpinner from '@/components/loading-spinner';
import SudokuBoard from '@/components/sudoku-board';
import { constructUrl } from '@/units/general';
import { use, useEffect, useState } from 'react';

interface ApiResponseCell {
	coordinate: { x: number; y: number };
	boxContent: number;
}

const sudokuBoard = (val: number | null | boolean) => {
	return Array.from({ length: 9 }, () => Array(9).fill(val));
};

export default function Game({ params }: { params: Promise<{ code: string }> }) {
	const { code } = use(params);
	const [note, setNote] = useState(false);
	const [isLoading, setIsLoading] = useState(true); // Loading state
	const [error, setError] = useState<string | null>(null); // Error state
	const [focus, setFocus] = useState<Record<string, number | null>>({});
	const [numberCount, setNumberCount] = useState<number[]>([]);
	const [boardData, setBoardData] = useState(sudokuBoard(null));
	const [boardEditable, setBoardEditable] = useState(sudokuBoard(true));

	const updateNumberCount = (value: number, count: number = -1) => {
		setNumberCount((prev) => {
			const newCount = [...prev];
			newCount[value - 1] += count;
			return newCount;
		});
	};

	useEffect(() => {
		const convertApiDataToBoard = (data: ApiResponseCell[]) => {
			const newBoardData = sudokuBoard(null);
			const newBoardEditable = sudokuBoard(true);
	
			data.forEach((cell) => {
				const { x, y } = cell.coordinate;
				newBoardData[x][y] = cell.boxContent;
				newBoardEditable[x][y] = false;
				updateNumberCount(cell.boxContent);
			});
	
			return { newBoardData, newBoardEditable };
		};

		const fetchGameData = async () => {
			try {
				setIsLoading(true);
				const token = localStorage.getItem('token');

				const response = await fetch(constructUrl('API.GAME.ID', `/${code}`), {
					method: 'GET',
					headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				});

				if (!response.ok) {
					throw new Error('Failed to fetch game data');
				}

				setNumberCount(Array.from({ length: 9 }, () => 9));
				const { data } = await response.json();

				const board = convertApiDataToBoard(data);

				setBoardData(board.newBoardData); // Update board state with API data
				setBoardEditable(board.newBoardEditable);
			} catch (err) {
				setError((err as Error).message || 'Something went wrong');
				// console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchGameData();
	}, [code]);

	const handleNoteClick = () => setNote(!note);

	const handleErase = () => {
		// console.log({ focus });
		// if (focus.x !== null && focus.y !== null) {
		// 	// Update board state and number count
		// 	const newBoard = [...board];
		// 	const currentValue = newBoard[focus.x][focus.y].initialValue;
		// 	console.log({ currentValue });
		// 	if (currentValue !== null) {
		// 		updateNumberCount(currentValue, 1);
		// 	}
		// 	newBoard[focus.x][focus.y].initialValue = null;
		// 	setBoard(newBoard);
		// }
	};

	const onFocus = (x: number | null, y: number | null, value: number | null) => {
		setFocus({ x, y, value });
	};

	const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const value = event.currentTarget.value;

		// Call onFocus with the value (convert to number if needed)
		onFocus(null, null, Number(value));
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-3xl font-bold mb-8'>Sudoku Puzzle</h1>
			<SudokuBoard
				addNote={note}
				initialBoard={boardData}
				editBoard={boardEditable}
				code={code}
				onFocus={onFocus}
				focusValue={focus}
				updateNumberCount={updateNumberCount}
			/>
			<div className='flex justify-evenly w-1/3 m-4 '>
				<button onClick={handleNoteClick} className='relative text-slate-100 w-1/3 py-4 rounded-lg bg-gray-800'>
					<span className=''>Note</span>
					<span
						className={`${note ? 'bg-green-800' : 'bg-red-800'} p-1 rounded-xl text-[8px] absolute -right-2 -top-2`}
					>
						{note ? 'On' : 'Off'}
					</span>
				</button>
				<button onClick={handleErase} className='text-slate-100 w-1/3 py-4 rounded-lg bg-gray-800'>
					<span className=''>Erase</span>
				</button>
			</div>
			<div className='flex m-4 justify-around w-full'>
				{[...Array(9)].map((_, index) => {
					const value = index + 1; // Button value (1-9)
					return (
						<button
							key={value}
							value={value}
							className={`bg-slate-800 px-4 pt-4 pb-1 rounded-lg ${numberCount[index] === 0 && 'opacity-0'}`}
							onClick={handleButtonClick}
						>
							<div className='font-bold text-2xl'>{value}</div>
							<div className='text-xs'>{numberCount[index]}</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
