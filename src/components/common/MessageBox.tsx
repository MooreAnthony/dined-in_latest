import React from 'react';
import { Button } from './Button';

interface MessageBoxProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const MessageBox: React.FC<MessageBoxProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1a1b2b] rounded-xl shadow-lg max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-semibold text-white">
            {title}
          </h3>
          <p className="text-gray-300">
            {message}
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};