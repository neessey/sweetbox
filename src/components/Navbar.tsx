import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Sun, Moon, Phone } from 'lucide-react';
import { SweetBoxLogo } from './SweetBoxLogo';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onReplayIntro?: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleTheme,
  cartCount,
  onOpenCart,
  onNavigateSection,
}) => {
  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[#0B1B15]/90 border-emerald-900/40 text-[#F5E6D3]'
          : 'bg-[#FAF7F2]/95 border-amber-900/10 text-[#2A1E17]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
      <div
  onClick={() => onNavigateSection('hero')}
  className="cursor-pointer flex items-center"
>
  <img
    src="/assets/logo.png"
    alt="Sweet boxe"
    className="h-16 w-auto object-contain"
  />
</div>
        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-serif text-sm font-medium tracking-wide">
          <button
            onClick={() => onNavigateSection('menu')}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
          >
            Menu & Tarifs
          </button>
          <button
            onClick={() => onNavigateSection('delivery')}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
          >
            Comment Commander
          </button>
          
        </nav>

        {/* Right Actions Bar */}
        <div className="flex items-center gap-3">
          {/* Phone Badge */}
          <a
            href="https://wa.me/0594375827"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider bg-emerald-600/10 border border-emerald-600/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-600/20 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>05 94 37 58 27</span>
          </a>

         

          {/* Cart Drawer Trigger */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold text-xs tracking-wider uppercase shadow-md hover:from-amber-700 hover:to-amber-800 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Panier</span>
            {cartCount > 0 && (
              <span className="ml-1 bg-white text-amber-900 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};
