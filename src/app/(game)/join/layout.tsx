import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
	title: 'Join Game',
	description: 'Join existing game.',
};

export default function CreateGameLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='flex items-center justify-center min-h-screen m-2'>
			<Toaster position='top-right' reverseOrder={true} />
			{children}
		</div>
	);
}
