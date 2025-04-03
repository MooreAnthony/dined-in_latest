/*
  # Add Email Logs Schema

  1. New Tables
    - `email_logs`: Track all sent emails
    - Store success/failure status
    - Link to templates and bookings
    
  2. Security
    - Enable RLS
    - Add policies for company-based access
*/

-- Create email_logs table
CREATE TABLE email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  template_id uuid REFERENCES email_templates(id) ON DELETE SET NULL,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  recipient text NOT NULL,
  subject text NOT NULL,
  status text NOT NULL CHECK (status IN ('success', 'failed')),
  error_message text,
  sent_at timestamptz DEFAULT now(),
  UNIQUE(booking_id, template_id)
);

-- Enable RLS
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX idx_email_logs_company ON email_logs(company_id);
CREATE INDEX idx_email_logs_booking ON email_logs(booking_id);
CREATE INDEX idx_email_logs_template ON email_logs(template_id);
CREATE INDEX idx_email_logs_status ON email_logs(company_id, status);

-- Create policies
CREATE POLICY "Users can view email logs for their company"
  ON email_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM company_users
      WHERE company_users.company_id = email_logs.company_id
      AND company_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Staff can manage email logs"
  ON email_logs FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM company_users
      WHERE company_users.company_id = email_logs.company_id
      AND company_users.user_id = auth.uid()
      AND company_users.role IN ('owner', 'admin', 'staff')
    )
  );