import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create New Game',
	description: 'Generate new game',
};

export default function CreateGameLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className='flex items-center justify-center min-h-screen m-2' style={{ height: 'calc(100vh - 10rem)' }}>{children}</div>;
}
