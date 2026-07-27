import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Heart } from 'lucide-react';
import { SweetBoxLogo } from './SweetBoxLogo';
import { CartItem } from '../types';

interface MascotSweetieProps {
  isDarkMode: boolean;
  isOpen: boolean;
  onToggle: () => void;
  cartItems: CartItem[];
  onNavigateSection: (sectionId: string) => void;
}

export const MascotSweetie: React.FC<MascotSweetieProps> = ({
  isDarkMode,
  isOpen,
  onToggle,
  cartItems,
  onNavigateSection,
}) => {
  const [bubbleText, setBubbleText] = useState<string>("👋 Coucou ! Je suis la mascotte Sweetie ! Besoin d'aide pour choisir ?");
  const [userQuery, setUserQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'mascot' | 'user'; text: string }>>([
    {
      sender: 'mascot',
      text: "👋 Bienvenue chez Sweet box ! Je suis la petite boîte mascotte. Dis-moi ce qui te ferait plaisir ou demande-moi une recommandation gourmande ! 🍫✨",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Periodic random tips in bubble when closed
  useEffect(() => {
    const tips = [
      "👋 Besoin d'aide pour composer ta Sweet box ?",
      "🍫 Notre Crêpe Sweet Bueno est le préféré des clients !",
      "✨ Le bonheur tient dans une boîte... Viens tester !",
      "🍓 Tu es plutôt Nutella, Pistache ou Bueno ?",
    ];

    const interval = setInterval(() => {
      if (!isOpen) {
        const nextTip = tips[Math.floor(Math.random() * tips.length)];
        setBubbleText(nextTip);
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userQuery.trim() || isLoading) return;

    const query = userQuery.trim();
    setUserQuery('');

    // Append user message
    setChatHistory((prev) => [...prev, { sender: 'user', text: query }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/mascot/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: query,
          cartContext: cartItems,
        }),
      });

      const data = await res.json();
      setChatHistory((prev) => [
        ...prev,
        { sender: 'mascot', text: data.reply || "📦 Le bonheur tient dans une Sweet box !" },
      ]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'mascot',
          text: "📦 Hop ! Je te conseille de goûter notre emblématique **Crêpe Sweet Bueno Supreme** ou de composer ta box sur-mesure ! 🍫✨",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Floating Speech Bubble when Chat is Closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={onToggle}
            className={`absolute bottom-20 right-0 w-64 p-3 rounded-2xl shadow-xl border cursor-pointer backdrop-blur-md flex items-center gap-3.5 transition-transform hover:scale-105 ${
              isDarkMode
                ? 'bg-[#122820]/95 text-amber-100 border-emerald-800'
                : 'bg-white/95 text-amber-950 border-amber-900/15'
            }`}
          >
            <span className="text-xl shrink-0">💬</span>
            <div className="flex-1">
              <p className="text-xs font-medium leading-snug">{bubbleText}</p>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block mt-1">
                Cliquez pour parler à Sweetie ➔
              </span>
            </div>
            {/* Pointer arrow */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 rotate-45 bg-inherit border-r border-b border-inherit" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Avatar Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-700 to-amber-800 text-white shadow-2xl flex items-center justify-center border-2 border-amber-300/40 cursor-pointer overflow-hidden group"
      >
        <SweetBoxLogo variant="mascot" isDarkMode={true} />
        {/* Glow halo */}
        <div className="absolute inset-0 bg-amber-400/20 rounded-full animate-ping pointer-events-none" />
      </motion.button>

      {/* Expanded AI Chat Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`absolute bottom-20 right-0 w-80 sm:w-96 rounded-3xl border shadow-2xl overflow-hidden flex flex-col h-[460px] backdrop-blur-xl ${
              isDarkMode ? 'bg-[#0B1B15]/95 text-[#FAF5EC] border-emerald-900/60' : 'bg-[#FAF5EC]/95 text-[#3E2723] border-amber-900/15'
            }`}
          >
            {/* Mascot Chat Header */}
            <div className="p-4 bg-gradient-to-r from-amber-700 to-amber-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-300/30">
                  <SweetBoxLogo variant="mascot" isDarkMode={true} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm leading-tight">La Mascot Sweetie AI</h3>
                  <span className="text-[10px] text-amber-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    En ligne • Conseiller Gourmand
                  </span>
                </div>
              </div>

              <button
                onClick={onToggle}
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] p-3 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-700 text-white rounded-br-none'
                        : isDarkMode
                        ? 'bg-[#122820] text-amber-100 border border-emerald-800 rounded-bl-none'
                        : 'bg-white text-amber-950 border border-amber-900/10 rounded-bl-none shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-800 dark:text-amber-200 italic animate-pulse">
                    Sweetie réfléchit à la meilleure gourmandise...
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions Pills */}
            <div className="p-2 border-t border-amber-900/10 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
              <button
                onClick={() => {
                  setUserQuery("Quelle est votre meilleure crêpe ?");
                  handleSendMessage();
                }}
                className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-900 dark:text-amber-200 hover:bg-amber-500/20 shrink-0 font-medium"
              >
                🥞 Meilleure crêpe ?
              </button>
              <button
                onClick={() => {
                  setUserQuery("Conseille-moi une box à partager à deux !");
                  handleSendMessage();
                }}
                className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-900 dark:text-amber-200 hover:bg-amber-500/20 shrink-0 font-medium"
              >
                📦 box pour 2 ?
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-amber-900/10 flex gap-2">
              <input
                type="text"
                placeholder="Posez votre question à Sweetie..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="flex-1 px-3 py-2 rounded-full bg-amber-500/10 text-xs font-medium focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-2.5 rounded-full bg-amber-700 hover:bg-amber-800 text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
