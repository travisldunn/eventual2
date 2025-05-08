import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 py-4 px-6 ${
        isScrolled ? 'bg-eventual-black/90 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-eventual flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Logo />
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            <motion.li 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs hover:text-white transition-colors"
            >
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</a>
            </motion.li>
            <motion.li 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs hover:text-white transition-colors"
            >
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            </motion.li>
            <motion.li 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs hover:text-white transition-colors"
            >
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            </motion.li>
            <motion.li 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs hover:text-white transition-colors"
            >
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
            </motion.li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden text-muted-foreground hover:text-foreground"
          onClick={toggleMobileMenu}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-eventual-black/95 backdrop-blur-md border-t border-white/10"
        >
          <div className="container-eventual py-4">
            <ul className="flex flex-col space-y-4">
              <li className="text-xs uppercase hover:text-white transition-colors">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
              </li>
              <li className="text-xs uppercase hover:text-white transition-colors">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Price</a>
              </li>
              <li className="text-xs uppercase hover:text-white transition-colors">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
              </li>
              <li className="text-xs uppercase hover:text-white transition-colors">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">IPA</a>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
