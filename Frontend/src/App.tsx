import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Github, Linkedin } from 'lucide-react';

import { useTheme } from './hooks/useTheme';
import InputSection from './components/InputSection';
import SummaryDisplay from './components/SummaryDisplay';
import LoadingSkeleton from './components/LoadingSkeleton';
import SummaryPlaceholder from './components/SummaryPlaceholder';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [theme, toggleTheme] = useTheme();

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }
    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await axios.post("http://127.0.0.1:8000/summarize", { text });
      if (response.status === 200 && response.data.summary) {
        setSummary(response.data.summary);
      } else {
        setError('Failed to get a valid summary from the server.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while connecting to the server. Please ensure it is running and CORS is enabled.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen font-sans flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-surface dark:bg-dark-surface rounded-2xl shadow-2xl w-full max-w-6xl mx-auto relative"
      >
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column */}
          <div className="p-8 border-r-0 lg:border-r border-stroke dark:border-dark-stroke">
            <InputSection 
              text={text}
              setText={setText}
              handleSummarize={handleSummarize}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column */}
          <div className="p-8 relative min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                  <LoadingSkeleton />
                </motion.div>
              ) : summary ? (
                <motion.div key="summary" className="w-full h-full">
                  <SummaryDisplay summary={summary} onCopy={handleCopy} copied={copied} />
                </motion.div>
              ) : (
                <motion.div key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                  <SummaryPlaceholder />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-5 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50"
            role="alert"
          >
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
            <button onClick={() => setError('')} className="font-bold ml-4 opacity-70 hover:opacity-100">X</button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="text-center mt-8 text-text-secondary dark:text-dark-text-secondary text-sm space-y-2">
        <div className="flex justify-center gap-6">
         <a 
            href="https://github.com/amritkn2244" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-primary dark:hover:text-primary transition-colors"
        >
            <Github size={16} />
            <span>Github/amritkn2244</span>
        </a>

        <a 
            href="https://linkedin.com/in/amritkn2244" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-primary dark:hover:text-primary transition-colors"
        >
            <Linkedin size={16} />
            <span>LinkedIn/amritkn2244</span>
        </a>
        </div>

        <p>&copy; 2025 Koazy Summarizer | By Amrit Kumar Nayak | Uses React + Tailwind and FastAPI</p>
      </footer>

    </div>
  );
};

export default App;
