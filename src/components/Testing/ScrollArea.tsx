import { ReactNode } from 'react';
import classNames from 'classnames';

interface ScrollAreaProps {
  className?: string;
  children: ReactNode;
  height?: string; // You can pass something like 'h-[500px]'
}

export function ScrollArea({ className, children, height = 'max-h-[500px]' }: ScrollAreaProps) {
  return (
    <div
      className={classNames(
        'overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-dark-border scrollbar-track-dark-primary',
        height,
        className
      )}
    >
      {children}
    </div>
  );
}
