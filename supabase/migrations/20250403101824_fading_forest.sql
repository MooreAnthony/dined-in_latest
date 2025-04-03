/*
  # Add Email Templates Management Schema

  1. New Tables
    - `email_templates`: Store template configurations and content
    - `email_template_versions`: Track version history
    
  2. Security
    - Enable RLS
    - Add policies for company-based access control
*/

-- Create email_templates table
CREATE TABLE email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  code text NOT NULL,
  name text NOT NULL,
  subject text NOT NULL,
  html_content text NOT NULL,
  is_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  modified_at timestamptz DEFAULT now(),
  modified_by uuid REFERENCES auth.users(id),
  UNIQUE(company_id, code)
);

-- Create email_template_versions table
CREATE TABLE email_template_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES email_templates(id) ON DELETE CASCADE,
  subject text NOT NULL,
  html_content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  is_active boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_template_versions ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX idx_email_templates_company ON email_templates(company_id);
CREATE INDEX idx_email_templates_code ON email_templates(company_id, code);
CREATE INDEX idx_email_template_versions_template ON email_template_versions(template_id);

-- Create policies
CREATE POLICY "Users can view email templates for their company"
  ON email_templates FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM company_users
      WHERE company_users.company_id = email_templates.company_id
      AND company_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Staff can manage email templates"
  ON email_templates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM company_users
      WHERE company_users.company_id = email_templates.company_id
      AND company_users.user_id = auth.uid()
      AND company_users.role IN ('owner', 'admin', 'staff')
    )
  );

CREATE POLICY "Users can view template versions"
  ON email_template_versions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM email_templates et
      JOIN company_users cu ON cu.company_id = et.company_id
      WHERE et.id = email_template_versions.template_id
      AND cu.user_id = auth.uid()
    )
  );

CREATE POLICY "Staff can manage template versions"
  ON email_template_versions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM email_templates et
      JOIN company_users cu ON cu.company_id = et.company_id
      WHERE et.id = email_template_versions.template_id
      AND cu.user_id = auth.uid()
      AND cu.role IN ('owner', 'admin', 'staff')
    )
  );

-- Insert default templates
WITH company_data AS (
  SELECT id FROM companies LIMIT 1
)
INSERT INTO email_templates (
  company_id,
  code,
  name,
  subject,
  html_content,
  is_enabled
) VALUES
  (
    (SELECT id FROM company_data),
    'booking_confirmation',
    'Booking Confirmation',
    'Your booking confirmation for {{restaurant_name}}',
    '<!DOCTYPE html>
    <html>
    <body>
      <h1>Booking Confirmation</h1>
      <p>Dear {{guest_name}},</p>
      <p>Your booking at {{restaurant_name}} has been confirmed.</p>
      <p>Details:</p>
      <ul>
        <li>Date: {{booking_date}}</li>
        <li>Time: {{booking_time}}</li>
        <li>Guests: {{guest_count}}</li>
        <li>Reference: {{booking_reference}}</li>
      </ul>
      <p>We look forward to welcoming you!</p>
    </body>
    </html>',
    true
  ),
  (
    (SELECT id FROM company_data),
    'booking_cancellation',
    'Booking Cancellation',
    'Your booking cancellation for {{restaurant_name}}',
    '<!DOCTYPE html>
    <html>
    <body>
      <h1>Booking Cancelled</h1>
      <p>Dear {{guest_name}},</p>
      <p>Your booking at {{restaurant_name}} has been cancelled.</p>
      <p>Booking Details:</p>
      <ul>
        <li>Date: {{booking_date}}</li>
        <li>Time: {{booking_time}}</li>
        <li>Reference: {{booking_reference}}</li>
      </ul>
      <p>We hope to see you another time!</p>
    </body>
    </html>',
    true
  ),
  (
    (SELECT id FROM company_data),
    'booking_amendment',
    'Booking Amendment',
    'Your booking has been updated for {{restaurant_name}}',
    '<!DOCTYPE html>
    <html>
    <body>
      <h1>Booking Updated</h1>
      <p>Dear {{guest_name}},</p>
      <p>Your booking at {{restaurant_name}} has been updated.</p>
      <p>New Details:</p>
      <ul>
        <li>Date: {{booking_date}}</li>
        <li>Time: {{booking_time}}</li>
        <li>Guests: {{guest_count}}</li>
        <li>Reference: {{booking_reference}}</li>
      </ul>
      <p>We look forward to welcoming you!</p>
    </body>
    </html>',
    true
  );