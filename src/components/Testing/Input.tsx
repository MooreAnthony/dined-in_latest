import { InputHTMLAttributes } from 'react';

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full px-4 py-2 rounded-lg bg-dark-primary text-white placeholder-gray-400 border border-dark-border focus:outline-none focus:ring-2 focus:ring-dark-accent transition ${className}`}
      {...props}
    />
  );
}