import React from 'react';
import { motion } from 'framer-motion';
export default function NotificationsPage() { return <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-4 font-poppins"><h1 className="text-2xl font-bold text-[#0D367A] dark:text-white">Notifications</h1></motion.div>; }