'use client';
import SudokuBoard from '@/components/sudoku/board';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CreateGame() {
	const router = useRouter();

	useEffect(() => {
		router.prefetch('/create');
		router.prefetch('/join');
	}, [router]);

	return (
		<div className=''>
			<SudokuBoard
				addNote={false}
				initialBoard={[
					[6, null, null, null, 4, null, null, 5, null],
					[null, null, null, 6, null, null, null, null, 1],
					[null, null, null, null, 5, 1, 8, 4, null],
					[null, null, 3, null, 6, null, 5, 2, 9],
					[9, 4, null, 5, null, null, 7, 1, 8],
					[null, null, 5, null, 8, 7, 4, 6, 3],
					[null, null, 7, null, 1, 6, null, null, null],
					[1, null, 8, 7, 9, 2, 6, null, 4],
					[null, 6, null, 8, 3, 5, 1, null, null],
				]}
				focusValue={{ x: 1, y: 3, value: 6 }}
				editBoard={[
					[false, true, true, true, false, true, true, false, true],
					[true, true, true, false, true, true, true, true, false],
					[true, true, true, true, false, false, false, false, true],
					[true, true, false, true, false, true, false, false, false],
					[false, false, true, false, true, true, false, false, false],
					[true, true, false, true, false, false, false, false, false],
					[true, true, false, true, false, false, true, true, true],
					[false, true, false, false, false, false, true, true, false],
					[true, false, true, false, false, false, false, true, true],
				]}
			/>
		</div>
	);
}
