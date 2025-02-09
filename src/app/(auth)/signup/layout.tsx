import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign Up',
	description: 'Log in | Guest | Sign up',
};

export default function CreateGameLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className='flex items-center justify-center min-h-screen m-2' style={{ height: 'calc(100vh - 10rem)' }}>{children}</div>;
}
