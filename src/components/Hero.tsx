import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Clock, Leaf } from 'lucide-react';

interface HeroProps {
  isDarkMode: boolean;
  onNavigateSection: (sectionId: string) => void;
  onOpenMascot?: () => void;
}

const palette = {
  cream: '#FBF7EF',
  beige: '#EAE0CC',
  chocolate: '#2A1810',
  chocolateSoft: '#6B5240',
  gold: '#B4884B',
  goldLight: '#D8B888',
  goldDeep: '#8C6B34',
};

const displayFont = { fontFamily: "'Fraunces', Georgia, serif" };
const bodyFont = { fontFamily: "'Inter', system-ui, sans-serif" };

export const Hero: React.FC<HeroProps> = ({ isDarkMode, onNavigateSection }) => {
  const bg = isDarkMode ? palette.chocolate : palette.cream;
  const ink = isDarkMode ? palette.cream : palette.chocolate;
  const inkSoft = isDarkMode ? palette.beige : palette.chocolateSoft;
  const gold = palette.gold;

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[90vh] flex items-center"
      style={{ backgroundColor: bg, color: ink }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-[0.04] blur-[120px]"
          style={{ background: `radial-gradient(circle, ${gold}, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-[100px]"
          style={{ background: `radial-gradient(circle, ${palette.goldLight}, transparent 70%)` }}
        />
      </div>

      <div className="relative z-10 w-full mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left column - Text */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border"
              style={{ borderColor: `${gold}40` }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: gold }} />
              <span
                className="text-xs font-medium uppercase tracking-[0.25em]"
                style={{ ...bodyFont, color: inkSoft }}
              >
                Artisanat culinaire
              </span>
            </motion.div>

            {/* Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1]"
                style={displayFont}
              >
                <span className="block">Une crêpe</span>
                <span className="block relative">
                  pensée comme un bijou
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="absolute bottom-0 left-0 h-[2px]"
                    style={{ backgroundColor: gold }}
                  />
                </span>
                <span className="block mt-2" style={{ color: gold }}>
                  dans une boxe unique
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-lg text-base sm:text-lg leading-relaxed"
              style={{ ...bodyFont, color: inkSoft }}
            >
              Préparées à la commande avec la même exigence qu'une pâtisserie fine, 
              nos crêpes sucrées ou salées sont composées d'ingrédients soigneusement sélectionnés.
            </motion.p>

            {/* Stats/Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6 pt-2"
            >
              {[
                { icon: Sparkles, label: 'Préparation à la commande' },
                { icon: Leaf, label: 'Ingrédients frais' },
                { icon: Clock, label: 'Livraison Yango' },
              ].map(({ icon: Icon, label }, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" style={{ color: gold }} />
                  <span
                    className="text-xs uppercase tracking-wide"
                    style={{ ...bodyFont, color: inkSoft }}
                  >
                    {label}
                  </span>
                  {index < 2 && (
                    <span className="w-px h-6 ml-2" style={{ backgroundColor: `${gold}30` }} />
                  )}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => onNavigateSection('menu')}
                className="group relative px-8 py-3.5 text-sm font-medium uppercase tracking-wider transition-all duration-300 overflow-hidden"
                style={{
                  ...bodyFont,
                  backgroundColor: ink,
                  color: bg,
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Découvrir le menu
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-opacity-10"
                  style={{ backgroundColor: gold }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </button>

            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4 pt-2 border-t"
              style={{ borderColor: `${gold}20` }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2"
                    style={{ borderColor: bg, backgroundColor: palette.goldLight }}
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-medium" style={{ ...bodyFont }}>
                  Rejoignez{' '}
                  <span style={{ color: gold }}>+200</span> clients satisfaits
                </p>
                <p className="text-xs" style={{ ...bodyFont, color: inkSoft }}>
                  Note moyenne 4.9 ★
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column - Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Frame */}
              <div
                className="absolute -inset-4 lg:-inset-6"
                style={{ border: `1px solid ${gold}30`, borderRadius: '4px' }}
              />
              
              {/* Image container */}
              <div className="relative overflow-hidden rounded-sm">
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src="/assets/hero.png"
                    alt="Sweet box — boxe de crêpes gourmandes"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </motion.div>

                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, transparent 50%, ${bg}80)`,
                    mixBlendMode: 'multiply',
                  }}
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
                className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-opacity-95 backdrop-blur-sm px-5 py-3 rounded-sm shadow-xl"
                style={{
                  backgroundColor: isDarkMode ? palette.chocolate : '#FFFFFF',
                  border: `1px solid ${gold}40`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: gold }}>
                    <span className="text-white text-sm font-bold">SB</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ ...bodyFont, color: ink }}>
                      boxe du jour
                    </p>
                    <p className="text-xs" style={{ ...bodyFont, color: inkSoft }}>
                      Abidjan, Côte d'Ivoire
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Gold seal */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1, type: 'spring' }}
                className="absolute -top-3 -right-3 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: palette.gold,
                  border: `2px solid ${isDarkMode ? palette.chocolate : '#FFFFFF'}`,
                }}
              >
                <span
                  className="text-[8px] font-bold uppercase text-center leading-tight"
                  style={{ ...displayFont, color: '#FFFFFF', letterSpacing: '0.1em' }}
                >
                  Sweet
                  <br />
                  box
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};