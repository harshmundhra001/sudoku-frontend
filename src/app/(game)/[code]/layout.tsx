import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sudoku',
	description: 'Game page',
};

export default function CreateGameLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className='min-h-screen my-4'>{children}</div>;
}
