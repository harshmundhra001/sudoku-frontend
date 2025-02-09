import { SudokuBlockProps } from '@/types/board';
import React, { useState } from 'react';

export default function SudokuGrid(props: SudokuBlockProps) {
	const { addNote, initialValue, isEditable } = props;
	// Initialize a 3x3 grid for notes with booleans
	const [grid, setGrid] = useState<boolean[][]>(
		Array(3)
			.fill(false)
			.map(() => Array(3).fill(false))
	);
	const [blockValue, setblockValue] = useState<number | null>(initialValue);

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
				// Only allow notes if no main number exists
				setGrid(updateNoteGrid(key));
			} else if (!blockValue || blockValue === key) {
				setblockValue((current) => (current ? null : key));
				setGrid(grid.map((row) => row.map(() => false))); // Clear notes when setting number
			}
		}

		// Handle deletion
		if (e.key === 'Backspace' || e.key === 'Delete') {
			setblockValue(null);
			setGrid(grid.map((row) => row.map(() => false)));
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
			className='relative w-16 h-16 bg-slate-800 hover:border-2 hover:border-gray-500 focus:border-2 focus:border-blue-500 outline-none'
			onKeyDown={handleKeyDown}
			tabIndex={0}
			role='gridcell'
			aria-label={blockValue ? `Cell value ${blockValue}` : 'Empty cell'}
		>
			{blockValue ? (
				<div className='absolute inset-0 flex items-center justify-center text-3xl text-white pointer-events-none'>
					{blockValue}
				</div>
			) : (
				renderNotesGrid()
			)}
		</div>
	);
}
