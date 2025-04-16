'use client';

import LoadingSpinner from '@/components/loading-spinner';
import ScoreBoard from '@/components/score-board';
import SudokuBoard from '@/components/sudoku-board';
import { constructUrl } from '@/units/general';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ApiResponseCell {
	coordinate: { x: number; y: number };
	boxContent: number;
	fill: boolean;
}

const sudokuBoard = (val: number | null | boolean) => {
	return Array.from({ length: 9 }, () => Array(9).fill(val));
};

export default function Game({ params }: { params: Promise<{ code: string }> }) {
	const router = useRouter();
	const { code } = use(params);
	const [note, setNote] = useState(false);
	const [isLoading, setIsLoading] = useState({ board: true, player: true });
	const [error, setError] = useState<string | null>(null); // Error state
	const [focus, setFocus] = useState<Record<string, number | null>>({});
	const [numberCount, setNumberCount] = useState<number[]>([]);
	const [boardData, setBoardData] = useState(sudokuBoard(null));
	const [boardEditable, setBoardEditable] = useState(sudokuBoard(true));
	const [players, setPlayers] = useState([]);

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
				newBoardEditable[x][y] = !cell.fill;
				updateNumberCount(cell.boxContent);
			});

			return { newBoardData, newBoardEditable };
		};

		const fetchGameData = async () => {
			try {
				setIsLoading({ player: true, board: true });
				const token = localStorage.getItem('token');

				const response = await fetch(constructUrl('API.GAME.ID', `/${code}`), {
					method: 'GET',
					headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				});

				if (!response.ok) {
					const { code, error } = await response.json();
					if (code === 401) {
						const currentPath = window.location.pathname;
						router.push(`/signup?redirect=${encodeURIComponent(currentPath)}`);
						toast.error('Please Sign Up again.');
						return;
					}
					toast.error(error[0].message);
					return;
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
				setIsLoading((prop) => ({ ...prop, board: false }));
			}
		};

		fetchGameData();
	}, [code, router]);

	useEffect(() => {
		const fetchGameData = async () => {
			try {
				const token = localStorage.getItem('token');

				const response = await fetch(constructUrl('API.GAME.ID.PLAYER', `/${code}`), {
					method: 'GET',
					headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				});

				if (!response.ok) {
					const { code, error } = await response.json();
					if (code === 401) {
						const currentPath = window.location.pathname;
						router.push(`/signup?redirect=${encodeURIComponent(currentPath)}`);
						toast.error('Please Sign Up again.');
						return;
					}
					toast.error(error[0].message);
					return;
				}

				setNumberCount(Array.from({ length: 9 }, () => 9));
				const { data } = await response.json();

				setPlayers(data);
			} catch (err) {
				setError((err as Error).message || 'Something went wrong');
			} finally {
				setIsLoading((prop) => ({ ...prop, player: false }));
			}
		};

		fetchGameData();
	}, [code, router]);

	const handleNoteClick = () => setNote(!note);

	const handleErase = () => {};

	const onFocus = (x: number | null, y: number | null, value: number | null) => {
		setFocus({ x, y, value });
	};

	const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const value = event.currentTarget.value;

		// Call onFocus with the value (convert to number if needed)
		onFocus(null, null, Number(value));
	};

	if (isLoading.board || isLoading.player) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='flex flex-col items-center w-full'>
			<h1 className='text-3xl font-bold m-4'>Sudoku Puzzle</h1>
			<ScoreBoard players={players} />
			<div className='flex flex-col items-center m-4'>
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
							className={`${
								note ? 'bg-green-800' : 'bg-red-800'
							} p-1 rounded-xl text-[8px] absolute -right-2 -top-2`}
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
		</div>
	);
}
