import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Wallet, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  isDarkMode: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isDarkMode,
}) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`relative z-10 w-full max-w-md h-full flex flex-col shadow-2xl border-l ${
              isDarkMode ? 'bg-[#0B1B15] text-[#FAF5EC] border-emerald-900/60' : 'bg-[#FAF5EC] text-[#3E2723] border-amber-900/15'
            }`}
          >
            {/* Header */}
            <div className="p-6 border-b border-amber-900/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-serif font-bold text-xl">Votre Panier Sweet boxe</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-amber-500/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <span className="text-5xl">📦</span>
                  <h4 className="font-serif font-bold text-lg">Votre boîte est encore vide !</h4>
                  <p className="text-xs opacity-75 max-w-xs mx-auto">
                    Découvrez nos recettes ou composez votre propre Sweet box pour remplir votre panier de bonheur.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border flex gap-3 ${
                      isDarkMode ? 'bg-[#122820] border-emerald-900/40' : 'bg-white border-amber-900/10'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-bold text-sm leading-tight">{item.name}</h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.details && (
                          <p className="text-[10px] text-amber-600 dark:text-amber-300 font-medium mt-1">
                            {item.details}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-amber-900/5">
                        <span className="font-serif font-bold text-sm text-amber-700 dark:text-amber-300">
                          {(item.price * item.quantity).toLocaleString('fr-FR')} F
                        </span>

                        <div className="flex items-center gap-2 border border-amber-900/15 rounded-full px-2 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:text-amber-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:text-amber-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout Trigger */}
            {items.length > 0 && (
              <div className="p-6 border-t border-amber-900/10 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-serif font-bold text-sm text-amber-800 dark:text-amber-200">
                    <span>Montant total :</span>
                    <span>{subtotal.toLocaleString('fr-FR')} F</span>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-900 dark:text-cyan-200 space-y-1 mt-2">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Wallet className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Paiement Wave au 0594375827</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-90">
                      <Truck className="w-3.5 h-3.5 text-amber-500" />
                      <span>Livraison YANGO (frais à la charge du client)</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>📦 Valider & Passer au Paiement Wave</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
