import React from 'react';
import { FormField } from '../common/FormField';
import { COUNTRIES } from '../../utils/constants';
import type { ContactFields } from '../../types/bookings';

interface ContactDetailsProps {
  showFields: ContactFields;
  register: any; // TODO: Add proper type from react-hook-form
  errors: any; // TODO: Add proper type from react-hook-form
  isSearching: boolean;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  showFields,
  register,
  errors,
  isSearching,
}) => {
  return (
    <div>
      {isSearching && (
        <div className="text-sm text-dark-text-secondary animate-pulse">
          Searching for existing contact...
        </div>
      )}
      
      {showFields.first_name && (
        <div className="grid grid-cols-2 gap-6">
          <FormField
            label="First Name"
            {...register('first_name')}
            error={errors.first_name?.message}
          />
          <FormField
            label="Last Name"
            {...register('last_name')}
            error={errors.last_name?.message}
          />
        </div>
      )}

      {showFields.birthday_month && (
        <div className="grid grid-cols-2 gap-6">
          <FormField
            label="Birthday Month (1-12)"
            type="number"
            min={1}
            max={12}
            {...register('birthday_month', { valueAsNumber: true })}
            error={errors.birthday_month?.message}
          />
          <FormField
            label="Birthday Day (1-31)"
            type="number"
            min={1}
            max={31}
            {...register('birthday_day', { valueAsNumber: true })}
            error={errors.birthday_day?.message}
          />
        </div>
      )}

      {showFields.street_address && (
        <FormField
          label="Street Address"
          {...register('street_address')}
          error={errors.street_address?.message}
        />
      )}

      {showFields.city && (
        <div className="grid grid-cols-2 gap-6">
          <FormField
            label="City"
            {...register('city')}
            error={errors.city?.message}
          />
          <FormField
            label="State/Province"
            {...register('state')}
            error={errors.state?.message}
          />
        </div>
      )}

      {showFields.postal_code && (
        <div className="grid grid-cols-2 gap-6">
          <FormField
            label="Postal Code"
            {...register('postal_code')}
            error={errors.postal_code?.message}
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-dark-text-secondary">
              Country
            </label>
            <select
              {...register('country')}
              className="w-full px-4 py-2 bg-dark-secondary border-2 border-dark-border rounded-lg
                text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-dark-accent/50"
            >
              <option value="">Select a country</option>
              {COUNTRIES.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-sm text-red-400">{errors.country.message}</p>
            )}
          </div>
        </div>
      )}

      {showFields.communication && (
        <div className="space-y-4">
          <h4 className="font-medium text-dark-text-primary">Communication Preferences</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('email_consent')}
                className="w-4 h-4 text-dark-accent border-dark-border rounded
                  focus:ring-dark-accent bg-dark-secondary"
              />
              <span className="text-dark-text-secondary">
                Email consent
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('sms_consent')}
                className="w-4 h-4 text-dark-accent border-dark-border rounded
                  focus:ring-dark-accent bg-dark-secondary"
              />
              <span className="text-dark-text-secondary">
                SMS consent
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};