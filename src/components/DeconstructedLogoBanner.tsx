import React from 'react';
import { motion } from 'motion/react';
import { Package, Heart, UtensilsCrossed } from 'lucide-react';
import { CategoryId } from '../types';

interface DeconstructedLogoBannerProps {
  isDarkMode: boolean;
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
}

export const DeconstructedLogoBanner: React.FC<DeconstructedLogoBannerProps> = ({
  isDarkMode,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="py-8 my-6">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400 font-bold">
          L'Anatomie du Bonheur
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold mt-1">
          Chaque élément raconte notre histoire
        </h3>
        <p className="text-xs text-amber-900/60 dark:text-amber-100/60 mt-1 max-w-lg mx-auto">
          Découvrez la carte en naviguant à travers les symboles de notre logo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {/* Element 1: 📦 La Boîte */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onSelectCategory('boxes')}
          className={`p-6 rounded-2xl border transition-all cursor-pointer text-center flex flex-col items-center ${
            selectedCategory === 'boxes'
              ? 'bg-amber-500/20 border-amber-500 shadow-lg scale-102'
              : isDarkMode
              ? 'bg-[#122820] border-emerald-900/50 hover:border-amber-500/40'
              : 'bg-white border-amber-900/10 hover:border-amber-500/40'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-2xl mb-3 text-amber-600 dark:text-amber-300">
            📦
          </div>
          <span className="font-serif font-bold text-lg">1. La Boîte</span>
          <span className="text-xs text-amber-700 dark:text-amber-300 font-medium uppercase tracking-wider mt-1">
            Sweet boxes Signature
          </span>
          <p className="text-xs opacity-75 mt-2 leading-relaxed">
            Nos boxes cadeaux prêts-à-déguster, assemblés avec soin et noués d’un ruban doré.
          </p>
        </motion.div>

        {/* Element 2: 🤍 Le Cœur */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onSelectCategory('all')}
          className={`p-6 rounded-2xl border transition-all cursor-pointer text-center flex flex-col items-center ${
            selectedCategory === 'all'
              ? 'bg-amber-500/20 border-amber-500 shadow-lg scale-102'
              : isDarkMode
              ? 'bg-[#122820] border-emerald-900/50 hover:border-amber-500/40'
              : 'bg-white border-amber-900/10 hover:border-amber-500/40'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-2xl mb-3 text-amber-600 dark:text-amber-300">
            🤍
          </div>
          <span className="font-serif font-bold text-lg">2. Le Cœur</span>
          <span className="text-xs text-amber-700 dark:text-amber-300 font-medium uppercase tracking-wider mt-1">
            Nos Coups de Cœur
          </span>
          <p className="text-xs opacity-75 mt-2 leading-relaxed">
            Nos meilleures ventes plébiscitées par nos clients : Crêpe Bueno, Gaufre Pistache...
          </p>
        </motion.div>

        {/* Element 3: 🧁 Le Cupcake / Dessert */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onSelectCategory('patisseries')}
          className={`p-6 rounded-2xl border transition-all cursor-pointer text-center flex flex-col items-center ${
            selectedCategory === 'patisseries'
              ? 'bg-amber-500/20 border-amber-500 shadow-lg scale-102'
              : isDarkMode
              ? 'bg-[#122820] border-emerald-900/50 hover:border-amber-500/40'
              : 'bg-white border-amber-900/10 hover:border-amber-500/40'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-2xl mb-3 text-amber-600 dark:text-amber-300">
            🧁
          </div>
          <span className="font-serif font-bold text-lg">3. Le Cupcake</span>
          <span className="text-xs text-amber-700 dark:text-amber-300 font-medium uppercase tracking-wider mt-1">
            Desserts & Pâtisseries
          </span>
          <p className="text-xs opacity-75 mt-2 leading-relaxed">
            Cupcakes artisanaux, milkshakes glacés et toppings gourmands à la folie.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
