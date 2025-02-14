import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Lobby',
	description: 'Place to wait for other players/friends to join',
};

export default function CreateGameLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className='flex flex-col items-center justify-center'>
		<p>Note: please ignore the following page, work is under progress.</p>
		{children}
		<p>Note: Please click on the Start Game button and enjoy the game.</p>
		</div>;
}
