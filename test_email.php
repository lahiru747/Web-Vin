<?php
// Simple email test script
echo "<h2>Email System Test</h2>";

// Test 1: Check if PHP mail function is available
echo "<h3>Test 1: PHP Mail Function</h3>";
if (function_exists('mail')) {
    echo "✅ PHP mail() function is available<br>";
} else {
    echo "❌ PHP mail() function is NOT available<br>";
}

// Test 2: Check server configuration
echo "<h3>Test 2: Server Configuration</h3>";
echo "PHP Version: " . phpversion() . "<br>";
echo "Server: " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "Operating System: " . php_uname() . "<br>";

// Test 3: Check if we can send a simple email
echo "<h3>Test 3: Simple Email Test</h3>";
$to = "lahiru747@yahoo.com";
$subject = "PSA Test Email";
$message = "This is a test email from PSA Protection Systems website.";
$headers = "From: noreply@psaprotections.com.au\r\n";
$headers .= "Reply-To: noreply@psaprotections.com.au\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "✅ Test email sent successfully to $to<br>";
    echo "Check your email inbox for the test message.<br>";
} else {
    echo "❌ Failed to send test email<br>";
    echo "Error: " . error_get_last()['message'] . "<br>";
}

// Test 4: Check file permissions
echo "<h3>Test 4: File Permissions</h3>";
$files_to_check = ['send_email.php', 'email_config.php'];
foreach ($files_to_check as $file) {
    if (file_exists($file)) {
        echo "✅ $file exists<br>";
        echo "Permissions: " . substr(sprintf('%o', fileperms($file)), -4) . "<br>";
    } else {
        echo "❌ $file does not exist<br>";
    }
}

// Test 5: Check if we can include the config file
echo "<h3>Test 5: Configuration File</h3>";
if (file_exists('email_config.php')) {
    try {
        require_once 'email_config.php';
        echo "✅ email_config.php loaded successfully<br>";
        echo "Admin Email: " . ADMIN_EMAIL . "<br>";
        echo "From Email: " . FROM_EMAIL . "<br>";
    } catch (Exception $e) {
        echo "❌ Error loading email_config.php: " . $e->getMessage() . "<br>";
    }
} else {
    echo "❌ email_config.php not found<br>";
}

echo "<hr>";
echo "<p><strong>If the email test failed, you may need to:</strong></p>";
echo "<ul>";
echo "<li>Configure SMTP settings in your hosting provider</li>";
echo "<li>Contact your hosting provider to enable PHP mail() function</li>";
echo "<li>Use a third-party email service like SendGrid or Mailgun</li>";
echo "<li>Check server logs for more detailed error messages</li>";
echo "</ul>";
?>
