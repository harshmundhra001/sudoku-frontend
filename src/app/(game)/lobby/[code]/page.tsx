'use client';

import CustomButton from '@/components/custom-button';
import LoadingSpinner from '@/components/loading-spinner';
import { SOCKET } from '@/constants';
import { constructUrl } from '@/units/general';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function GameLobby({ params }: { params: Promise<{ code: string }> }) {
	const router = useRouter();
	const { code } = use(params);
	const [countdown, setCountdown] = useState<number>(5);
	const [isCounting, setIsCounting] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [players, setPlayers] = useState<{ _id: string; name: string }[]>([]); // Hardcoded users

	const token = localStorage.getItem('token');

	const handleGameStart = () => {
		setIsCounting(true);
	};

	const handlePlayerJoin = (newPlayer: { _id: string; name: string }) => {
		setPlayers((prev) => (prev.some((p) => p._id === newPlayer._id) ? prev : [...prev, newPlayer]));
	};

	useEffect(() => {
		let socket: Socket;

		const initializeSocket = async () => {
			socket = io(SOCKET, {
				withCredentials: true,
				auth: {
					gameCode: code,
					token: token,
				},
				reconnectionAttempts: 3,
				reconnectionDelay: 3000,
				transports: ['websocket'],
			});

			socket
				.on('connect', () => {
					console.log('Connected:', socket.id);
					socket.emit('joinLobby', code);
				})
				.on('gameStarting', handleGameStart)
				.on('playerJoined', handlePlayerJoin);

			setSocket(socket);
		};

		initializeSocket();

		return () => {
			socket.emit('leaveLobby', code);
			socket?.disconnect();
		};
	}, [code, token]);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		const joinGame = async () => {
			try {
				if (!token || !code) {
					router.push('/signup');
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

				setPlayers(responseData.data);

				setIsLoading(false);
			} catch (error) {
				console.log('Error joining game:', error);
			}
		};

		joinGame();

		return () => {
			controller.abort();
		};
	}, [code, router, token]);

	const handleStartGame = async () => {
		try {
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

	if (isLoading || !socket) return <LoadingSpinner />;

	return (
		<div className='flex flex-col items-center justify-center min-h-[95vh] w-full md:w-1/2 lg:w-1/3 p-4'>
			<div className='rounded-xl p-8 w-full max-w-md space-y-6'>
				{' '}
				{/* Removed bg-white and shadow */}
				<h1 className='text-3xl font-bold text-center text-indigo-600'>Game Lobby</h1>
				<div className='text-center space-y-8'>
					<p className='text-gray-300'>Share this game ID with friends:</p>
					<code className='p-2 rounded-lg font-mono text-indigo-500'>{code}</code>
				</div>
				{/* Added scrollable user list */}
				<div className='space-y-2 max-h-48 overflow-y-auto border border-gray-700 rounded-lg bg-black shadow-2xl pb-2'>
					<p className='text-gray-300 text-center bg-gray-800 p-2'>Players in Lobby:</p>
					{Array.isArray(players) &&
						players.length > 0 &&
						players.map((player) => (
							<div key={player._id} className='p-1 rounded-lg text-center'>
								{player.name}
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
