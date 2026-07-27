import React from 'react';
import { motion } from 'motion/react';
import { 
  Truck, Phone, MessageSquare, CheckCircle2, Wallet, 
  Send, MapPin, Share2, Clock, Shield, Sparkles, 
  ArrowRight, Copy, AlertCircle, Instagram, Youtube
} from 'lucide-react';

interface DeliverySectionProps {
  isDarkMode: boolean;
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

export const DeliverySection: React.FC<DeliverySectionProps> = ({ isDarkMode }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('0594375827');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      step: '1',
      title: 'Choisis ta crêpe',
      desc: 'Sélectionne ta crêpe sucrée ou salée parmi nos délicieuses recettes artisanales.',
      icon: '🥞',
      color: 'from-amber-400 to-orange-500',
    },
    {
      step: '2',
      title: 'Informations de livraison',
      desc: 'Renseigne ton nom, téléphone, quartier, adresse et instructions (facultatif).',
      icon: '📍',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      step: '3',
      title: 'Calcul du total',
      desc: 'Le site calcule automatiquement le total de ta commande.',
      icon: '🧮',
      color: 'from-purple-400 to-pink-500',
    },
    {
      step: '4',
      title: 'Dépôt Wave',
      desc: 'Effectue le dépôt direct du montant total sur le compte Wave officiel.',
      icon: '🌊',
      color: 'from-cyan-400 to-emerald-500',
    },
    {
      step: '5',
      title: 'Confirmation instantanée',
      desc: 'Dès réception du dépôt, ta commande est validée et préparée.',
      icon: '⚡',
      color: 'from-yellow-400 to-amber-500',
    },
    {
      step: '6',
      title: 'Livraison YANGO',
      desc: 'Livraison assurée directement chez toi (frais à la charge du client).',
      icon: '🚕',
      color: 'from-red-400 to-rose-500',
    },
  ];

  const features = [
    { icon: Shield, label: 'Paiement sécurisé', desc: 'Transactions protégées via Wave' },
    { icon: Clock, label: 'Préparation rapide', desc: 'Commandes préparées à la minute' },
    { icon: Sparkles, label: 'Qualité artisanale', desc: 'Ingrédients soigneusement sélectionnés' },
  ];

  return (
    <section 
      id="delivery" 
      className="py-20 relative overflow-hidden"
      style={{ 
        backgroundColor: isDarkMode ? palette.chocolate : palette.cream,
        color: isDarkMode ? palette.cream : palette.chocolate
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.03] blur-[120px]"
          style={{ background: palette.gold }}
        />
        <div 
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-[0.03] blur-[100px]"
          style={{ background: palette.goldLight }}
        />
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 20% 50%, ${palette.gold}05, transparent 50%)` 
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
               style={{ 
                 backgroundColor: `${palette.gold}15`, 
                 border: `1px solid ${palette.gold}25` 
               }}>
            <span className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: palette.gold }}>
              📦 Comment commander
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            Processus
            <span className="block mt-1" style={{ color: palette.gold }}>
              en 6 étapes
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed opacity-80"
             style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Une commande simple, rapide et sécurisée avec paiement Wave et livraison YANGO.
          </p>
        </motion.div>

        {/* Features badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mt-8 mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="flex items-center gap-3 px-4 py-2 rounded-full"
                style={{
                  backgroundColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}05`,
                  border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
                }}
              >
                <Icon className="w-4 h-4" style={{ color: palette.gold }} />
                <div>
                  <p className="text-xs font-medium">{feature.label}</p>
                  <p className="text-[10px] opacity-60">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
              className="group relative p-6 rounded-2xl transition-all duration-300"
              style={{
                backgroundColor: isDarkMode ? `${palette.cream}05` : '#FFFFFF',
                border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
              }}
            >
              {/* Step number background */}
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                   style={{
                     background: `linear-gradient(135deg, ${palette.gold}, ${palette.goldDeep})`,
                     opacity: 0.9
                   }}>
                {item.step}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4"
                   style={{
                     background: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}05`,
                     border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
                   }}>
                {item.icon}
              </div>

              <h3 className="text-lg font-medium leading-tight mb-2"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                {item.title}
              </h3>

              <p className="text-sm leading-relaxed opacity-70"
                 style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                {item.desc}
              </p>

              {/* Progress indicator */}
              <div className="mt-4 pt-3 border-t flex items-center gap-2"
                   style={{ borderColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}08` }}>
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: palette.gold }} />
                <span className="text-[10px] font-medium uppercase tracking-wider opacity-50">
                  Étape {item.step}/6
                </span>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-30" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Payment & Contact Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0"
               style={{
                 background: isDarkMode 
                   ? `linear-gradient(135deg, ${palette.chocolate} 0%, ${palette.goldDeep} 100%)`
                   : `linear-gradient(135deg, ${palette.gold} 0%, ${palette.goldDeep} 100%)`
               }}
          />
          
          {/* Decorative circles */}
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-black/5 blur-3xl" />

        </motion.div>

      </div>
    </section>
  );
};