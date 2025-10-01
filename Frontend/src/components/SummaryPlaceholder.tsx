import React from 'react';
import { FileText } from 'lucide-react';

const SummaryPlaceholder: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-stroke dark:border-dark-stroke rounded-xl">
      <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
      <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">Your summary will appear here</h3>
      <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1">
        Simply paste your text on the left and click "Summarize".
      </p>
    </div>
  );
};

export default SummaryPlaceholder;
