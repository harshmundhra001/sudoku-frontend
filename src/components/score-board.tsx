import { ScoreBoardProps } from '@/types/board';
import ScoreCard from './score-card';

export default function ScoreBoard(props: ScoreBoardProps) {
	const { players } = props;
	return (
		<div className='flex justify-evenly items-center w-full bg-slate-800 my-4 h-28'>
			{players.map((player) => (
				<ScoreCard key={player.id} name={player.name} score={player.score} />
			))}
		</div>
	);
}
