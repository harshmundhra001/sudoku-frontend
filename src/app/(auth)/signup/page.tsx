'use client';
import CustomButton from '@/components/custom-button';
import { useState } from 'react';

export default function Game() {
	const signupStates = {
		login: 1,
		guest: 2,
		signup: 3,
	};
	const [state, setState] = useState(0);

	const handleClick = (state: number) => {
		setState(state);
	};

	return (
		<>
			<div
				className={`flex items-center justify-center text-xl w-1/3 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
					state !== 0 ? 'w-2/5 h-2/5 min-h-96' : 'h-auto'
				}`}
			>
				<div
					className={`flex flex-col justify-evenly items-center p-5 w-1/3 h-full bg-primary text-center transition-all duration-500 ease-in-out will-change-transform ${
						state === 0 ? 'hover:bg-prim-dark hover:w-4/5' : state === signupStates.login ? 'w-4/5' : 'w-2/12'
					}`}
					onClick={() => handleClick(signupStates.login)}
				>
					<span className={`${state === signupStates.login ? 'text-5xl font-bold' : ''}`}>Log In</span>
					{state === signupStates.login && (
						<div className='flex flex-col justify-evenly items-center h-2/3 w-full'>
							<input
								type='email'
								placeholder='Email'
								className={`w-3/4 px-5 py-2 rounded-xl text-black focus:outline-none transition-all duration-500 opacity-0 ${
									state === signupStates.login ? 'opacity-100 scale-100' : ''
								}`}
							></input>
							<input
								type='password'
								placeholder='Password'
								className='w-3/4 px-5 py-2 rounded-xl text-black focus:outline-none'
							></input>

							<CustomButton buttonText='Log In' callback={() => true} className='w-3/4 rounded-xl py-3' />
						</div>
					)}
				</div>
				<div
					className={`flex justify-center items-center p-5 w-1/3 h-full bg-secondary text-center transition-all duration-500 ease-in-out will-change-transform ${
						state === 0 ? 'hover:bg-sec-dark hover:w-4/5' : state === signupStates.guest ? 'w-4/5' : 'w-2/12'
					}`}
					onClick={() => handleClick(signupStates.guest)}
				>
					<span>Guest</span>
				</div>
				<div
					className={`flex justify-center items-center p-5 w-1/3 h-full bg-primary text-center transition-all duration-500 ease-in-out will-change-transform ${
						state === 0 ? 'hover:bg-prim-dark hover:w-4/5' : state === signupStates.signup ? 'w-4/5' : 'w-2/12'
					}`}
					onClick={() => handleClick(signupStates.signup)}
				>
					<span>Sign Up</span>
				</div>
			</div>
		</>
	);
}
