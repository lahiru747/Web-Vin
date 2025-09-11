<?php
// Include configuration
require_once 'email_config.php';

// Email configuration
$to_email = ADMIN_EMAIL;
$from_email = FROM_EMAIL;
$subject_prefix = EMAIL_SUBJECT_PREFIX;

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
    
    // If no errors, send email
    if (empty($errors)) {
        // Prepare email content
        $email_subject = $subject_prefix . ($subject ? " - " . $subject : "");
        
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
        
        // Email headers
        $headers = array(
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: ' . $from_email,
            'Reply-To: ' . $email,
            'X-Mailer: PHP/' . phpversion()
        );
        
        // Send email
        if (mail($to_email, $email_subject, $email_body, implode("\r\n", $headers))) {
            // Success response
            $response = array(
                'success' => true,
                'message' => 'Thank you for your message! We will get back to you soon.'
            );
        } else {
            // Error response
            $response = array(
                'success' => false,
                'message' => 'Sorry, there was an error sending your message. Please try again later.'
            );
        }
    } else {
        // Validation errors
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
