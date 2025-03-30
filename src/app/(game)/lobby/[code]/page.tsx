'use client';

import CustomButton from '@/components/custom-button';
import { constructUrl } from '@/units/general';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';

export default function GameLobby({ params }: { params: Promise<{ code: string }> }) {
	const router = useRouter();
	const { code } = use(params);
	const [countdown, setCountdown] = useState<number>(5);
	const [isCounting, setIsCounting] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const [users] = useState(['Player 1', 'Player 2', 'player 3', 'player 3', 'player 3', 'player 3', 'player 3']); // Hardcoded users

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		const joinGame = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					throw new Error('No authentication token found');
				}

				const response = await fetch(constructUrl('API.GAME.JOIN'), {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ code }),
					signal, // Connect to abort controller
				});

				if (!response.ok) {
					const errorData = await response.json();
					console.log(errorData, 'Failed to join game');
				}

				const responseData = await response.json();
				console.log('Join game successful:', responseData);

				// Handle successful response here (e.g., update state)
			} catch (error) {
				console.log('Error joining game:', error);
				// Handle error here (e.g., show error message, redirect)
			}
		};

		joinGame();

		return () => {
			controller.abort();
		};
	}, [code]);

	const handleStartGame = async () => {
		try {
			const token = localStorage.getItem('token');

			const response = await fetch(constructUrl('API.GAME.START'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					code,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to create game');
			}

			setIsCounting(true);

			return;
		} catch (err) {
			// setError((err as Error).message || 'Something went wrong');
			console.error(err);
		}
	};

	// Countdown timer effect
	useEffect(() => {
		if (isCounting && countdown > 0) {
			const timer = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(timer);
		} else if (countdown === 0) {
			router.push(`/${code}`);
		}
	}, [isCounting, countdown, code, router]);

	const handleCopyInvite = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy URL:', err);
		}
	};

	if (!code) return <div>Loading...</div>;

	return (
		<div className='flex flex-col items-center justify-center min-h-[95vh] w-1/3 p-4'>
			<div className='rounded-xl p-8 w-full max-w-md space-y-6'>
				{' '}
				{/* Removed bg-white and shadow */}
				<h1 className='text-3xl font-bold text-center text-indigo-600'>Game Lobby</h1>
				<div className='text-center space-y-8'>
					<p className='text-gray-300'>Share this game ID with friends:</p>
					<code className='p-2 rounded-lg font-mono text-indigo-500'>{code}</code>
				</div>
				{/* Added scrollable user list */}
				<div className='space-y-2 max-h-48 overflow-y-auto border border-gray-700 rounded-lg bg-black shadow-2xl'>
					<p className='text-gray-300 text-center bg-gray-800 p-2'>Players in Lobby:</p>
					{users.map((user, index) => (
						<div key={index} className='p-1 rounded-lg text-center'>
							{user}
						</div>
					))}
				</div>
				<div className='flex flex-col space-y-4'>
					<CustomButton
						buttonText={isCounting ? `Starting in ${countdown}` : 'Start Game'}
						callback={handleStartGame}
						className={`w-full font-medium ${isCounting ? 'bg-indigo-400 cursor-not-allowed' : ''}`}
						isPrimary={true}
						disabled={isCounting}
					/>

					<CustomButton
						buttonText='Copy Invite Link'
						callback={handleCopyInvite}
						className='w-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium border border-amber-200'
					/>
				</div>
				<p className='text-center text-sm text-gray-500'>
					{isCopied ? 'Link copied to clipboard!' : 'Click invite to share the game'}
				</p>
			</div>
		</div>
	);
}
