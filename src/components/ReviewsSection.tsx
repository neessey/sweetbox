import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, Heart, Instagram, Sparkles, Quote, 
  ChevronLeft, ChevronRight, MapPin, Award,
  Clock, ThumbsUp, MessageCircle, Share2
} from 'lucide-react';

interface ReviewsSectionProps {
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

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedReviews, setLikedReviews] = useState<Record<number, boolean>>({});

  const reviews = [
  {
  id: 0,
  name: 'David L.',
  rating: 5,
  date: 'Hier',
  comment: 'Franchement incroyable ! Les crêpes Kinder était juste une tuerie, bien garnie avec un goût de chocolat qui fond en bouche. Je recommande à 100% !',
  product: 'Crêpe Kinder Chocolat',
  location: 'Abidjan, Cocody',
  avatar: '/assets/david.jpg',
  likes: 24,
  verified: true,
},
{
  id: 1,
  name: 'Soraya M.',
  rating: 5,
  date: 'Il y a 3 jours',
  comment: 'Les crêpes Oreo Chocolat était incroyable ! Le mélange du chocolat fondant avec les morceaux d’Oreo donne un résultat vraiment gourmand. Une vraie pépite !',
  product: 'Crêpe Oreo Chocolat',
  location: 'Abidjan, Plateau',
  avatar: '/assets/soraya.jpg',
  likes: 18,
  verified: true,
},

  ];

  const stats = [
    { label: 'Clients satisfaits', value: '2,500+', icon: Award },
    { label: 'Avis 5 étoiles', value: '98%', icon: Star },
    { label: 'Commandes livrées', value: '1,800+', icon: Clock },
  ];

  const handleLike = (id: number) => {
    setLikedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section 
      id="reviews" 
      className="py-20 relative overflow-hidden"
      style={{ 
        backgroundColor: isDarkMode ? palette.chocolate : palette.cream,
        color: isDarkMode ? palette.cream : palette.chocolate
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-[0.03] blur-[120px]"
          style={{ background: palette.gold }}
        />
        <div 
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-[0.03] blur-[100px]"
          style={{ background: palette.goldLight }}
        />
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 80% 20%, ${palette.gold}05, transparent 60%)` 
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
            <Heart className="w-3.5 h-3.5" style={{ color: palette.gold }} fill={palette.gold} />
            <span className="text-xs font-medium uppercase tracking-[0.2em]" style={{ color: palette.gold }}>
              Avis & retours
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
            La communauté
            <span className="block mt-1" style={{ color: palette.gold }}>
              Sweet box
            </span>
          </h2>

          <p className="mt-4 text-base leading-relaxed opacity-80"
             style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Des milliers de boîtes de bonheur livrées avec passion. Découvrez les retours de nos gourmands !
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-4 rounded-2xl"
                style={{
                  backgroundColor: isDarkMode ? `${palette.cream}05` : `${palette.chocolate}04`,
                  border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
                }}
              >
                <div className="flex justify-center mb-1">
                  <Icon className="w-5 h-5" style={{ color: palette.gold }} />
                </div>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                  {stat.value}
                </p>
                <p className="text-xs opacity-60">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Reviews Carousel - Mobile */}
        <div className="lg:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: isDarkMode ? `${palette.cream}05` : '#FFFFFF',
                border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
              }}
            >
              <ReviewCard 
                review={reviews[currentIndex]} 
                isDarkMode={isDarkMode}
                isLiked={!!likedReviews[currentIndex]}
                onLike={() => handleLike(currentIndex)}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: idx === currentIndex ? palette.gold : isDarkMode ? `${palette.cream}20` : `${palette.chocolate}20`,
                  width: idx === currentIndex ? '24px' : '8px'
                }}
              />
            ))}
          </div>
        </div>

        {/* Reviews Grid - Desktop */}
        <div className="hidden lg:grid grid-cols-3 gap-6 my-12">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
              className="p-6 rounded-2xl transition-all duration-300"
              style={{
                backgroundColor: isDarkMode ? `${palette.cream}05` : '#FFFFFF',
                border: `1px solid ${isDarkMode ? `${palette.cream}10` : `${palette.chocolate}08`}`
              }}
            >
              <ReviewCard 
                review={review} 
                isDarkMode={isDarkMode}
                isLiked={!!likedReviews[review.id]}
                onLike={() => handleLike(review.id)}
              />
            </motion.div>
          ))}
        </div>

       <div className="mt-12" />
      </div>
    </section>
  );
};

// Review Card Component
interface ReviewCardProps {
  review: {
    id: number;
    name: string;
    rating: number;
    date: string;
    comment: string;
    product: string;
    location: string;
    avatar: string;
    likes: number;
    verified: boolean;
  };
  isDarkMode: boolean;
  isLiked: boolean;
  onLike: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ 
  review, 
  isDarkMode, 
  isLiked, 
  onLike 
}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar}
            alt={review.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full object-cover border-2"
            style={{ borderColor: palette.gold }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-sm" style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                {review.name}
              </h4>
              {review.verified && (
                <div className="w-4 h-4 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: palette.gold }}>
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] opacity-50">{review.date}</span>
            </div>
          </div>
        </div>
        <span className="text-[10px] font-medium px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: `${palette.gold}15`,
                color: palette.gold
              }}>
          {review.product}
        </span>
      </div>

      {/* Comment */}
      <div className="relative">
        <Quote className="w-4 h-4 absolute -top-1 -left-1 opacity-20" style={{ color: palette.gold }} />
        <p className="text-sm leading-relaxed pl-4 italic opacity-80"
           style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          {review.comment}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t"
           style={{ borderColor: isDarkMode ? `${palette.cream}08` : `${palette.chocolate}08` }}>
        <div className="flex items-center gap-2 text-xs opacity-50">
          <MapPin className="w-3 h-3" />
          <span>{review.location}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onLike}
            className="flex items-center gap-1.5 text-xs transition-colors"
            style={{ color: isLiked ? palette.gold : 'inherit' }}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{isLiked ? review.likes + 1 : review.likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs opacity-40 hover:opacity-70 transition-colors">
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper component
const Check: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);