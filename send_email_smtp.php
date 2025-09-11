<?php
// Alternative SMTP email handler
require_once 'email_config.php';

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    
    // Validation
    $errors = array();
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    
    if (empty($message)) {
        $errors[] = "Message is required";
    }
    
    // If no errors, try to send email
    if (empty($errors)) {
        // Prepare email content
        $email_subject = EMAIL_SUBJECT_PREFIX . ($subject ? " - " . $subject : "");
        
        $email_body = "
        <html>
        <head>
            <title>Contact Form Submission</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #f33f3f; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f9f9f9; padding: 20px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #2c3e50; }
                .value { margin-top: 5px; }
                .footer { background-color: #2c3e50; color: white; padding: 15px; text-align: center; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>New Contact Form Submission</h2>
                    <p>Protection Systems Australia</p>
                </div>
                <div class='content'>
                    <div class='field'>
                        <div class='label'>Name:</div>
                        <div class='value'>" . htmlspecialchars($name) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Email:</div>
                        <div class='value'>" . htmlspecialchars($email) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Subject:</div>
                        <div class='value'>" . htmlspecialchars($subject) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Message:</div>
                        <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
                    </div>
                    <div class='field'>
                        <div class='label'>Submitted:</div>
                        <div class='value'>" . date('Y-m-d H:i:s') . "</div>
                    </div>
                </div>
                <div class='footer'>
                    <p>This email was sent from the PSA Protection Systems contact form.</p>
                </div>
            </div>
        </body>
        </html>";
        
        // Try multiple email methods
        $email_sent = false;
        
        // Method 1: Simple mail() function
        $headers = array(
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: ' . FROM_EMAIL,
            'Reply-To: ' . $email,
            'X-Mailer: PHP/' . phpversion()
        );
        
        if (mail(ADMIN_EMAIL, $email_subject, $email_body, implode("\r\n", $headers))) {
            $email_sent = true;
        }
        
        // Method 2: Try with different headers if first method fails
        if (!$email_sent) {
            $simple_headers = "From: " . FROM_EMAIL . "\r\n";
            $simple_headers .= "Reply-To: " . $email . "\r\n";
            $simple_headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            
            if (mail(ADMIN_EMAIL, $email_subject, $email_body, $simple_headers)) {
                $email_sent = true;
            }
        }
        
        // Method 3: Try plain text if HTML fails
        if (!$email_sent) {
            $plain_text = "
New Contact Form Submission
Protection Systems Australia

Name: " . $name . "
Email: " . $email . "
Subject: " . $subject . "
Message: " . $message . "

Submitted: " . date('Y-m-d H:i:s') . "

This email was sent from the PSA Protection Systems contact form.
            ";
            
            $plain_headers = "From: " . FROM_EMAIL . "\r\n";
            $plain_headers .= "Reply-To: " . $email . "\r\n";
            
            if (mail(ADMIN_EMAIL, $email_subject, $plain_text, $plain_headers)) {
                $email_sent = true;
            }
        }
        
        if ($email_sent) {
            $response = array(
                'success' => true,
                'message' => 'Thank you for your message! We will get back to you soon.'
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Sorry, there was an error sending your message. Please try again later or contact us directly at ' . ADMIN_EMAIL
            );
        }
    } else {
        $response = array(
            'success' => false,
            'message' => 'Please correct the following errors: ' . implode(', ', $errors)
        );
    }
    
    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// If not POST request, redirect to home page
header('Location: index.html');
exit;
?>
