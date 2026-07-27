import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { DeliverySection } from './components/DeliverySection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderPackagingModal } from './components/OrderPackagingModal';
import { IntroLoader } from './components/IntroLoader';
import { MenuItem, CartItem, CategoryId } from './types';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');

  const handleAddToCart = (item: MenuItem, customNotes?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.menuItemId === item.id && i.details === customNotes);
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: 'item-' + Date.now() + Math.random(),
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
          details: customNotes,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 ${
        isDarkMode ? 'bg-[#0B1B15] text-[#FAF5EC]' : 'bg-[#FAF7F2] text-[#2A1E17]'
      }`}
    >
      {/* Intro Animated Sequence */}
      <AnimatePresence>
        {showIntro && (
          <IntroLoader
            onComplete={() => setShowIntro(false)}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onReplayIntro={() => setShowIntro(true)}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Sections */}
      <main>
        {/* Section 1: Hero */}
        <Hero
          isDarkMode={isDarkMode}
          onNavigateSection={handleNavigateSection}
        />

        {/* Section 2: Menu & Prices */}
        <MenuSection
          isDarkMode={isDarkMode}
          onAddToCart={handleAddToCart}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Section 3: Delivery & Wave Payment */}
        <DeliverySection isDarkMode={isDarkMode} />

        {/* Section 4: Customer Reviews */}
        <ReviewsSection isDarkMode={isDarkMode} />
      </main>

      {/* Footer */}
      <Footer
        isDarkMode={isDarkMode}
        onNavigateSection={handleNavigateSection}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Cart Sliding Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        isDarkMode={isDarkMode}
      />

      {/* Order Packaging Confirmation Modal */}
      <OrderPackagingModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setCartItems([]);
        }}
        cartItems={cartItems}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
