'use client';
import CustomButton from '@/components/custom-button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CreateGame() {
	const router = useRouter();

    useEffect(() => {
        router.prefetch('/create');
        router.prefetch('/join');
    }, [router]);

	return (
        <div className='flex flex-col items-center w-full sm:w-3/4 md:w-2/3 lg:w-1/3 md:min-w-[450px] min-w-[350px]'>
            <h1 className='m-12 px-20 text-4xl font-bold text-gray-200'>Game</h1>
            <div className='flex flex-col sm:flex-row sm:items-center justify-evenly items-center w-full gap-4'>
                <CustomButton
                    callback={() => router.push(`/create`)}
                    buttonText='Create Game'
                    className='w-3/4 sm:w-1/3'
                    isPrimary={true}
                />
                <CustomButton
                    callback={() => router.push(`/join`)}
                    buttonText='Join Game'
                    className='w-3/4 sm:w-1/3'
                />
            </div>
        </div>
    );
}
