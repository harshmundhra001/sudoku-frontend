'use client';
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
			<div className='flex items-center justify-center text-xl w-1/4 rounded-2xl overflow-hidden focus:h-2/5'>
				<div
					className='p-5 w-1/3 bg-primary text-center transition-all duration-500 ease-in-out will-change-transform hover:bg-prim-dark hover:w-3/5'
					onClick={() => handleClick(signupStates.login)}
				>
					<span>Log In</span>
				</div>
				<div
					className='p-5 w-1/3 bg-secondary text-center transition-all duration-500 ease-in-out will-change-transform hover:bg-sec-dark hover:w-3/5'
					onClick={() => handleClick(signupStates.guest)}
				>
					<span>Guest</span>
				</div>
				<div
					className='p-5 w-1/3 bg-primary text-center transition-all duration-500 ease-in-out will-change-transform hover:bg-prim-dark hover:w-3/5'
					onClick={() => handleClick(signupStates.signup)}
				>
					<span>Sign Up</span>
				</div>
			</div>
		</>
	);
}

// const LoginForm = () => (
//     <div className='flex items-center justify-center text-xl w-1/3 rounded-2xl overflow-hidden h-2/5'>
//         <div className='flex flex-col justify-center p-5 w-4/5 bg-primary text-center h-full'>
//             <h1 className='text-4xl font-bold'>Log In</h1>
//             <input
//                 type='email'
//                 placeholder='Email'
//                 className='m-5 px-5 py-2 rounded-xl text-black focus:outline-none'
//             ></input>
//             <input
//                 type='password'
//                 placeholder='Password'
//                 className='m-5 px-5 py-2 rounded-xl text-black focus:outline-none'
//             ></input>
//         </div>
//         <div className='w-1/5 text-center h-full'>
//             <div className='flex justify-center items-center p-5 w-full bg-secondary hover:bg-sec-dark transition-all duration-500 ease-in-out text-center h-1/2'>
//                 <span>Guest</span>
//             </div>
//             <div className='flex justify-center items-center p-5 w-full bg-prim-light hover:bg-prim-dark transition-all duration-500 ease-in-out h-1/2'>
//                 <span>Sign Up</span>
//             </div>
//         </div>
//     </div>
// );
