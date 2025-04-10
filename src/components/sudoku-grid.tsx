import { SudokuBlockProps } from '@/types/board';
import { constructUrl } from '@/units/general';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function SudokuGrid(props: SudokuBlockProps) {
	const router = useRouter();
	const { addNote, initialValue, isEditable, code, x, y, numberFocus, onFocus, isBlockFocus, updateNumberCount } = props;
	const [loading, setLoading] = useState(false);
	const [isAnswerInCorrect, setIsAnswerIncorrect] = useState<boolean>(false);

	// Initialize a 3x3 grid for notes with booleans
	const [grid, setGrid] = useState<boolean[][]>(
		Array(3)
			.fill(false)
			.map(() => Array(3).fill(false))
	);
	const [blockValue, setblockValue] = useState<number | null>(initialValue);

	const fetchGameData = async (key: number) => {
		try {
			setLoading(true);
			const token = localStorage.getItem('token');
			const response = await fetch(constructUrl('API.GAME.SUBMIT'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
				body: JSON.stringify({
					code,
					x,
					y,
					val: key,
				}),
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

			const { data } = await response.json();

			if (data) {
				updateNumberCount(key);
			}

			setIsAnswerIncorrect(!data);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const updateNoteGrid = (key: number) => {
		const row = Math.floor((key - 1) / 3);
		const col = (key - 1) % 3;

		// Create a deep copy of the grid to maintain immutability
		const newGrid = grid.map((row) => [...row]);
		newGrid[row][col] = !newGrid[row][col];
		return newGrid;
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!isEditable) return;

		// Handle number input
		if (/^[1-9]$/.test(e.key)) {
			const key = parseInt(e.key, 10);

			if (addNote && !blockValue) {
				setGrid(updateNoteGrid(key));
			} else if (!blockValue) {
				setblockValue(key);
				onFocus(x, y, key);
				setGrid(grid.map((row) => row.map(() => false))); // Clear notes grid
				fetchGameData(key);
			} else if (blockValue === key) {
				if (!isAnswerInCorrect) {
					updateNumberCount(key, 1);
				}
				setblockValue(null);
				setIsAnswerIncorrect(false);
			}
		}

		// Handle deletion
		if (e.key === 'Backspace' || e.key === 'Delete') {
			if (blockValue && !isAnswerInCorrect) {
				updateNumberCount(blockValue, 1);
			}
			setblockValue(null);
			setGrid(grid.map((row) => row.map(() => false)));
			setIsAnswerIncorrect(false);
		}
	};

	const renderNotesGrid = () => (
		<div className='absolute inset-0 grid grid-rows-3 text-xs'>
			{grid.map((row, i) => (
				<div key={i} className='flex'>
					{row.map((cell, j) => (
						<div
							key={j}
							className={`w-1/3 h-full flex items-center justify-center text-gray-300 ${
								cell && i * 3 + j + 1 === numberFocus ? 'bg-blue-400' : ''
							} rounded-md`}
						>
							{cell && i * 3 + j + 1}
						</div>
					))}
				</div>
			))}
		</div>
	);

	return (
		<div
			className={`relative w-16 h-16 ${
				blockValue && numberFocus === blockValue ? 'bg-slate-700' : isBlockFocus ? 'bg-slate-900' : 'bg-slate-800'
			} hover:border-2 hover:border-gray-500 focus:border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none ${
				isAnswerInCorrect ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-300' : ''
			}`}
			onKeyDown={handleKeyDown}
			onClick={() => {
				onFocus(x, y, blockValue);
			}}
			tabIndex={0}
			role='gridcell'
			aria-label={blockValue ? `Cell value ${blockValue}` : 'Empty cell'}
		>
			{blockValue ? (
				<div
					className={`absolute inset-0 flex items-center justify-center text-3xl ${
						loading ? 'text-blue-600' : isEditable ? 'text-blue-400' : 'text-white'
					} ${numberFocus === blockValue ? 'font-bole' : ''} pointer-events-none`}
				>
					{blockValue}
				</div>
			) : (
				renderNotesGrid()
			)}
		</div>
	);
}
