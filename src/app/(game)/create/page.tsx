'use client';
import CustomButton from '@/components/custom-button';
import { constructUrl } from '@/units/general';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CreateGame() {
	const router = useRouter();
	const [difficulty, setDifficulty] = useState('MEDIUM');
	const [isPublic, setIsPublic] = useState(true);
	const [error, setError] = useState('');
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (!token) {
			const currentPath = window.location.pathname;
			router.push(`/signup?redirect=${encodeURIComponent(currentPath)}`);
		}
	}, [router, token]);

	const handleCreateGame = async () => {
		try {
			const response = await fetch(constructUrl('API.GAME.CREATE'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					difficulty,
					isPublic,
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

			router.push(`lobby/${data.code}`);

			return;
		} catch (err) {
			setError((err as Error).message || 'Something went wrong');
		}
	};

	return (
		<div className='flex flex-col items-center justify-center shadow-lg shadow-gray-950 p-12'>
			<h1 className='text-3xl font-bold mb-8'>Create Game</h1>

			<div className='w-full max-w-xl space-y-6'>
				{/* Difficulty Selection */}
				<div className='space-y-2'>
					<h2 className='text-lg font-medium'>Difficulty</h2>
					<div className='grid grid-cols-5 gap-2'>
						{['EASY', 'MEDIUM', 'HARD', 'EXTREME', 'EXPERT'].map((level) => (
							<button
								key={level}
								onClick={() => setDifficulty(level)}
								className={`p-3 rounded-lg transition-colors duration-400 border-2 ${
									difficulty === level ? 'bg-primary text-white' : 'border-separate text-prim-light  border-primary hover:text-white hover:bg-primary'
								}`}
							>
								{level}
							</button>
						))}
					</div>
				</div>

				{/* Public/Private Toggle */}
				<div className='space-y-2'>
					<h2 className='text-lg font-medium'>Visibility</h2>
					<div className='grid grid-cols-2 gap-2'>
						<button
							onClick={() => setIsPublic(true)}
							className={`p-3 rounded-lg transition-colors ${
								isPublic ? 'bg-green-500 text-white' : 'bg-gray-400 hover:bg-gray-300'
							}`}
						>
							Public
						</button>
						<button
							onClick={() => setIsPublic(false)}
							className={`p-3 rounded-lg transition-colors ${
								!isPublic ? 'bg-purple-500 text-white' : 'bg-gray-400 hover:bg-gray-300'
							}`}
						>
							Private
						</button>
					</div>
				</div>

				{/* Error Message */}
				{error && <div className='text-red-500 text-center'>{error}</div>}

				{/* Create Game Button */}
				<CustomButton buttonText='Create Game' callback={handleCreateGame} className='w-full font-medium' />
			</div>
		</div>
	);
}
