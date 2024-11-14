import React, { useState } from 'react';

function SudokuGrid(props: { addNote: boolean }) {
	const { addNote } = props;
	// Initialize a 3x3 grid with empty values
	const [grid, setGrid] = useState(
		Array(3)
			.fill(null)
			.map(() => Array(3).fill(null))
	);
	const [block, setBlock] = useState<number | null>(null);

	const generateGridData = (key: number) => {
		const row = Math.floor((key - 1) / 3);
		const col = (key - 1) % 3;

		// Update the grid with the new value
		const newGrid = [...grid];
		if (newGrid[row][col] === null) newGrid[row][col] = key.toString();
		else newGrid[row][col] = null;

		return newGrid;
	};

	const getEmptyGridData = () => {
		return Array(3)
			.fill(null)
			.map(() => Array(3).fill(null));
	};
	// Function to handle keydown event
	const handleKeyDown = (e: React.KeyboardEvent) => {
		const key = parseInt(e.key, 10);

		// Check if the key is a number between 1 and 9
		if (key >= 1 && key <= 9) {
			// Determine row and column based on key
			let newGrid;

			if (block) {
				return;
			}
			if (addNote) {
				newGrid = generateGridData(key);
			} else {
				newGrid = getEmptyGridData();
				setBlock(key);
			}
			setGrid(newGrid);
		}
	};

	// Separate function to render the grid based on the 2D array
	const renderGrid = (gridData: (number | null)[][]) => (
		<div className='absolute inset-0 z-0 grid grid-rows-3'>
			{gridData.map((row, rowIndex) => (
				<div key={rowIndex} className='flex'>
					{row.map((cell, colIndex) => (
						<div key={colIndex} className='w-1/3 h-full bg-slate-800 flex items-center justify-center text-gray-300'>
							{cell}
						</div>
					))}
				</div>
			))}
		</div>
	);

	return (
		<div
			className='relative w-16 h-16'
			onKeyDown={handleKeyDown}
			tabIndex={0} // Make the div focusable to capture keydown events
		>
			{/* Render the base grid */}
			{renderGrid(grid)}

			{/* Bordered layer for styling */}
			<div className='absolute inset-0 z-10 flex items-center justify-center text-4xl hover:border-2 hover:border-gray-500'>
				{block}
			</div>
		</div>
	);
}

export default SudokuGrid;
