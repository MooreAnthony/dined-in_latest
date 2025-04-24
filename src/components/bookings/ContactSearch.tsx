import React from 'react';
import { FormField } from '../common/FormField';
import { SearchIcon } from 'lucide-react'; // Assuming you use lucide-react for icons

interface ContactSearchProps {
  onSearch: (field: 'email' | 'mobile') => Promise<void>;
  register: any; // TODO: Add proper type from react-hook-form
  errors: any; // TODO: Add proper type from react-hook-form
  isSearching: boolean;
}

export const ContactSearch: React.FC<ContactSearchProps> = ({
  onSearch,
  register,
  errors,
  isSearching,
}) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-2">
        <FormField
          label="Email Address"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          icon={SearchIcon} // Add search icon
          onIconClick={() => onSearch('email')} // Add click handler for the icon
          iconProps={{ // Pass props to the icon if needed, e.g., loading state
            className: isSearching ? 'animate-spin' : '',
          }}
        />
      </div>
      <div className="space-y-2">
        <FormField
          label="Mobile Number"
          placeholder="+7812313131"
          {...register('mobile')}
          error={errors.mobile?.message}
          icon={SearchIcon} // Add search icon
          onIconClick={() => onSearch('mobile')} // Add click handler for the icon
          iconProps={{ // Pass props to the icon if needed, e.g., loading state
            className: isSearching ? 'animate-spin' : '',
          }}
        />
      </div>
    </div>
  );
};