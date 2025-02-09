'use client';
import CustomButton from '@/components/custom-button';
import { useState } from 'react';

const signupStates = {
	login: 1,
	guest: 2,
	signup: 3,
};

function GenerateInputs(props: { count: number; type: string[]; placeholders: string[] }) {
	const { count, type, placeholders } = props;
	const inputs = [];
	for (let i = 0; i < count; i++) {
		inputs.push(
			<input
				key={i}
				type={type[i]}
				placeholder={placeholders[i]}
				className={`w-3/4 px-5 py-2 rounded-xl text-black focus:outline-none`}
			></input>
		);
	}
	return inputs;
}

function GeneralEntryComponent(props: {
	name: string;
	currentState: number;
	componentState: number;
	inputType: string[];
	placeholders: string[];
	isPrimary: boolean;
	handleClick: (state: number) => void;
}) {
	const { name, currentState, componentState, inputType, placeholders, isPrimary, handleClick } = props;
	return (
		<div
			className={`flex flex-col justify-evenly items-center p-5 w-1/3 h-full ${
				isPrimary ? 'bg-primary' : 'bg-secondary'
			} text-center transition-all duration-500 ease-in-out will-change-transform ${
				currentState === 0
					? `${isPrimary ? 'hover:bg-prim-dark' : 'hover:bg-sec-dark'} hover:w-4/5`
					: currentState === componentState
					? 'w-4/5'
					: 'w-2/12'
			}`}
			onClick={() => handleClick(componentState)}
		>
			<span className={`${currentState === componentState ? 'text-5xl font-bold' : ''}`}>{name}</span>
			{currentState === componentState && (
				<div className='flex flex-col justify-evenly items-center h-2/3 w-full'>
					<GenerateInputs count={inputType.length} type={inputType} placeholders={placeholders} />

					<CustomButton buttonText={name} callback={() => true} className='w-3/4 rounded-xl py-3' isPrimary={!isPrimary} />
				</div>
			)}
		</div>
	);
}

export default function Game() {
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
				<GeneralEntryComponent
					name='Log In'
					currentState={state}
					componentState={signupStates.login}
					inputType={['email', 'password']}
					placeholders={['Email', 'Password']}
					isPrimary={true}
					handleClick={handleClick}
				/>
				<GeneralEntryComponent
					name='Guest'
					currentState={state}
					componentState={signupStates.guest}
					inputType={['text']}
					placeholders={['Name']}
					isPrimary={false}
					handleClick={handleClick}
				/>
				<GeneralEntryComponent
					name='Sign Up'
					currentState={state}
					componentState={signupStates.signup}
					inputType={['email', 'password', 'password']}
					placeholders={['Email', 'Password', 'Confirm Password']}
					isPrimary={true}
					handleClick={handleClick}
				/>
			</div>
		</>
	);
}
