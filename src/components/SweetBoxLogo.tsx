import React from 'react';
import { motion } from 'motion/react';

interface SweetBoxLogoProps {
  variant?: 'full' | 'nav' | 'intro' | 'deconstruct' | 'mascot' | 'order';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isDarkMode?: boolean;
  className?: string;
  activeElement?: 'all' | 'box' | 'heart' | 'cupcake';
  logoSrc?: string;
}

export const SweetBoxLogo: React.FC<SweetBoxLogoProps> = ({
  variant = 'full',
  size = 'md',
  isDarkMode = false,
  className = '',
  activeElement = 'all',
  logoSrc = '/assets/logo.png',
}) => {
  // Size mapping
  const dimensions = {
    sm: { width: 120, height: 110, scale: 0.6 },
    md: { width: 180, height: 160, scale: 0.9 },
    lg: { width: 260, height: 230, scale: 1.3 },
    xl: { width: 340, height: 300, scale: 1.7 },
  }[size];

  // Theme colors
  const goldPrimary = isDarkMode ? '#E5C170' : '#C5A059';
  const goldShine = isDarkMode ? '#FFF2CE' : '#E8C27B';
  const brownText = isDarkMode ? '#F5E6D3' : '#3E2723';

  if (logoSrc) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <img
          src={logoSrc}
          alt="Sweet boxe logo"
          width={dimensions.width}
          height={dimensions.height}
          className="object-contain"
        />
      </div>
    );
  }

  // Render Mascot variant if requested
  if (variant === 'mascot') {
    return (
      <div className={`relative flex flex-col items-center justify-center ${className}`}>
        <motion.svg
          width={80}
          height={80}
          viewBox="0 0 100 100"
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          {/* Open Lid */}
          <motion.path
            d="M 20 28 L 50 12 L 80 28 L 50 44 Z"
            fill={isDarkMode ? '#1A382C' : '#FAF3E8'}
            stroke={goldPrimary}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Ribbon Bow */}
          <path
            d="M 50 12 C 40 4 30 14 50 18 C 70 14 60 4 50 12 Z"
            fill="none"
            stroke={goldPrimary}
            strokeWidth="2.5"
          />
          {/* box Body */}
          <path
            d="M 22 42 L 50 56 L 78 42 L 78 78 L 50 92 L 22 78 Z"
            fill={isDarkMode ? '#132820' : '#FFFDF9'}
            stroke={goldPrimary}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Cute Eyes */}
          <motion.circle
            cx="40"
            cy="68"
            r="3"
            fill={brownText}
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 2 }}
          />
          <motion.circle
            cx="60"
            cy="68"
            r="3"
            fill={brownText}
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 2 }}
          />
          {/* Cute Blushing Cheeks */}
          <circle cx="34" cy="72" r="3" fill="#E89B9B" opacity="0.6" />
          <circle cx="66" cy="72" r="3" fill="#E89B9B" opacity="0.6" />
          {/* Smile */}
          <path
            d="M 45 74 Q 50 78 55 74"
            fill="none"
            stroke={brownText}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Tiny Waving Hand */}
          <motion.path
            d="M 78 60 Q 88 52 86 64"
            fill="none"
            stroke={goldPrimary}
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ rotate: [0, 20, -10, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
          />
        </motion.svg>
      </div>
    );
  }

  // Header Nav Variant with hover-lift lid
  if (variant === 'nav') {
    return (
     <motion.div
  className={`flex items-center gap-3 h-full ${className}`}
  whileHover="hover"
>
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {/* box Body */}
            <path
              d="M 22 42 L 50 54 L 78 42 L 78 78 L 50 90 L 22 78 Z"
              fill={isDarkMode ? '#132820' : '#FFFBF5'}
              stroke={goldPrimary}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Heart & Cupcake inside */}
            <path
              d="M 36 38 C 32 30 42 26 44 32 C 46 26 56 30 52 38 L 44 44 Z"
              fill="none"
              stroke={goldPrimary}
              strokeWidth="2.5"
            />
            <path
              d="M 58 38 Q 64 30 70 38 L 68 44 L 60 44 Z"
              fill="none"
              stroke={goldPrimary}
              strokeWidth="2.5"
            />
            {/* Animated Lid */}
            <motion.g
              variants={{
                hover: { y: -8, rotate: -6 },
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <path
                d="M 18 30 L 50 14 L 82 30 L 50 44 Z"
                fill={isDarkMode ? '#1E3E31' : '#FAF5EC'}
                stroke={goldPrimary}
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Bow */}
              <path
                d="M 50 14 C 40 4 30 14 50 18 C 70 14 60 4 50 14 Z"
                fill="none"
                stroke={goldPrimary}
                strokeWidth="3"
              />
            </motion.g>
          </svg>
        </div>

        <div className="flex flex-col">
          <span
            className="font-serif text-xl leading-none font-bold tracking-tight"
            style={{
              fontFamily: "'Playfair Display', 'Brush Script MT', cursive, serif",
              color: brownText,
            }}
          >
            Sweet boxe
          </span>
          <span
            className="text-[9px] tracking-[0.2em] font-medium uppercase mt-0.5"
            style={{ color: goldPrimary }}
          >
            Le bonheur en boîte
          </span>
        </div>
      </motion.div>
    );
  }

  // Full / Intro / Main SVG Logo
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <motion.svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 240 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        initial={variant === 'intro' ? 'hidden' : 'visible'}
        animate="visible"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={goldShine} />
            <stop offset="50%" stopColor={goldPrimary} />
            <stop offset="100%" stopColor="#A37C3A" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- box CONTAINER ELEMENT --- */}
        <motion.g
          opacity={activeElement === 'all' || activeElement === 'box' ? 1 : 0.25}
          transition={{ duration: 0.5 }}
        >
          {/* Main box Base */}
          <motion.path
            d="M 50 105 L 120 135 L 190 105 L 190 170 L 120 200 L 50 170 Z"
            stroke="url(#goldGradient)"
            strokeWidth="4"
            strokeLinejoin="round"
            fill={isDarkMode ? 'rgba(19, 40, 32, 0.4)' : 'rgba(255, 251, 245, 0.8)'}
            initial={variant === 'intro' ? { pathLength: 0 } : { pathLength: 1 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          {/* Front Center Fold Line */}
          <motion.path
            d="M 120 135 L 120 200"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            initial={variant === 'intro' ? { pathLength: 0 } : { pathLength: 1 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.g>

        {/* --- HEART ELEMENT --- */}
        <motion.g
          opacity={activeElement === 'all' || activeElement === 'heart' ? 1 : 0.25}
          animate={
            variant === 'intro'
              ? { y: [15, 0], opacity: [0, 1] }
              : { y: [0, -3, 0] }
          }
          transition={
            variant === 'intro'
              ? { duration: 0.8, delay: 1.0 }
              : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
          }
        >
          <path
            d="M 85 90 C 72 70 95 60 102 75 C 109 60 132 70 119 90 L 102 108 Z"
            stroke={goldPrimary}
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill={isDarkMode ? '#224436' : '#FFF6EA'}
          />
        </motion.g>

        {/* --- CUPCAKE DESSERT ELEMENT --- */}
        <motion.g
          opacity={activeElement === 'all' || activeElement === 'cupcake' ? 1 : 0.25}
          animate={
            variant === 'intro'
              ? { y: [15, 0], opacity: [0, 1] }
              : { y: [0, -3, 0] }
          }
          transition={
            variant === 'intro'
              ? { duration: 0.8, delay: 1.2 }
              : { repeat: Infinity, duration: 3.2, ease: 'easeInOut', delay: 0.2 }
          }
        >
          {/* Cupcake Base Liner */}
          <path
            d="M 140 92 L 175 92 L 168 112 L 147 112 Z"
            stroke={goldPrimary}
            strokeWidth="3"
            fill="none"
          />
          {/* Vertical Ribbing */}
          <path d="M 152 92 L 153 112 M 163 92 L 162 112" stroke={goldPrimary} strokeWidth="2" />
          {/* Cupcake Frosting Swirl */}
          <path
            d="M 138 92 C 135 84 148 78 152 82 C 156 74 168 76 172 82 C 178 82 180 90 177 92 Z"
            stroke={goldPrimary}
            strokeWidth="3"
            fill={isDarkMode ? '#224436' : '#FFF6EA'}
          />
          {/* Cherry / Top swirl */}
          <circle cx="157" cy="72" r="4" fill={goldPrimary} />
        </motion.g>

        {/* --- STEAM / SPARKLES --- */}
        {variant === 'intro' && (
          <g>
            <motion.path
              d="M 100 55 Q 95 45 102 38"
              stroke={goldShine}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 0.8, 0], y: -15 }}
              transition={{ repeat: Infinity, duration: 2, delay: 1.4 }}
            />
            <motion.path
              d="M 135 52 Q 140 42 132 35"
              stroke={goldShine}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 0.8, 0], y: -15 }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 1.6 }}
            />
          </g>
        )}

        {/* --- OPEN LID & RIBBON BOW --- */}
        <motion.g
          animate={
            variant === 'intro'
              ? { y: [20, -5, 0], rotate: [12, -4, 0] }
              : { y: 0 }
          }
          transition={{ duration: 1.0, delay: 0.6, ease: 'easeOut' }}
        >
          {/* Lid Lid Angle */}
          <path
            d="M 40 75 L 120 35 L 200 75 L 120 115 Z"
            stroke="url(#goldGradient)"
            strokeWidth="4"
            strokeLinejoin="round"
            fill={isDarkMode ? '#173328' : '#FAF3E8'}
          />
          {/* Satin Ribbon Loops */}
          <path
            d="M 120 35 C 95 15 80 35 120 42 C 160 35 145 15 120 35 Z"
            stroke={goldPrimary}
            strokeWidth="3"
            fill="none"
          />
          {/* Ribbon Tails */}
          <path
            d="M 115 40 Q 100 50 90 60 M 125 40 Q 140 50 150 60"
            stroke={goldPrimary}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </motion.g>
      </motion.svg>

      {/* --- TYPOGRAPHY & SLOGAN --- */}
      <motion.div
        className="mt-2 flex flex-col items-center"
        initial={variant === 'intro' ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <span
          className="text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-xs"
          style={{
            fontFamily: "'Playfair Display', 'Caveat', 'Dancing Script', cursive, serif",
            color: brownText,
          }}
        >
          Sweet boxe
        </span>

        <span
          className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] mt-2 text-center"
          style={{ color: goldPrimary }}
        >
          Le bonheur tient dans une boîte
        </span>

        {/* Optional Phone badge from original brand logo */}
        {variant === 'full' && (
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-amber-900/10 dark:border-amber-100/10">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: goldPrimary }} />
            <a
              href="https://wa.me/0594375827"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium tracking-widest hover:underline flex items-center gap-1.5"
              style={{ color: brownText }}
            >
              <svg className="w-3.5 h-3.5 fill-emerald-600" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              0594375827
            </a>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: goldPrimary }} />
          </div>
        )}
      </motion.div>
    </div>
  );
};
