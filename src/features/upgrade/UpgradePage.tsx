import React from 'react';
import { motion } from 'framer-motion';
export default function UpgradePage() { return <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-4 font-poppins bg-[#0D367A] text-white min-h-screen"><h1 className="text-3xl font-bold text-[#FFD000]">Scorenova Premium</h1></motion.div>; }