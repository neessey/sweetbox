import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SweetBoxLogo } from './SweetBoxLogo';
import { 
  Phone, Heart, Share2, Wallet, Truck, 
  MapPin, Clock, Instagram, Youtube, 
  ArrowUpRight, Mail, Send, Sparkles,
  Facebook, MessageCircle, Award, Shield
} from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
  onNavigateSection: (sectionId: string) => void;
  onReplayIntro?: () => void;
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

export const Footer: React.FC<FooterProps> = ({ 
  isDarkMode, 
  onNavigateSection, 
  onReplayIntro 
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const socialLinks = [
    { 
      icon: Instagram, 
      label: 'Instagram', 
      href: 'https://instagram.com/sweetbox',
      color: 'from-pink-500 to-purple-600'
    },
    { 
      icon: Share2, 
      label: 'TikTok', 
      href: 'https://www.tiktok.com/@sweetboxe0',
      color: 'from-cyan-400 to-blue-500'
    },
    { 
      icon: MessageCircle, 
      label: 'WhatsApp', 
      href: 'https://wa.me/594375827',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      icon: Youtube, 
      label: 'YouTube', 
      href: 'https://youtube.com/@sweetbox',
      color: 'from-red-500 to-rose-600'
    },
  ];

  const quickLinks = [
    { label: 'Accueil', section: 'hero' },
    { label: 'Menu Officiel', section: 'menu' },
    { label: 'Comment Commander', section: 'delivery' },
    { label: 'Avis Clients', section: 'reviews' },
  ];

  const contactInfo = [
    { icon: Phone, label: '05 94 37 58 27', href: 'tel:0594375827', sub: 'WhatsApp / Wave' },
    { icon: Wallet, label: 'Wave: 0594375827', sub: 'Dépôt total obligatoire' },
    { icon: Truck, label: 'Livraison YANGO', sub: 'Frais à la charge du client' },
    { icon: MapPin, label: 'Abidjan, Côte d\'Ivoire', sub: 'Livraison disponible' },
  ];

  const awards = [
    { icon: Award, label: 'Meilleur service 2024' },
    { icon: Sparkles, label: 'Qualité artisanale' },
    { icon: Shield, label: 'Paiement sécurisé' },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: isDarkMode ? palette.chocolate : palette.cream,
        color: isDarkMode ? palette.cream : palette.chocolate,
        borderTop: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
      }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.02] blur-[100px]"
          style={{ background: palette.gold }}
        />
        <div 
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-[0.02] blur-[120px]"
          style={{ background: palette.goldLight }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b"
             style={{ borderColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}08` }}>
          
          {/* Brand Column - 4 colonnes */}
          <div className="lg:col-span-4 space-y-5">
            <SweetBoxLogo variant="full" size="md" isDarkMode={isDarkMode} />
            
            <p className="text-sm leading-relaxed opacity-70 max-w-sm"
               style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Crêperie artisanale proposant des crêpes sucrées et salées fraîchement préparées 
              avec des ingrédients d'exception. Paiement Wave et livraison YANGO.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2 pt-1">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-300 group"
                    style={{
                      backgroundColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}06`,
                      border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 transition-colors group-hover:text-amber-500" />
                    <span className="hidden sm:inline">{social.label}</span>
                  </motion.a>
                );
              })}
            </div>

            {/* Awards - Déplacé ici pour mieux organiser */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {awards.map((award, index) => {
                const Icon = award.icon;
                return (
                  <div key={index} className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" style={{ color: palette.gold }} />
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-60">
                      {award.label}
                    </span>
                    {index < awards.length - 1 && (
                      <span className="w-px h-3 bg-current opacity-20 ml-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
 {/* Newsletter - Bien placé ici */}
            <div className="pt-2">
              <p className="text-xs font-medium uppercase tracking-wider mb-2 opacity-60">
                Restez informé
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl border transition-all focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: isDarkMode ? `${palette.cream}05` : '#FFFFFF',
                    borderColor: isDarkMode ? `${palette.cream}15` : `${palette.chocolate}15`,
                    color: isDarkMode ? palette.cream : palette.chocolate,
                    fontFamily: "'Inter', system-ui, sans-serif"
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
                  style={{ backgroundColor: palette.gold }}
                >
                  {subscribed ? (
                    <>✅</>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">S'abonner</span>
                    </>
                  )}
                </motion.button>
              </form>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs mt-2" style={{ color: palette.gold }}
                >
                  ✅ Merci pour votre abonnement !
                </motion.p>
              )}
            </div>
          {/* Quick Links - 2 colonnes sur mobile, 3 sur desktop */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider"
                style={{ fontFamily: "'Fraunces', Georgia, serif", color: palette.gold }}>
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => onNavigateSection(link.section)}
                    className="group flex items-center gap-1.5 text-sm transition-colors hover:text-amber-500"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", opacity: 0.8 }}
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    {link.label}
                  </button>
                </li>
              ))}
             
            </ul>
          </div>

          {/* Contact & Newsletter - 5 colonnes */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4"
                  style={{ fontFamily: "'Fraunces', Georgia, serif", color: palette.gold }}>
                Contact & Paiement
              </h4>
              
              <div className="space-y-3">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 group">
                      <div className="mt-0.5 p-1.5 rounded-lg flex-shrink-0"
                           style={{
                             backgroundColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}06`,
                             border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
                           }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: palette.gold }} />
                      </div>
                      <div>
                        {item.href ? (
                          <a 
                            href={item.href}
                            className="text-sm font-medium hover:text-amber-500 transition-colors"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <p className="text-sm font-medium">{item.label}</p>
                        )}
                        {item.sub && (
                          <p className="text-xs opacity-50">{item.sub}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

           
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs opacity-60">
            <span>© {new Date().getFullYear()} Sweet Box. Tous droits réservés.</span>
            <span className="hidden sm:inline text-[8px]">|</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs opacity-40 font-serif italic">
              « Le bonheur tient dans une boîte. »
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Heart className="w-4 h-4" style={{ color: palette.gold }} fill={palette.gold} />
            </motion.div>
          </div>

          {/* Back to top */}
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-xs opacity-40 hover:opacity-80 transition-opacity"
          >
            <span>Haut de page</span>
            <ArrowUpRight className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};