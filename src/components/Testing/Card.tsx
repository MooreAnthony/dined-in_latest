import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-dark-secondary rounded-xl p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
}