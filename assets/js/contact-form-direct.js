// Direct Email Sending using EmailJS
// This sends emails directly when user clicks "Send Message"

document.addEventListener('DOMContentLoaded', function() {
    // EmailJS Configuration
    // You'll need to replace these with your actual EmailJS credentials
    const EMAILJS_SERVICE_ID = 'service_psa_protection'; // Replace with your service ID
    const EMAILJS_TEMPLATE_ID = 'template_contact_form'; // Replace with your template ID
    const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // Replace with your public key
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
    
    // Handle all contact forms
    const contactForms = document.querySelectorAll('form[id*="contact"]');
    
    contactForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject') || 'Contact Form Submission';
            const message = formData.get('message');
            
            // Validate form
            if (!validateForm(name, email, message)) {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                return;
            }
            
            // Send email directly
            sendEmailDirectly(name, email, subject, message)
                .then(response => {
                    if (response.success) {
                        showMessage('success', 'Your message has been sent successfully! We will get back to you soon.');
                        form.reset(); // Clear form
                    } else {
                        showMessage('error', 'Sorry, there was an error sending your message. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Email sending error:', error);
                    showMessage('error', 'Sorry, there was an error sending your message. Please try again later.');
                })
                .finally(() => {
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
        });
    });
    
    // Function to send email directly using EmailJS
    async function sendEmailDirectly(name, email, subject, message) {
        try {
            // Check if EmailJS is loaded
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS not loaded');
            }
            
            // Prepare email parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'lahiru747@yahoo.com', // Your target email
                company_name: 'PSA Protection Systems',
                website: 'PSA Protection Systems Website'
            };
            
            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );
            
            console.log('Email sent successfully:', response);
            return { success: true, response: response };
            
        } catch (error) {
            console.error('EmailJS error:', error);
            
            // Fallback: Try to send using a different method
            return await sendEmailFallback(name, email, subject, message);
        }
    }
    
    // Fallback method using a different free email service
    async function sendEmailFallback(name, email, subject, message) {
        try {
            // Using Formspree as a fallback (free service)
            const formspreeEndpoint = 'https://formspree.io/f/xpzgqkqk'; // Replace with your Formspree endpoint
            
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    _replyto: email,
                    _subject: `PSA Contact: ${subject}`
                })
            });
            
            if (response.ok) {
                return { success: true, response: response };
            } else {
                throw new Error('Formspree request failed');
            }
            
        } catch (error) {
            console.error('Fallback email error:', error);
            return { success: false, error: error };
        }
    }
    
    // Form validation
    function validateForm(name, email, message) {
        if (!name || name.trim().length < 1) {
            showMessage('error', 'Please enter your name.');
            return false;
        }
        
        if (!email || !isValidEmail(email)) {
            showMessage('error', 'Please enter a valid email address.');
            return false;
        }
        
        if (!message || message.trim().length < 3) {
            showMessage('error', 'Please enter a message (at least 3 characters).');
            return false;
        }
        
        return true;
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to show messages
    function showMessage(type, message) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.cssText = `
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
            font-weight: 500;
            text-align: center;
            ${type === 'success' ? 
                'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
                'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        messageDiv.textContent = message;
        
        // Insert message after the form
        const forms = document.querySelectorAll('form[id*="contact"]');
        forms.forEach(form => {
            if (form.querySelector('.form-message')) {
                form.querySelector('.form-message').remove();
            }
            form.parentNode.insertBefore(messageDiv.cloneNode(true), form.nextSibling);
        });
        
        // Auto-hide success messages after 8 seconds
        if (type === 'success') {
            setTimeout(() => {
                const messages = document.querySelectorAll('.form-message.success');
                messages.forEach(msg => msg.remove());
            }, 8000);
        }
    }
});
