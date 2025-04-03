/*
  # Add outstanding_balance column to bookings table

  1. Changes
    - Add outstanding_balance column to bookings table
    - Set default value to 0
    - Make it a numeric(10,2) type to match other monetary columns
    
  2. Purpose
    - Fix error in booking update functionality
    - Ensure consistency with frontend expectations
*/

-- Add outstanding_balance column to bookings table
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS outstanding_balance numeric(10,2) DEFAULT 0;