import React from 'react';
import { motion } from 'framer-motion';
import { Loader, Sparkles } from 'lucide-react';

interface InputSectionProps {
  text: string;
  setText: (text: string) => void;
  handleSummarize: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ text, setText, handleSummarize, isLoading }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="text-left mb-6">
        <div className="flex items-center gap-4">
          <img 
            src="https://i.pinimg.com/736x/eb/17/57/eb17577b8647ee8f88c077f327ea6402.jpg" 
            alt="Logo" 
            className="h-12 w-12 rounded-full object-cover shadow-md" 
          />
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary">Koazy Summarizer</h1>
        </div>
        <p className="text-text-secondary dark:text-dark-text-secondary mt-2">Shorten your text into a brief, easy-to-read summary.</p>
      </div>

      <div className="flex-grow flex flex-col">
        <div className="relative flex-grow">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to summarize..."
            className="w-full h-full min-h-[250px] p-4 border-2 border-stroke dark:border-dark-stroke rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none bg-transparent text-text-primary dark:text-dark-text-primary placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary"
            disabled={isLoading}
          />
          <span className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500">{text.length} characters</span>
        </div>
      </div>

      <motion.button
        onClick={handleSummarize}
        disabled={isLoading || !text.trim()}
        className="w-full mt-4 bg-primary text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-primary-hover disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <>
            <Loader className="animate-spin h-5 w-5" />
            <span>Summarizing...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            <span>Summarize</span>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default InputSection;
