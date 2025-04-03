import React from 'react';
import { Button } from '../common/Button';

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  isSubmitting,
  isEditing,
}) => {
  return (
    <div className="flex justify-end gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        isLoading={isSubmitting}
        className="flex items-center gap-2"
      >
        {isEditing ? 'Update Booking' : 'Create Booking'}
      </Button>
    </div>
  );
};