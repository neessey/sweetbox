import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, MessageSquare, Wallet, Truck, MapPin, 
  User, Phone, FileText, AlertCircle, ArrowRight, 
  Sparkles, Package, Shield, X, Send, Copy, ExternalLink,
  Clock, CreditCard
} from 'lucide-react';
import { SweetBoxLogo } from './SweetBoxLogo';
import { CartItem, DeliveryInfo } from '../types';

interface OrderPackagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  isDarkMode: boolean;
}

type ModalStep = 'form' | 'payment' | 'anim' | 'recap';

const palette = {
  cream: '#FBF7EF',
  beige: '#EAE0CC',
  chocolate: '#2A1810',
  chocolateSoft: '#6B5240',
  gold: '#B4884B',
  goldLight: '#D8B888',
  goldDeep: '#8C6B34',
};

export const OrderPackagingModal: React.FC<OrderPackagingModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  isDarkMode,
}) => {
  const [modalStep, setModalStep] = useState<ModalStep>('form');
  const [animStage, setAnimStage] = useState<number>(0);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fullName: '',
    phone: '',
    address: '',
    neighborhood: '',
    instructions: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderId, setOrderId] = useState<string>('');
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>({});
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'initial' | 'pending' | 'confirmed'>('initial');

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Wave Deep Link URL
  const waveDeepLink = `wave://send?phone=2250594375827&amount=${totalAmount}`;
  const waveFallbackUrl = `https://wave.com/send?phone=2250594375827&amount=${totalAmount}`;

  useEffect(() => {
    if (isOpen) {
      setModalStep('form');
      setAnimStage(0);
      setFormErrors({});
      setPaymentConfirmed(false);
      setPaymentStep('initial');
      setOrderId('SWB-' + Math.floor(100000 + Math.random() * 900000));
    }
  }, [isOpen]);

  const handleInputChange = (field: keyof DeliveryInfo, value: string) => {
    setDeliveryInfo((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleCopyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess({ ...copySuccess, [key]: true });
    setTimeout(() => {
      setCopySuccess({ ...copySuccess, [key]: false });
    }, 2000);
  };

  const openWaveApp = () => {
    setPaymentStep('pending');
    // Try to open Wave app via deep link
    window.open(waveDeepLink, '_blank');
    
    // Fallback: open web version if app doesn't open
    setTimeout(() => {
      if (paymentStep !== 'confirmed') {
        const confirmFallback = window.confirm(
          "L'application Wave ne s'est pas ouverte. Souhaitez-vous accéder à la version web ?"
        );
        if (confirmFallback) {
          window.open(waveFallbackUrl, '_blank');
        }
      }
    }, 2000);
  };

  const handlePaymentConfirmation = () => {
    setPaymentConfirmed(true);
    setPaymentStep('confirmed');
    // Transition to packaging animation
    proceedToPackaging();
  };

  const proceedToPackaging = () => {
    // Build formatted WhatsApp message
    const itemsListText = cartItems
      .map(
        (i) =>
          `• ${i.quantity}x ${i.name} - ${(i.price * i.quantity).toLocaleString('fr-FR')} F${
            i.details ? ` (${i.details})` : ''
          }`
      )
      .join('\n');

    const whatsappMsg = `*✅ PAIEMENT WAVE CONFIRMÉ - COMMANDE SWEET BOXE N° ${orderId}*\n\n` +
      `📍 *INFORMATIONS CLIENT*\n` +
      `• *Nom :* ${deliveryInfo.fullName.trim()}\n` +
      `• *Téléphone :* ${deliveryInfo.phone.trim()}\n` +
      `• *Quartier :* ${deliveryInfo.neighborhood.trim()}\n` +
      `• *Adresse :* ${deliveryInfo.address.trim()}\n` +
      (deliveryInfo.instructions?.trim() ? `• *Instructions :* ${deliveryInfo.instructions.trim()}\n` : '') +
      `\n *DÉTAIL DE LA COMMANDE*\n` +
      `${itemsListText}\n\n` +
      `💰 *TOTAL PAYÉ :* ${totalAmount.toLocaleString('fr-FR')} F\n` +
      ` *Articles :* ${itemCount}\n\n` +
      ` *PAIEMENT WAVE :* ✅ Confirmé\n` +
      `🚕 *LIVRAISON :* Yango (frais à régler au livreur)`;

    const encodedUrl = `https://wa.me/594375827?text=${encodeURIComponent(whatsappMsg)}`;
    setWhatsappUrl(encodedUrl);

    // Start packaging animation
    setModalStep('anim');
    setAnimStage(0);

    const t1 = setTimeout(() => setAnimStage(1), 900);
    const t2 = setTimeout(() => setAnimStage(2), 1900);
    const t3 = setTimeout(() => {
      setAnimStage(3);
      setModalStep('recap');
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E8C27B', '#2A1810', '#B4884B', '#FBF7EF', '#0066FF'],
      });
    }, 2900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const validateAndShowPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!deliveryInfo.fullName.trim()) errors.fullName = 'Le nom est obligatoire';
    if (!deliveryInfo.phone.trim()) errors.phone = 'Le numéro de téléphone est obligatoire';
    if (!deliveryInfo.neighborhood.trim()) errors.neighborhood = 'Le quartier est obligatoire';
    if (!deliveryInfo.address.trim()) errors.address = 'L\'adresse est obligatoire';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Go to payment step
    setModalStep('payment');
  };

  if (!isOpen) return null;

  const inputStyles = {
    base: `w-full px-4 py-3 rounded-2xl border transition-all duration-200 text-sm outline-none font-['Inter']`,
    error: 'border-red-500 bg-red-500/5',
    dark: 'bg-[#122820] border-emerald-900/60 focus:border-amber-500 text-[#FAF5EC] placeholder:text-[#FAF5EC]/30',
    light: 'bg-white border-amber-900/15 focus:border-amber-600 text-[#3E2723] placeholder:text-[#3E2723]/30',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative max-w-xl w-full rounded-3xl shadow-2xl overflow-hidden"
        style={{
          backgroundColor: isDarkMode ? palette.chocolate : '#FFFFFF',
          border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-black/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          
          {/* STEP 1: DELIVERY FORM */}
          {modalStep === 'form' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mx-auto"
                     style={{
                       backgroundColor: `${palette.gold}15`,
                       border: `1px solid ${palette.gold}25`
                     }}>
                  <Package className="w-3.5 h-3.5" style={{ color: palette.gold }} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: palette.gold }}>
                    Étape 1/3 • Validation
                  </span>
                </div>
                <h2 className="text-2xl font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                  Informations de
                  <span className="block" style={{ color: palette.gold }}>livraison</span>
                </h2>
                <p className="text-sm opacity-60 max-w-sm mx-auto"
                   style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  Renseignez vos coordonnées pour la préparation de votre commande
                </p>
              </div>

              {/* Order summary mini */}
              <div className="flex items-center justify-between p-3 rounded-xl"
                   style={{
                     backgroundColor: isDarkMode ? `${palette.cream}05` : `${palette.chocolate}05`,
                     border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
                   }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🥞</span>
                  <div>
                    <p className="text-sm font-medium">{itemCount} article{itemCount > 1 ? 's' : ''}</p>
                    <p className="text-xs opacity-50">Prêt à être préparé</p>
                  </div>
                </div>
                <span className="text-lg font-bold" style={{ color: palette.gold }}>
                  {totalAmount.toLocaleString('fr-FR')} F
                </span>
              </div>

              <form onSubmit={validateAndShowPayment} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <User className="w-4 h-4" style={{ color: palette.gold }} />
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Marie Koné"
                    value={deliveryInfo.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputStyles.base} ${
                      formErrors.fullName ? inputStyles.error : ''
                    } ${isDarkMode ? inputStyles.dark : inputStyles.light}`}
                    style={{
                      borderColor: focusedField === 'fullName' ? palette.gold : undefined
                    }}
                  />
                  {formErrors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" /> {formErrors.fullName}
                    </motion.p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="w-4 h-4" style={{ color: palette.gold }} />
                    Téléphone WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder="Ex: 07 08 09 10 11"
                    value={deliveryInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputStyles.base} ${
                      formErrors.phone ? inputStyles.error : ''
                    } ${isDarkMode ? inputStyles.dark : inputStyles.light}`}
                    style={{
                      borderColor: focusedField === 'phone' ? palette.gold : undefined
                    }}
                  />
                  {formErrors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Neighborhood & Address grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <MapPin className="w-4 h-4" style={{ color: palette.gold }} />
                      Quartier *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Cocody"
                      value={deliveryInfo.neighborhood}
                      onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                      onFocus={() => setFocusedField('neighborhood')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputStyles.base} ${
                        formErrors.neighborhood ? inputStyles.error : ''
                      } ${isDarkMode ? inputStyles.dark : inputStyles.light}`}
                      style={{
                        borderColor: focusedField === 'neighborhood' ? palette.gold : undefined
                      }}
                    />
                    {formErrors.neighborhood && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.neighborhood}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <MapPin className="w-4 h-4" style={{ color: palette.gold }} />
                      Adresse *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Rue 12, près de..."
                      value={deliveryInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      onFocus={() => setFocusedField('address')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputStyles.base} ${
                        formErrors.address ? inputStyles.error : ''
                      } ${isDarkMode ? inputStyles.dark : inputStyles.light}`}
                      style={{
                        borderColor: focusedField === 'address' ? palette.gold : undefined
                      }}
                    />
                    {formErrors.address && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="w-4 h-4" style={{ color: palette.gold }} />
                    Instructions (facultatif)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Sauce chocolat séparée, appeler avant d'arriver..."
                    value={deliveryInfo.instructions}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                    className={`${inputStyles.base} resize-none min-h-[60px] ${
                      isDarkMode ? inputStyles.dark : inputStyles.light
                    }`}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3.5 rounded-xl text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}06`,
                      color: isDarkMode ? palette.cream : palette.chocolate
                    }}
                  >
                    Annuler
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3.5 rounded-xl text-white text-sm font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                    style={{ backgroundColor: palette.gold }}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Procéder au paiement</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 2: PAYMENT */}
          {modalStep === 'payment' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mx-auto"
                     style={{
                       backgroundColor: `${palette.gold}15`,
                       border: `1px solid ${palette.gold}25`
                     }}>
                  <Wallet className="w-3.5 h-3.5" style={{ color: palette.gold }} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: palette.gold }}>
                    Étape 2/3 • Paiement
                  </span>
                </div>
                <h2 className="text-2xl font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                  Paiement
                  <span className="block" style={{ color: palette.gold }}>Wave obligatoire</span>
                </h2>
                <p className="text-sm opacity-60 max-w-sm mx-auto"
                   style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  Effectuez le dépôt total avant la validation de votre commande
                </p>
              </div>

              {/* Payment Card */}
              <div className="p-5 rounded-2xl space-y-4"
                   style={{
                     backgroundColor: isDarkMode ? `${palette.cream}05` : `${palette.chocolate}05`,
                     border: `2px solid ${palette.gold}30`
                   }}>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: `${palette.gold}20` }}>
                    <Wallet className="w-6 h-6" style={{ color: palette.gold }} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold" style={{ color: palette.gold }}>
                      Wave
                    </h4>
                    <p className="text-xs opacity-60">Paiement sécurisé</p>
                  </div>
                </div>

                {/* Montant */}
                <div className="flex items-center justify-between p-3 rounded-xl"
                     style={{
                       backgroundColor: isDarkMode ? `${palette.cream}08` : '#FFFFFF',
                       border: `1px solid ${isDarkMode ? `${palette.cream}15` : `${palette.chocolate}10`}`
                     }}>
                  <div>
                    <p className="text-xs opacity-50">Montant à payer</p>
                    <p className="text-2xl font-bold" style={{ color: palette.gold }}>
                      {totalAmount.toLocaleString('fr-FR')} F
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyToClipboard(totalAmount.toString(), 'amount')}
                    className="p-2 rounded-lg hover:bg-black/5 transition-colors relative"
                  >
                    <Copy className="w-4 h-4 opacity-50" />
                    {copySuccess['amount'] && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-medium bg-emerald-500 text-white px-2 py-0.5 rounded whitespace-nowrap">
                        Copié !
                      </span>
                    )}
                  </button>
                </div>

                {/* Numéro Wave */}
                <div className="flex items-center justify-between p-3 rounded-xl"
                     style={{
                       backgroundColor: isDarkMode ? `${palette.cream}08` : '#FFFFFF',
                       border: `1px solid ${isDarkMode ? `${palette.cream}15` : `${palette.chocolate}10`}`
                     }}>
                  <div>
                    <p className="text-xs opacity-50">Numéro Wave</p>
                    <p className="text-base font-mono font-bold">0594375827</p>
                  </div>
                  <button
                    onClick={() => handleCopyToClipboard('0594375827', 'wave')}
                    className="p-2 rounded-lg hover:bg-black/5 transition-colors relative"
                  >
                    <Copy className="w-4 h-4 opacity-50" />
                    {copySuccess['wave'] && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-medium bg-emerald-500 text-white px-2 py-0.5 rounded whitespace-nowrap">
                        Copié !
                      </span>
                    )}
                  </button>
                </div>

                {/* Wave Payment Button */}
                {paymentStep === 'initial' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openWaveApp}
                    className="w-full py-4 rounded-xl text-white font-bold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-3 transition-all hover:shadow-xl"
                    style={{ 
                      background: 'linear-gradient(135deg, #0066FF, #0055DD)'
                    }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Ouvrir Wave pour payer</span>
                  </motion.button>
                )}

                {paymentStep === 'pending' && (
                  <div className="text-center space-y-3 py-4">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
                           style={{ borderColor: palette.gold }} />
                    </div>
                    <p className="text-sm font-medium">En attente de confirmation...</p>
                    <p className="text-xs opacity-50">Avez-vous effectué le paiement ?</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setPaymentStep('initial')}
                        className="flex-1 py-2 rounded-xl text-sm font-medium"
                        style={{
                          backgroundColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}06`,
                          color: isDarkMode ? palette.cream : palette.chocolate
                        }}
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handlePaymentConfirmation}
                        className="flex-1 py-2 rounded-xl text-white text-sm font-bold"
                        style={{ backgroundColor: '#25D366' }}
                      >
                        J'ai payé ✅
                      </button>
                    </div>
                  </div>
                )}

                {paymentStep === 'confirmed' && (
                  <div className="text-center py-4 space-y-2">
                    <div className="flex justify-center">
                      <CheckCircle className="w-12 h-12 text-emerald-500" />
                    </div>
                    <p className="text-sm font-bold text-emerald-500">✅ Paiement confirmé !</p>
                    <p className="text-xs opacity-60">Préparation de votre commande...</p>
                  </div>
                )}

                {/* Message d'information */}
                <div className="flex items-start gap-2 text-xs opacity-60">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    Le paiement est <strong>obligatoire</strong> avant la validation de la commande.
                    Une fois le paiement effectué, cliquez sur "J'ai payé".
                  </span>
                </div>
              </div>

              {/* Livraison info */}
              <div className="flex items-start gap-2 p-3 rounded-xl text-xs opacity-70"
                   style={{
                     backgroundColor: isDarkMode ? `${palette.cream}05` : `${palette.chocolate}05`,
                     border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
                   }}>
                <Truck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: palette.gold }} />
                <span>
                  <strong>Livraison Yango :</strong> Frais à régler directement au livreur à la réception.
                </span>
              </div>

              {/* Back button */}
              <button
                onClick={() => setModalStep('form')}
                className="w-full py-3 rounded-xl text-sm font-medium transition-colors"
                style={{
                  backgroundColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}06`,
                  color: isDarkMode ? palette.cream : palette.chocolate
                }}
              >
                ← Retour aux informations
              </button>
            </motion.div>
          )}

          {/* STEP 3: ANIMATED PACKAGING */}
          {modalStep === 'anim' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center space-y-8 text-center"
            >
              <motion.div
                animate={{
                  scale: animStage === 0 ? 1 : animStage === 1 ? 1.1 : 1,
                  rotate: animStage === 2 ? [0, 5, -5, 0] : 0,
                }}
                transition={{ duration: 0.8, type: 'spring' }}
              >
                <SweetBoxLogo
                  variant="full"
                  size="lg"
                  isDarkMode={isDarkMode}
                />
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={animStage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  {animStage === 0 && (
                    <>
                      <Sparkles className="w-8 h-8 mx-auto" style={{ color: palette.gold }} />
                      <p className="text-xl font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                        Préparation de votre Sweet Box...
                      </p>
                    </>
                  )}
                  {animStage === 1 && (
                    <>
                      <Package className="w-8 h-8 mx-auto" style={{ color: palette.gold }} />
                      <p className="text-xl font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                        Emballage soigné en cours...
                      </p>
                    </>
                  )}
                  {animStage === 2 && (
                    <>
                      <Shield className="w-8 h-8 mx-auto" style={{ color: palette.gold }} />
                      <p className="text-xl font-light" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                        Scellage du nœud doré...
                      </p>
                    </>
                  )}
                  <p className="text-sm opacity-50" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                    {animStage === 0 ? 'Chaque détail compte' :
                     animStage === 1 ? 'Qualité artisanale' :
                     'Prêt à être envoyé'}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="w-48 h-1.5 rounded-full overflow-hidden"
                   style={{ backgroundColor: isDarkMode ? `${palette.cream}10` : `${palette.chocolate}10` }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: palette.gold }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.9, ease: 'easeInOut' }}
                />
              </div>

              <p className="text-xs opacity-30 animate-pulse">
                Veuillez patienter...
              </p>
            </motion.div>
          )}

          {/* STEP 4: FINAL RECAP */}
          {modalStep === 'recap' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="space-y-6"
            >
              {/* Success header */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                     style={{
                       backgroundColor: `${palette.gold}20`,
                       border: `2px solid ${palette.gold}40`
                     }}>
                  <CheckCircle className="w-8 h-8" style={{ color: palette.gold }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: palette.gold }}>
                    Commande N° {orderId}
                  </p>
                  <h3 className="text-2xl font-light mt-1" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                    Le bonheur tient
                    <span className="block" style={{ color: palette.gold }}>dans une boîte ✨</span>
                  </h3>
                  <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-500">✅ Paiement confirmé</span>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="p-4 rounded-2xl space-y-3"
                   style={{
                     backgroundColor: isDarkMode ? `${palette.cream}05` : `${palette.chocolate}05`,
                     border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
                   }}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Client</span>
                  <span>{deliveryInfo.fullName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Téléphone</span>
                  <span>{deliveryInfo.phone}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Quartier</span>
                  <span>{deliveryInfo.neighborhood}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Adresse</span>
                  <span className="text-right max-w-[60%] truncate">{deliveryInfo.address}</span>
                </div>
                {deliveryInfo.instructions && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Instructions</span>
                    <span className="text-right max-w-[60%] truncate italic">{deliveryInfo.instructions}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm pt-2 border-t"
                     style={{ borderColor: isDarkMode ? `${palette.cream}10` : `${palette.chocolate}10` }}>
                  <span className="font-bold">Total payé</span>
                  <span className="text-lg font-bold" style={{ color: palette.gold }}>
                    {totalAmount.toLocaleString('fr-FR')} F
                  </span>
                </div>
              </div>

              {/* WhatsApp confirmation */}
              <div className="space-y-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-all hover:shadow-xl"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Envoyer la confirmation sur WhatsApp</span>
                  <Send className="w-4 h-4" />
                </motion.a>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}06`,
                    color: isDarkMode ? palette.cream : palette.chocolate
                  }}
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};