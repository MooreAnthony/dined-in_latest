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
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left text-gray-800 font-medium hover:text-[#1a237e] transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          className={twMerge(
            'w-5 h-5 transition-transform duration-200',
            isOpen ? 'rotate-180 text-[#1a237e]' : 'rotate-0'
          )}
        />
      </button>

      <div
        className={twMerge(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-screen pb-4' : 'max-h-0'
        )}
      >
        <div className="text-gray-600 text-sm">{children}</div>
      </div>
    </div>
  );
};

interface AccordionProps {
  children: ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return <div className="divide-y divide-gray-100 rounded-xl bg-white shadow">{children}</div>;
};
