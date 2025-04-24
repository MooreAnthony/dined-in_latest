import React from 'react';
import { Input, InputProps } from './Input'; 
import { Label } from '../common/Label'; 
import { cn } from '../../utils/cn'; 

// Define IconComponentType if not already defined
type IconComponentType = React.ElementType;

interface FormFieldProps extends InputProps {
  label?: string;
  error?: string;
  icon?: IconComponentType; // Add icon prop
  onIconClick?: () => void; // Add icon click handler prop
  iconProps?: React.ComponentProps<IconComponentType>; // Add icon props prop
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, id, icon: Icon, onIconClick, iconProps, ...props }, ref) => {
    const inputId = id || props.name; // Use name as fallback for id if needed for label association

    return (
      <div className={cn('space-y-1', className)}>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <div className="relative"> {/* Add relative positioning container */}
          <Input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              error ? 'border-red-500' : '',
              Icon ? 'pr-10' : '' // Add padding-right if icon exists
            )}
            {...props}
          />
          {Icon && ( // Conditionally render the icon
            <div
              className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
              onClick={onIconClick} // Attach click handler
            >
              <Icon
                className={cn('h-5 w-5 text-gray-400', iconProps?.className)} // Apply base styles and iconProps className
                {...iconProps} // Spread other iconProps
              />
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';