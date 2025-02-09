'use client';
import CustomButton from '@/components/custom-button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateGame() {
	const router = useRouter();
	const [code, setCode] = useState('');
	const [error, setError] = useState('');

	const handleSubmition = () => {
		if (code.length !== 6) {
			setError('Invalid code');
			return;
		}
		router.push(`lobby/${code}`);
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
				<h1 className='text-3xl font-bold mb-6'>Join Game</h1>
				<input
					onChange={handleTextChange}
					onKeyDown={handleKeyPress}
					maxLength={6}
					type='text'
					placeholder='Enter game code'
					className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-400'
				/>
				{error && <span className='text-red-500 text-md pt-2 mt-1 -mb-4'>{error}</span>}
                <CustomButton
                    buttonText='Join Game'
                    callback={handleSubmition}
                    className='mt-6 w-full bg-primary text-white p-3 rounded-lg hover:bg-prim-dark transition duration-300'
                    isPrimary={true}
                />
			</div>
		</div>
	);
}
