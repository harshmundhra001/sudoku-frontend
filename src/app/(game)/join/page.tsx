'use client';
import CustomButton from '@/components/custom-button';
import { constructUrl } from '@/units/general';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CreateGame() {
	const router = useRouter();
	const token = localStorage.getItem('token');
	const [code, setCode] = useState('');
	const [error, setError] = useState('');

	const handleSubmition = async () => {
		if (code.length !== 6) {
			setError('Invalid code');
			return;
		}
		try {
			const params = new URLSearchParams();
			params.append('code', code);
			const url = constructUrl('API.GAME.ISVALID');
			const response = await fetch(`${url}?${params}`, {
				method: 'GET',
				headers: {
					// 'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const { code, error } = await response.json();
				if (code === 401) {
					const currentPath = window.location.pathname;
					router.push(`/signup?redirect=${encodeURIComponent(currentPath)}`);
					toast.error('Please Sign Up again.');
					return;
				}

				// toast.error(error[0].message);

				if (code === 402) {
					setError(error[0].message);
				}
				return;
			}

			return;
		} catch (err) {
			setError((err as Error).message || 'Something went wrong');
		}
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		const upperCaseValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
		e.target.value = upperCaseValue;

		setCode(e.target.value);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSubmition();
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center w-full'>
			<div className='p-8 rounded-lg shadow-lg flex flex-col items-center w-full max-w-sm'>
				<h1 className='text-3xl font-bold mb-10'>Join Game</h1>
				<input
					onChange={handleTextChange}
					onKeyDown={handleKeyPress}
					maxLength={6}
					type='text'
					placeholder='Enter game code'
					className='w-full px-5 py-2 rounded-full focus:outline-none bg-transparent border border-gray-200/50 text-white placeholder-gray-200 focus:border-white/50 focus:ring-1 focus:ring-white/50'
					autoComplete={'off'}
					pattern='[A-Z0-9]{1,6}'
				/>
				{error && <span className='text-red-500 text-md pt-2 mt-1 -mb-4'>{error}</span>}
				<CustomButton buttonText='Join Game' callback={handleSubmition} className='mt-6 w-full' isPrimary={true} />
			</div>
		</div>
	);
}
