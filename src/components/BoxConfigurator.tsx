import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { box_SIZES, CUSTOM_BASES, CUSTOM_CHOCOLATES, CUSTOM_TOPPINGS } from '../data/menuData';
import { CustomboxSelection } from '../types';

interface boxConfiguratorProps {
  isDarkMode: boolean;
  onAddCustomboxToCart: (custombox: CustomboxSelection) => void;
}

export const boxConfigurator: React.FC<boxConfiguratorProps> = ({ isDarkMode, onAddCustomboxToCart }) => {
  const [selectedSizeId, setSelectedSizeId] = useState<'duo' | 'family' | 'party'>('duo');
  const [selectedBases, setSelectedBases] = useState<string[]>(['Base Crêpe Sucrée', 'Base Crêpe Salée']);
  const [selectedChocolates, setSelectedChocolates] = useState<string[]>(['Chocolat Fondant', 'Nappage Kinder']);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['Éclats Oreo', 'Poudre Milo']);

  const currentSize = box_SIZES.find((s) => s.id === selectedSizeId) || box_SIZES[0];

  const toggleSelection = (item: string, list: string[], setList: (val: string[]) => void, maxCount: number) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      if (list.length >= maxCount) {
        setList([...list.slice(1), item]);
      } else {
        setList([...list, item]);
      }
    }
  };

  const handleAddToCart = () => {
    const config: CustomboxSelection = {
      sizeId: selectedSizeId,
      sizeName: currentSize.name,
      itemsCount: currentSize.itemsCount,
      basePrice: currentSize.price,
      selectedBases,
      selectedChocolates,
      selectedToppings,
    };
    onAddCustomboxToCart(config);
  };

  return (
    <section id="configurator" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
            Studio Sweet box Sur-Mesure
          </h2>
          <p className="text-base text-amber-950/70 dark:text-amber-100/70">
            Composez votre boxe personnalisé en choisissant vos crêpes sucrées ou salées et vos suppléments.
          </p>
        </motion.div>

        {/* Builder Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
          
          {/* Left Controls Column */}
          <div className="lg:col-span-7 space-y-8">
               {/* Step 1: Choose Size */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 25 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#122820] border-emerald-900/50' : 'bg-white border-amber-900/10'}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-extrabold text-xs flex items-center justify-center">1</span>
                <h3 className="font-serif font-bold text-lg">Choisissez le format du boxe</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {box_SIZES.map((size) => {
                  const isSelected = selectedSizeId === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => {
                        setSelectedSizeId(size.id);
                        if (selectedBases.length > size.itemsCount) {
                          setSelectedBases(selectedBases.slice(0, size.itemsCount));
                        }
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-500/30'
                          : isDarkMode
                          ? 'bg-[#1A382C] border-emerald-900/40 hover:bg-amber-500/10'
                          : 'bg-amber-50/50 border-amber-900/10 hover:bg-amber-500/10'
                      }`}
                    >
                      <div>
                        <span className="text-2xl">{size.icon}</span>
                        <h4 className="font-serif font-bold text-sm mt-2">{size.name}</h4>
                        <p className="text-[11px] opacity-75 mt-1 leading-snug">{size.description}</p>
                      </div>
                      <span className="font-serif font-extrabold text-amber-700 dark:text-amber-300 text-base mt-3">
                        {size.price.toLocaleString('fr-FR')} F
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Step 2: Choose Gourmandise Bases */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 25 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#122820] border-emerald-900/50' : 'bg-white border-amber-900/10'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-extrabold text-xs flex items-center justify-center">2</span>
                  <h3 className="font-serif font-bold text-lg">Choisissez vos {currentSize.itemsCount} bases</h3>
                </div>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                  {selectedBases.length} / {currentSize.itemsCount} sélectionné(s)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {CUSTOM_BASES.map((base) => {
                  const isSelected = selectedBases.includes(base.name);
                  return (
                    <button
                      key={base.id}
                      onClick={() => toggleSelection(base.name, selectedBases, setSelectedBases, currentSize.itemsCount)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-amber-500/25 border-amber-500 font-bold'
                          : 'bg-amber-500/5 border-amber-900/10 hover:bg-amber-500/10'
                      }`}
                    >
                      <span className="text-2xl">{base.icon}</span>
                      <span className="text-xs mt-1 leading-tight">{base.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Step 3: Choose Chocolates */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 25 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#122820] border-emerald-900/50' : 'bg-white border-amber-900/10'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-extrabold text-xs flex items-center justify-center">3</span>
                  <h3 className="font-serif font-bold text-lg">Choisissez vos nappages & chocolats</h3>
                </div>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                  {selectedChocolates.length} sélectionné(s)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {CUSTOM_CHOCOLATES.map((choc) => {
                  const isSelected = selectedChocolates.includes(choc.name);
                  return (
                    <button
                      key={choc.id}
                      onClick={() => toggleSelection(choc.name, selectedChocolates, setSelectedChocolates, 3)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'bg-amber-500/25 border-amber-500 font-bold'
                          : 'bg-amber-500/5 border-amber-900/10 hover:bg-amber-500/10'
                      }`}
                    >
                      <span className="text-xl">{choc.icon}</span>
                      <span className="text-xs leading-tight">{choc.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Step 4: Choose Toppings */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 25 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#122820] border-emerald-900/50' : 'bg-white border-amber-900/10'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-extrabold text-xs flex items-center justify-center">4</span>
                  <h3 className="font-serif font-bold text-lg">Suppléments & Toppings (+500 F)</h3>
                </div>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                  {selectedToppings.length} sélectionné(s)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {CUSTOM_TOPPINGS.map((top) => {
                  const isSelected = selectedToppings.includes(top.name);
                  return (
                    <button
                      key={top.id}
                      onClick={() => toggleSelection(top.name, selectedToppings, setSelectedToppings, 4)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'bg-amber-500/25 border-amber-500 font-bold'
                          : 'bg-amber-500/5 border-amber-900/10 hover:bg-amber-500/10'
                      }`}
                    >
                      <span className="text-xl">{top.icon}</span>
                      <span className="text-xs leading-tight">{top.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Preview */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 35 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 sticky top-28"
          >
            <div className={`rounded-3xl p-6 border shadow-2xl space-y-6 ${
              isDarkMode ? 'bg-[#122820] border-emerald-900/50' : 'bg-white border-amber-900/10'
            }`}>
              <div className="flex items-center justify-between border-b border-amber-900/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📦</span>
                  <div>
                    <h3 className="font-serif font-bold text-lg">Aperçu du boxe</h3>
                    <p className="text-xs opacity-75">{currentSize.name}</p>
                  </div>
                </div>
                <span className="text-2xl font-serif font-extrabold text-amber-700 dark:text-amber-300">
                  {currentSize.price.toLocaleString('fr-FR')} F
                </span>
              </div>

              {/* box Image Visual Representation */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-inner border border-amber-900/10 bg-amber-900/5 flex items-center justify-center p-4">
                <img
                  src="/src/assets/images/box_custom_gourmet_1785182350366.jpg"
                  alt="Aperçu Sweet box"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />

                {/* Overlaid Selection Badges */}
                <div className="absolute inset-x-3 bottom-3 bg-black/70 backdrop-blur-md text-white p-3 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-amber-300 uppercase tracking-wider text-[10px]">
                    Contenu du boxe :
                  </div>
                  <div className="line-clamp-2 text-[11px] opacity-90">
                    <span className="font-semibold text-white">Bases:</span> {selectedBases.join(', ') || 'Aucune'}<br />
                    <span className="font-semibold text-amber-200">Chocolats:</span> {selectedChocolates.join(', ') || 'Aucun'}<br />
                    <span className="font-semibold text-amber-200">Suppléments:</span> {selectedToppings.join(', ') || 'Aucun'}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ajouter ce boxe ({currentSize.price.toLocaleString('fr-FR')} F)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center italic text-amber-900/60 dark:text-amber-100/60">
                ✨ Emballage signature Sweet box avec ruban satin.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
