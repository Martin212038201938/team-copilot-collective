-- DSGVO Compliance Migration
-- Adds consent tracking fields to newsletter_subscriptions table
-- Run this on your AlwaysData MySQL database: y-b_copilotenschule

-- Add consent_text column to store the exact consent text shown to the user
ALTER TABLE newsletter_subscriptions
ADD COLUMN consent_text TEXT NULL COMMENT 'Exact consent text shown to user at form submission'
AFTER user_agent;

-- Add form_submitted_at column to track when the form was initially submitted
ALTER TABLE newsletter_subscriptions
ADD COLUMN form_submitted_at TIMESTAMP NULL COMMENT 'When the form was submitted (before confirmation)'
AFTER consent_text;

-- Update existing records to set form_submitted_at to created_at if not already set
UPDATE newsletter_subscriptions
SET form_submitted_at = created_at
WHERE form_submitted_at IS NULL;

-- Verify the changes
SELECT
    COLUMN_NAME,
    COLUMN_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT,
    COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'y-b_copilotenschule'
  AND TABLE_NAME = 'newsletter_subscriptions'
ORDER BY ORDINAL_POSITION;
