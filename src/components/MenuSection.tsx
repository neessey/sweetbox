import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Heart, Clock, Sliders, Check, Info, 
  Star, ChefHat, Sparkles, Coffee, Utensils,
  ShoppingBag, X, AlertCircle
} from 'lucide-react';
import { MenuItem, CategoryId } from '../types';
import { MENU_ITEMS, OFFICIAL_NOTE } from '../data/menuData';

interface MenuSectionProps {
  isDarkMode: boolean;
  onAddToCart: (item: MenuItem, customNotes?: string) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
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

export const MenuSection: React.FC<MenuSectionProps> = ({
  isDarkMode,
  onAddToCart,
  selectedCategory,
  onSelectCategory,
}) => {
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const categories = [
    { id: 'all' as CategoryId, label: 'Tout le menu', icon: Utensils, count: MENU_ITEMS.length },
    { id: 'crepes_sucrees' as CategoryId, label: 'Sucrées', icon: Coffee, count: MENU_ITEMS.filter(i => i.category === 'crepes_sucrees').length },
    { id: 'crepes_salees' as CategoryId, label: 'Salées', icon: ChefHat, count: MENU_ITEMS.filter(i => i.category === 'crepes_salees').length },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const handleCustomModalSubmit = () => {
    if (!activeItemModal) return;
    const notes = selectedExtras.length > 0 
      ? `Suppléments: ${selectedExtras.join(', ')}` 
      : undefined;
    onAddToCart(activeItemModal, notes);
    setActiveItemModal(null);
    setSelectedExtras([]);
  };

  const getCategoryIcon = (category: CategoryId) => {
    const found = categories.find(c => c.id === category);
    return found ? found.icon : Utensils;
  };

  return (
    <section 
      id="menu" 
      className="py-20 relative overflow-hidden"
      style={{ 
        backgroundColor: isDarkMode ? palette.chocolate : palette.cream,
        color: isDarkMode ? palette.cream : palette.chocolate
      }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-[0.03] blur-[80px]"
          style={{ background: palette.gold }}
        />
        <div 
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-[0.03] blur-[100px]"
          style={{ background: palette.goldLight }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" 
               style={{ backgroundColor: `${palette.gold}15`, border: `1px solid ${palette.gold}25` }}>
            <span className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: palette.gold }}>
              Notre carte
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Des crêpes
            <span className="block mt-1" style={{ color: palette.gold }}>
              d'exception
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed opacity-80 max-w-2xl mx-auto"
             style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Chaque crêpe est préparée à la commande avec des ingrédients soigneusement sélectionnés,
            pour une expérience gustative unique.
          </p>

          {/* Official Note Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 p-4 rounded-2xl inline-flex items-center gap-3 backdrop-blur-sm"
            style={{ 
              backgroundColor: `${palette.gold}10`,
              border: `1px solid ${palette.gold}20`
            }}
          >
            <Info className="w-4 h-4 shrink-0" style={{ color: palette.gold }} />
            <span className="text-xs font-medium tracking-wide"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", color: isDarkMode ? palette.beige : palette.chocolateSoft }}>
              {OFFICIAL_NOTE}
            </span>
          </motion.div>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 my-12"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`group relative px-5 py-3 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 ${
                  isActive
                    ? 'shadow-lg scale-105'
                    : 'hover:scale-102'
                }`}
                style={{
                  backgroundColor: isActive ? palette.gold : isDarkMode ? `${palette.cream}08` : `${palette.chocolate}06`,
                  color: isActive ? '#FFFFFF' : isDarkMode ? palette.cream : palette.chocolate,
                  border: `1px solid ${isActive ? palette.gold : isDarkMode ? `${palette.cream}15` : `${palette.chocolate}10`}`
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-60">({cat.count})</span>
                {isActive && (
                  <motion.span
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ backgroundColor: palette.gold }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Results count */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <p className="text-sm opacity-60" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {filteredItems.length} {filteredItems.length === 1 ? 'crêpe disponible' : 'crêpes disponibles'}
          </p>
        </motion.div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isAdded = !!addedItems[item.id];
              const isHovered = hoveredItem === item.id;
              const CategoryIcon = getCategoryIcon(item.category);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: (index % 3) * 0.08,
                    type: 'spring',
                    stiffness: 300,
                    damping: 25
                  }}
                  key={item.id}
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className="group relative rounded-2xl overflow-hidden transition-all duration-500"
                  style={{
                    backgroundColor: isDarkMode ? `${palette.cream}05` : '#FFFFFF',
                    border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
                  }}
                >
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${palette.gold}15, transparent 70%)`
                    }}
                  />

                  {/* Item Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      style={{
                        transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                      whileHover={{ scale: 1.05 }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {item.heartFavorite && (
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
                          style={{
                            backgroundColor: 'rgba(180, 136, 75, 0.9)',
                            border: '1px solid rgba(255,255,255,0.2)'
                          }}
                        >
                          <Heart className="w-3 h-3 fill-white text-white" />
                          <span className="text-[9px] font-bold uppercase tracking-wider text-white">
                            Favori
                          </span>
                        </motion.div>
                      )}
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
                           style={{
                             backgroundColor: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)',
                             border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`
                           }}>
                        <CategoryIcon className="w-3 h-3" style={{ color: palette.gold }} />
                        <span className="text-[9px] font-medium uppercase tracking-wider"
                              style={{ color: isDarkMode ? palette.cream : palette.chocolate }}>
                          {item.category === 'crepes_sucrees' ? 'Sucrée' : 
                           item.category === 'crepes_salees' ? 'Salée' : 'Supplément'}
                        </span>
                      </div>
                    </div>

                    {/* Prep time */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
                         style={{
                           backgroundColor: isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)',
                           border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`
                         }}>
                      <Clock className="w-3 h-3" style={{ color: palette.gold }} />
                      <span className="text-[9px] font-medium"
                            style={{ color: isDarkMode ? palette.cream : palette.chocolate }}>
                        {item.prepTimeMinutes || 10} min
                      </span>
                    </div>
                  </div>

                  {/* Item Info */}
                  <div className="p-5 md:p-6 space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-medium leading-tight"
                            style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                          {item.name}
                        </h3>
                        <span className="text-lg font-bold shrink-0"
                              style={{ color: palette.gold }}>
                          {item.price.toLocaleString('fr-FR')} F
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed opacity-70"
                         style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                        {item.description}
                      </p>

                      {/* Ingredients */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.ingredients.slice(0, 4).map((ing, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md"
                            style={{
                              backgroundColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}06`,
                              color: isDarkMode ? palette.cream : palette.chocolateSoft,
                              opacity: 0.8
                            }}
                          >
                            {ing}
                          </span>
                        ))}
                        {item.ingredients.length > 4 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md opacity-50">
                            +{item.ingredients.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t"
                         style={{ borderColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}08` }}>
                      {item.customizable && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setActiveItemModal(item)}
                          className="px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                          style={{
                            backgroundColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}06`,
                            color: isDarkMode ? palette.cream : palette.chocolate,
                            border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
                          }}
                        >
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Personnaliser</span>
                        </motion.button>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => handleQuickAdd(item, e)}
                        className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'shadow-sm'
                        }`}
                        style={{
                          backgroundColor: isAdded ? '#059669' : palette.gold,
                          color: isAdded ? '#FFFFFF' : '#FFFFFF'
                        }}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Ajouté !</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Commander</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Success animation ring */}
                  {isAdded && (
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{ border: `2px solid ${palette.gold}` }}
                      transition={{ duration: 0.8 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                 style={{ backgroundColor: `${palette.gold}15` }}>
              <AlertCircle className="w-8 h-8" style={{ color: palette.gold }} />
            </div>
            <h3 className="text-xl font-medium mb-2">Aucune crêpe disponible</h3>
            <p className="text-sm opacity-60">Essayez de sélectionner une autre catégorie</p>
          </motion.div>
        )}
      </div>

      {/* Customization Modal */}
      <AnimatePresence>
        {activeItemModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="max-w-md w-full rounded-3xl p-6 shadow-2xl"
              style={{
                backgroundColor: isDarkMode ? palette.chocolate : '#FFFFFF',
                border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                  Personnalisez votre crêpe
                </h3>
                <button
                  onClick={() => {
                    setActiveItemModal(null);
                    setSelectedExtras([]);
                  }}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm mb-4 opacity-60"
                 style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                Choisissez vos suppléments pour {activeItemModal.name}
              </p>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {[
                  { id: 'chocolat', label: 'Extra Nappage Chocolat', price: 500 },
                  { id: 'oreo', label: 'Extra Oreo', price: 500 },
                  { id: 'speculos', label: 'Extra Spéculos', price: 500 },
                  { id: 'kinder', label: 'Extra Kinder', price: 500 },
                  { id: 'fromage', label: 'Extra Fromage (Salée)', price: 500 },
                  { id: 'poulet', label: 'Extra Poulet', price: 500 },
                ].map((opt) => {
                  const isSelected = selectedExtras.includes(opt.label);
                  return (
                    <motion.label
                      key={opt.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedExtras(prev => prev.filter(x => x !== opt.label));
                        } else {
                          setSelectedExtras(prev => [...prev, opt.label]);
                        }
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-500 shadow-sm'
                          : 'border-transparent hover:border-amber-500/30'
                      }`}
                      style={{
                        backgroundColor: isSelected 
                          ? `${palette.gold}15` 
                          : isDarkMode ? `${palette.cream}05` : `${palette.chocolate}04`
                      }}
                    >
                      <span className="text-sm font-medium">{opt.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold" style={{ color: palette.gold }}>
                          +{opt.price.toLocaleString()} F
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                            isSelected ? 'border-amber-500 bg-amber-500' : 'border-gray-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </motion.label>
                  );
                })}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setActiveItemModal(null);
                    setSelectedExtras([]);
                  }}
                  className="flex-1 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}06`,
                    color: isDarkMode ? palette.cream : palette.chocolate
                  }}
                >
                  Annuler
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCustomModalSubmit}
                  className="flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-white shadow-lg"
                  style={{ backgroundColor: palette.gold }}
                >
                  Ajouter au panier
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};