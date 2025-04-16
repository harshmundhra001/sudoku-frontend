import { PlayerScore } from '@/types/board';

export default function ScoreCard(props: Omit<PlayerScore, '_id'>) {
	const { name, score, } = props;

	return (
		<div className='flex'>
			<div className='flex justify-center items-center h-14 w-14 bg-[#50d71e] border-2 border-slate-400 mx-2 rounded-xl'>
				<span className= 'text-3xl'>1</span>
			</div>
			<div className='flex flex-col justify-between text-white'>
				<span className='font-bold text-xl'>{name}</span>
				<span>{score} points</span>
			</div>
		</div>
	);
}
