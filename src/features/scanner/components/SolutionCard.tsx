import React, { useState } from 'react';
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { haptic } from '@/lib/telegram';

interface SolutionCardProps {
  icon: LucideIcon;
  title: string;
  content?: string | React.ReactNode;
  color?: string;
  defaultExpanded?: boolean;
}

export default function SolutionCard({
  icon: Icon,
  title,
  content,
  color = '#0D367A', // Default to primary
  defaultExpanded = true,
}: SolutionCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    haptic('light');
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_2px_8px_rgba(0,26,66,0.08)]">
      <button
        onClick={toggleExpand}
        className="w-full flex items-center justify-between outline-none"
      >
        <div className="flex items-center gap-3">
          <Icon size={20} style={{ color }} />
          <span className="text-sm font-bold text-gray-500 tracking-wider uppercase">
            {title}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp size={20} className="text-gray-400" />
        ) : (
          <ChevronDown size={20} className="text-gray-400" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-[15px] leading-relaxed text-gray-900">
              {typeof content === 'string' ? (
                // In a real app, this might be rendered with a LaTeX/Math text renderer (e.g., KaTeX)
                <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
              ) : (
                content
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
