// ScrollToTopButton.js
"use client";
import React, { useState, useEffect } from "react";
import { HiMiniArrowUp } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) setIsVisible(true);
    else setIsVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <AnimatePresence>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={scrollToTop}
          >
            <HiMiniArrowUp />
          </motion.button>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ScrollToTopButton;
