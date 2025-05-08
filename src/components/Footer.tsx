import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

const Footer: React.FC = () => {
  return (
    <footer className="py-10 border-t border-white/10">
      <div className="container-eventual">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="mb-6 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Logo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ul className="flex flex-wrap justify-center space-x-6">
              <li className="text-sm text-muted-foreground hover:text-white transition-colors">
                <a href="#">Terms</a>
              </li>
              <li className="text-sm text-muted-foreground hover:text-white transition-colors">
                <a href="#">Privacy</a>
              </li>
              <li className="text-sm text-muted-foreground hover:text-white transition-colors">
                <a href="#">Support</a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>© 2025 Eventual Climate. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}; 

export default Footer;
