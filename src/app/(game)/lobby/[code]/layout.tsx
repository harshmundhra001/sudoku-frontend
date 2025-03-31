import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
	title: 'Lobby',
	description: 'Place to wait for other players/friends to join',
};

export default function CreateGameLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='flex flex-col items-center justify-center'>
			<Toaster position='top-right' reverseOrder={true} />
			{children}
		</div>
	);
}
