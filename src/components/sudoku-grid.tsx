import { SudokuBlockProps } from '@/types/board';
import { constructUrl } from '@/units/general';
import React, { useEffect, useState } from 'react';

export default function SudokuGrid(props: SudokuBlockProps) {
	const { addNote, initialValue, isEditable, code, x, y } = props;
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
			const response = await fetch(constructUrl('API.GAME.SUBMIT'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					code,
					x,
					y,
					val: key,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to fetch game data');
			}

			const { data } = await response.json();

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
				setGrid(grid.map((row) => row.map(() => false))); // Clear notes grid
				fetchGameData(key);
			} else if (blockValue === key) {
				setblockValue(null);
				setIsAnswerIncorrect(false);
			}
		}

		// Handle deletion
		if (e.key === 'Backspace' || e.key === 'Delete') {
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
						<div key={j} className='w-1/3 h-full flex items-center justify-center text-gray-300'>
							{cell && i * 3 + j + 1}
						</div>
					))}
				</div>
			))}
		</div>
	);

	return (
		<div
			className={`relative w-16 h-16 bg-slate-800 hover:border-2 hover:border-gray-500 focus:border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none ${
				isAnswerInCorrect ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-300' : ''
			}`}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			role='gridcell'
			aria-label={blockValue ? `Cell value ${blockValue}` : 'Empty cell'}
		>
			{blockValue ? (
				<div className={`absolute inset-0 flex items-center justify-center text-3xl ${loading ? 'text-gray-400': 'text-white'} pointer-events-none`}>
					{blockValue}
				</div>
			) : (
				renderNotesGrid()
			)}
		</div>
	);
}
