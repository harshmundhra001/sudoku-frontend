import { motion, AnimatePresence } from 'framer-motion';
import { PlayerScore } from '@/types/board';
import { useEffect, useRef } from 'react';

function usePrevious(value: number) {
  const ref = useRef<number>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default function ScoreCard(props: Omit<PlayerScore, '_id'>) {
  const { name, score } = props;
  const previousScore = usePrevious(score) ?? score;
  const direction = score > previousScore ? 'up' : 'down';

  return (
    <div className='flex'>
      <div className='flex justify-center items-center h-14 w-14 bg-[#50d71e] border-2 border-slate-400 mx-2 rounded-xl'>
        <span className='text-3xl'>1</span>
      </div>
      <div className='flex flex-col justify-between text-white'>
        <span className='font-bold text-xl'>{name}</span>
        <div className="h-6">
          <AnimatePresence initial={false} mode='wait'>
            <motion.span
              key={score}
              initial={{
                y: direction === 'up' ? 20 : -20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: direction === 'up' ? -20 : 20,
                opacity: 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              {score} points
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}