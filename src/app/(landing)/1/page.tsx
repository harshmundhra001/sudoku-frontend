"use client";
import { useRouter } from "next/navigation";

// export default function Game() {
//     // const router = useRouter();
// 	// const { code } = params;
// 	return (
// 		<div>
// 			<h1>
// 				Log In/Play as guest
// 			</h1>

// 		</div>
// 	);
// }

export default function Game() {
	const router = useRouter();
	// const { code } = params;

	const handleLoginClick = () => {
		router.push(`/login`)
	}

	return (
		<div className='flex items-center justify-center  h-[calc(100vh-15rem)]'>
			<div className='text-center'>
				<h1 className='mb-8 text-3xl font-bold text-gray-200'>Welcome</h1>
				<div className='flex gap-4'>
					<button onClick={handleLoginClick} className='px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600'>Login</button>
					<button className='px-6 py-3 text-white bg-green-500 rounded hover:bg-green-600'>Play as Guest</button>
				</div>
			</div>
		</div>
	);
}
