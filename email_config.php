<?php
// Email Configuration for PSA Protection Systems
// Update these settings as needed

// Email addresses
define('ADMIN_EMAIL', 'lahiru747@yahoo.com');
define('FROM_EMAIL', 'noreply@psaprotections.com.au');

// Email settings
define('EMAIL_SUBJECT_PREFIX', 'PSA Protection Systems - Contact Form');
define('COMPANY_NAME', 'Protection Systems Australia');

// SMTP Settings (if using SMTP instead of mail())
// Uncomment and configure if your server requires SMTP
/*
define('USE_SMTP', true);
define('SMTP_HOST', 'smtp.yourdomain.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'your-email@yourdomain.com');
define('SMTP_PASSWORD', 'your-password');
define('SMTP_ENCRYPTION', 'tls'); // or 'ssl'
*/

// Form validation settings
define('MIN_MESSAGE_LENGTH', 10);
define('MAX_MESSAGE_LENGTH', 2000);
define('MAX_NAME_LENGTH', 100);
define('MAX_SUBJECT_LENGTH', 200);

// Security settings
define('ENABLE_CSRF_PROTECTION', false); // Set to true if you want CSRF protection
define('RATE_LIMIT_ENABLED', false); // Set to true to enable rate limiting
define('RATE_LIMIT_ATTEMPTS', 5); // Max attempts per hour per IP
?>
