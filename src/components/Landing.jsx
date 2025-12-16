import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Landing = ({ onEnter }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onEnter();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onEnter]);

  return (
    <motion.div
      className="h-screen w-full bg-black flex flex-col justify-center items-center text-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <motion.img
        src="/images/sol-bunker-logo.png"
        alt="Sol-Bunker Logo"
        className="w-[300px] h-auto rounded-xl shadow-xl animate-pulse"
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
      <motion.h1
        className="text-4xl mt-6 font-extrabold tracking-wider text-cyan-400"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Welcome to Sol-Bunker
      </motion.h1>
      <p className="text-sm text-gray-400 mt-2">
        Secure AI-Powered Trading Vault
      </p>
    </motion.div>
  );
};

export default Landing;


