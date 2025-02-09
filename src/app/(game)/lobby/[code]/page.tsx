'use client';

import CustomButton from '@/components/custom-button';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';

export default function GameLobby({ params }: { params: Promise<{ code: string }> }) {
	const router = useRouter();
	const { code } = use(params);
	const [countdown, setCountdown] = useState<number>(5);
	const [isCounting, setIsCounting] = useState(false);
	const [isCopied, setIsCopied] = useState(false);

	// Countdown timer effect
	useEffect(() => {
		if (isCounting && countdown > 0) {
			const timer = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(timer);
		} else if (countdown === 0) {
			router.push(`/game/${code}`);
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
		<div className='flex flex-col items-center justify-center min-h-screen p-4'>
			<div className='bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6'>
				<h1 className='text-2xl font-bold text-center text-indigo-600'>Game Lobby</h1>

				<div className='text-center space-y-4'>
					<p className='text-gray-600'>Share this game ID with friends:</p>
					<code className='bg-slate-100 p-2 rounded-lg font-mono text-indigo-500'>{code}</code>
				</div>

				<div className='flex flex-col space-y-4'>
					<CustomButton
						buttonText={isCounting ? `Starting in ${countdown}` : 'Start Game'}
						callback={() => setIsCounting(true)}
						className={`w-full py-3 font-medium text-white transition-all ${
							isCounting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
						}`}
						disabled={isCounting}
					/>

					<CustomButton
						// buttonText={
						//     <>
						//         {isCopied ? (
						//             '#x2713; Copied!'
						//         ) : (
						//             'Copy Invite Link'
						//         )}
						//     </>
						// }
						buttonText='Copy Invite Link'
						callback={handleCopyInvite}
						className='w-full py-3 bg-amber-100 hover:bg-amber-200 text-amber-700 font-medium border border-amber-200'
					/>
				</div>

				<p className='text-center text-sm text-gray-500'>
					{isCopied ? 'Link copied to clipboard!' : 'Click invite to share the game'}
				</p>
			</div>
		</div>
	);
}
