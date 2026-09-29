import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden font-poppins">
      {/* Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/splash_bg.png')" }}
      />
      
      {/* Content Layer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeIn" }}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        <img 
          src="/assets/logo.png" 
          alt="Scorenova Logo" 
          className="h-[150px] object-contain"
        />
        
        <div className="h-[24px]" />
        
        <h1 className="text-[38px] font-bold leading-none tracking-tight">
          <span className="text-white">Score</span>
          <span className="text-[#FFD200]">nova</span>
        </h1>
        
        <div className="h-[12px]" />
        
        <p className="text-white text-[16px] font-light tracking-[1.2px]">
          Learn smarter, achieve more
        </p>
      </motion.div>
    </div>
  );
}
