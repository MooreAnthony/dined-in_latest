/*
  # Add table_ids column to bookings table and fix deposit_paid type

  1. Changes
    - Add table_ids column as text array to bookings table
    - Ensure deposit_paid is numeric type for consistency
    
  2. Purpose
    - Fix errors in booking update functionality
    - Ensure proper data types for monetary values
*/

-- Add table_ids column to bookings table
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS table_ids text[] DEFAULT NULL;

-- Ensure deposit_paid is numeric type
ALTER TABLE bookings 
ALTER COLUMN deposit_paid TYPE numeric(10,2) USING deposit_paid::numeric;