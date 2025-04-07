import React, { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left text-white font-medium hover:text-blue-400 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          className={twMerge(
            'w-5 h-5 transition-transform duration-200 text-gray-400',
            isOpen && 'rotate-180 text-blue-400'
          )}
        />
      </button>

      <div
        className={twMerge(
          'overflow-hidden transition-all duration-300 text-sm text-gray-400',
          isOpen ? 'max-h-screen pb-4' : 'max-h-0'
        )}
      >
        {children}
      </div>
    </div>
  );
};

interface AccordionProps {
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return (
    <div className="divide-y divide-gray-700 rounded-xl bg-[#1a1b2b] shadow-lg">
      {children}
    </div>
  );
};

export default Accordion;
