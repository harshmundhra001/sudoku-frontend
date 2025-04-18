'use client';

import CustomButton from '@/components/custom-button';
import { constructUrl } from '@/units/general';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

enum SignupStates {
	LOGIN = 'Log In',
	GUEST = 'Guest',
	SIGNUP = 'Sign Up',
}

type NameType = { name: string };
type CredentialsType = { email: string; password: string };

type FormFields = {
	name?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
};

interface InputConfig {
	type: string;
	name: keyof FormFields;
	placeholder: string;
	required?: boolean;
}

function GenerateInputs({
	inputs,
	onChange,
}: {
	inputs: InputConfig[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<>
			{inputs.map((input) => (
				<div key={input.name} className='w-3/4 mb-4'>
					<label htmlFor={input.name} className='sr-only'>
						{input.placeholder}
					</label>
					<input
						{...input}
						id={input.name}
						onChange={onChange}
						className='w-full px-5 py-2 rounded-full focus:outline-none bg-transparent border border-gray-200/50 text-white placeholder-gray-200 focus:border-white/50 focus:ring-1 focus:ring-white/50'
						autoComplete={input.type === 'password' ? 'new-password' : 'off'}
					/>
				</div>
			))}
		</>
	);
}

function GeneralEntryComponent<T extends NameType | CredentialsType | (NameType & CredentialsType)>(props: {
	name: SignupStates;
	currentState: SignupStates | null;
	inputs: InputConfig[];
	isPrimary: boolean;
	handleClick: (state: SignupStates) => void;
	handleSubmit?: (data: T) => Promise<void>;
}) {
	const { name, currentState, inputs, isPrimary, handleClick, handleSubmit } = props;
	const [formData, setFormData] = useState<FormFields>({});
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);

	const handleButtonClick = async () => {
		if (!handleSubmit) {
			return;
		}

		setError('');

		if (name === SignupStates.SIGNUP && formData.password !== formData.confirmPassword) {
			setError('Passwords do not match');
			return;
		}
		if (name === SignupStates.SIGNUP && !formData.name?.length && !formData.email?.length && !formData.password?.length) {
			setError('Please fill the complete form.');
			return;
		}
		if (name === SignupStates.LOGIN && !formData.email?.length && !formData.password?.length) {
			setError('Please fill the complete form.');
			return;
		}
		if (name === SignupStates.GUEST && !formData.name?.length) {
			setError('Please fill the complete form.');
			return;
		}

		try {
			setIsLoading(true);
			const inputData = {
				name: formData.name,
				email: formData.email?.toLowerCase(),
				password: formData.password,
			};

			await handleSubmit(inputData as T);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div
			className={`flex flex-col justify-evenly items-center p-5 w-1/3 h-full ${
				isPrimary ? 'bg-primary' : 'bg-secondary'
			} text-center transition-all duration-500 ease-in-out will-change-transform ${
				currentState === null
					? `${isPrimary ? 'hover:bg-prim-dark' : 'hover:bg-sec-dark'} hover:w-4/5`
					: currentState === name
					? 'w-4/5'
					: 'w-2/12'
			}`}
			onClick={() => handleClick(name)}
		>
			<span
				className={`${
					currentState === name ? 'text-5xl font-bold' : 'text-lg font-thin'
				} transition-all duration-500 ease-in-out cursor-default`}
			>
				{name}
			</span>
			{currentState === name && (
				<div
					className={`flex flex-col justify-evenly items-center h-2/3 w-full transition-all duration-500 ease-in-out ${
						currentState === name ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<GenerateInputs
						inputs={inputs}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
					/>
					{error && <div className='text-red-500 mb-2'>{error}</div>}
					<CustomButton
						buttonText={name}
						callback={handleButtonClick}
						className='w-3/4'
						isPrimary={!isPrimary}
						disabled={isLoading}
					/>
				</div>
			)}
		</div>
	);
}

export default function AuthPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [currentState, setCurrentState] = useState<SignupStates | null>(null);

	const loginInputs: InputConfig[] = [
		{ type: 'email', name: 'email', placeholder: 'Email', required: true },
		{ type: 'password', name: 'password', placeholder: 'Password', required: true },
	];

	const guestInputs: InputConfig[] = [{ type: 'text', name: 'name', placeholder: 'Name', required: true }];

	const signupInputs: InputConfig[] = [
		...guestInputs,
		...loginInputs,
		{ type: 'password', name: 'confirmPassword', placeholder: 'Confirm Password', required: true },
	];

	const process = (token: string, name: string) => {
		localStorage.setItem('token', token);
		localStorage.setItem('user', name);

		const redirectPath = searchParams.get('redirect');

		if (redirectPath) {
			router.push(decodeURIComponent(redirectPath));
			return;
		}

		router.push('/game');
	};

	const handleLogin = async (inputData: { email: string; password: string }) => {
		try {
			const response = await fetch(constructUrl('API.AUTH.LOGIN'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(inputData),
			});

			if (!response.ok) {
				const errorResponse = await response.json();
				toast.error(errorResponse.error[0].message);
				return;
			}

			const { data } = await response.json();

			process(data.token, data.name);
		} catch (error) {
			console.log(error);
		}
	};

	const handleGuest = async (inputData: { name: string }) => {
		try {
			const response = await fetch(constructUrl('API.AUTH.GUEST'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(inputData),
			});

			if (!response.ok) {
				const errorResponse = await response.json();
				toast.error(errorResponse.error[0].message);
				return;
			}

			const { data } = await response.json();

			process(data.token, data.name);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignUp = async (inputData: { name: string; email: string; password: string }) => {
		try {
			const response = await fetch(constructUrl('API.AUTH.SIGNUP'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(inputData),
			});

			if (!response.ok) {
				const errorResponse = await response.json();
				toast.error(errorResponse.error[0].message);
				return;
			}

			const { data } = await response.json();

			process(data.token, data.name);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			className={`flex items-center justify-center text-xl rounded-2xl overflow-hidden transition-all duration-500 ease-in-out shadow-2xl ${
				currentState !== null ? 'lg:w-2/5 md:w-3/5 w-4/5 h-[500px]' : 'lg:w-1/3 w-3/5 h-16'
			}`}
		>
			<GeneralEntryComponent
				name={SignupStates.LOGIN}
				currentState={currentState}
				inputs={loginInputs}
				isPrimary={true}
				handleClick={setCurrentState}
				handleSubmit={handleLogin}
			/>
			<GeneralEntryComponent
				name={SignupStates.GUEST}
				currentState={currentState}
				inputs={guestInputs}
				isPrimary={false}
				handleClick={setCurrentState}
				handleSubmit={handleGuest}
			/>
			<GeneralEntryComponent
				name={SignupStates.SIGNUP}
				currentState={currentState}
				inputs={signupInputs}
				isPrimary={true}
				handleClick={setCurrentState}
				handleSubmit={handleSignUp}
			/>
		</div>
	);
}
