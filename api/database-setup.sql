-- Newsletter Subscription Table for Double Opt-In
-- Run this on your AlwaysData MySQL database

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    source VARCHAR(50) NOT NULL COMMENT 'contact or trainer',
    opt_in_status ENUM('pending', 'confirmed', 'unsubscribed') DEFAULT 'pending',
    confirmation_token VARCHAR(64) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP NULL,
    unsubscribed_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_token (confirmation_token),
    INDEX idx_status (opt_in_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: Table for tracking newsletter sends (for future use)
CREATE TABLE IF NOT EXISTS newsletter_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subscription_id INT NOT NULL,
    action ENUM('subscribed', 'confirmed', 'unsubscribed', 'newsletter_sent') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscription_id) REFERENCES newsletter_subscriptions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
