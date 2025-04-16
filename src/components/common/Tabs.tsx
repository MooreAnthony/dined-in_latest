import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [loadedTabs, setLoadedTabs] = useState<Set<number>>(new Set([0]));

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setLoadedTabs(prev => new Set(prev).add(index));
  };

  return (
    <div className="w-full bg-dark-secondary rounded-2xl shadow-md">
      <div className="flex border-b border-dark-border">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === index
                ? 'border-b-2 border-dark-accent text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 min-h-[100px]">
        <AnimatePresence mode="wait">
          {tabs.map((tab, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: activeTab === index ? 1 : 0, y: activeTab === index ? 0 : 5 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              style={{ display: activeTab === index ? 'block' : 'none' }}
            >
              {loadedTabs.has(index) && tab.content}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
