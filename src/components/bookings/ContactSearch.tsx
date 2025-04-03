import React from 'react';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';

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
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => onSearch('email')}
          className="w-full"
          isLoading={isSearching}
        >
          Search by Email
        </Button>
      </div>
      <div className="space-y-2">
        <FormField
          label="Mobile Number"
          placeholder="+1234567890"
          {...register('mobile')}
          error={errors.mobile?.message}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => onSearch('mobile')}
          className="w-full"
          isLoading={isSearching}
        >
          Search by Mobile
        </Button>
      </div>
    </div>
  );
};