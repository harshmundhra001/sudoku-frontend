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
	return <div className='flex items-center justify-center'>{children}</div>;
}
