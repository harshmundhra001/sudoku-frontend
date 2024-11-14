"use client";
import { useRouter } from "next/navigation";

export default function Game({ params }: { params: { code: string } }) {
    const router = useRouter();
	const { code } = params;
	return (
		<div>
			<h2>Sudoku Board</h2>
            <button onClick={() => router.push(`/board/${code}`)} className="bg-slate-100 text-black p-2 my-2 rounded-lg">Back</button>
		</div>
	);
}
