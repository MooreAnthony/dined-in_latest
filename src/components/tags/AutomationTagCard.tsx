import React from 'react';

interface AutomationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  children?: React.ReactNode; // Optional for additional inputs like "Period (days)"
}

export const AutomationCard: React.FC<AutomationCardProps> = ({
  icon,
  title,
  description,
  isEnabled,
  onToggle,
  children,
}) => {
  return (
    <div className="p-4 bg-dark-secondary rounded-lg shadow-md space-y-4">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h3 className="text-lg font-semibold text-dark-text-primary">{title}</h3>
          <p className="text-sm text-dark-text-secondary">{description}</p>
        </div>
      </div>
      {children && <div>{children}</div>}
      <div className="flex items-center justify-between">
        <label className="text-dark-text-primary text-sm font-medium">
          Enable {title}:
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => onToggle(e.target.checked)}
            className="sr-only peer"
            aria-label={`Toggle ${title}`}
          />
          <div
            className="w-10 h-5 bg-gray-300 peer-focus:ring-2 peer-focus:ring-dark-accent rounded-full peer
              peer-checked:bg-dark-accent relative transition-all"
          >
            <div
              className="absolute left-1 top-1 w-3.5 h-3.5 bg-white rounded-full transition-transform
                peer-checked:translate-x-5"
            />
          </div>
        </label>
      </div>
    </div>
  );
};