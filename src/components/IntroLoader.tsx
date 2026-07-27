import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SweetBoxLogo } from './SweetBoxLogo';

interface IntroLoaderProps {
  onComplete: () => void;
  isDarkMode?: boolean;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete, isDarkMode = false }) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Timeline of 3.2 seconds
    const timer1 = setTimeout(() => setStage(1), 800);  // box lid opens & steam
    const timer2 = setTimeout(() => setStage(2), 1600); // Heart & Cupcake appear
    const timer3 = setTimeout(() => setStage(3), 2400); // Handwriting & slogan
    const timer4 = setTimeout(() => {
      onComplete();
    }, 3400); // Smooth fade out to main site

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center select-none overflow-hidden ${
        isDarkMode ? 'bg-[#0B1B15] text-[#FAF5EC]' : 'bg-[#FAF5EC] text-[#3E2723]'
      }`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Background Subtle Golden Ambient Rays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Skip Button for quick user access */}
      <motion.button
        onClick={onComplete}
        className="absolute top-6 right-6 px-4 py-2 rounded-full border border-amber-900/20 dark:border-amber-100/20 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm hover:bg-amber-500/10 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Passer l'intro ➔
      </motion.button>

      {/* Central Animated Logo Assembly */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 max-w-md w-full">
        <SweetBoxLogo
          variant="intro"
          size="lg"
          isDarkMode={isDarkMode}
        />

        {/* Progress Bar under logo */}
        <div className="w-48 h-1 bg-amber-900/10 dark:bg-amber-100/10 rounded-full mt-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.2, ease: 'linear' }}
          />
        </div>

        {/* Stage Status Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            className="text-xs font-serif italic text-amber-800/70 dark:text-amber-200/70 mt-3 tracking-widest text-center"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {stage === 0 && "Ouverture de la boîte..."}
            {stage === 1 && "Les parfums s'élèvent..."}
            {stage === 2 && "Découverte des gourmandises..."}
            {stage === 3 && "Le bonheur est prêt."}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
