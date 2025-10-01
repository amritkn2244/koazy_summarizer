import React from 'react';
import { motion } from 'framer-motion';
import { Clipboard, Check } from 'lucide-react';

interface SummaryDisplayProps {
  summary: string;
  onCopy: () => void;
  copied: boolean;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary, onCopy, copied }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">Summary</h2>
        <button
          onClick={onCopy}
          className="flex items-center gap-2 text-sm text-primary font-medium hover:text-primary-hover transition-colors disabled:opacity-50"
          disabled={copied}
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Clipboard size={16} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="bg-secondary dark:bg-dark-secondary p-6 rounded-xl text-text-secondary dark:text-dark-text-secondary whitespace-pre-wrap overflow-y-auto flex-grow">
        {summary}
      </div>
    </motion.div>
  );
};

export default SummaryDisplay;
