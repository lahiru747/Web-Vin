// Simple Contact Form Handler (Fallback)
// This version works without EmailJS setup for immediate testing

document.addEventListener('DOMContentLoaded', function() {
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
            
            // Simple validation
            if (!name || !email || !message) {
                showMessage('error', 'Please fill in all required fields.');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showMessage('error', 'Please enter a valid email address.');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                return;
            }
            
            // Simulate email sending (for testing)
            setTimeout(() => {
                // Create mailto link as fallback
                const mailtoLink = `mailto:lahiru747@yahoo.com?subject=${encodeURIComponent('PSA Contact: ' + subject)}&body=${encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\n---\nSent from PSA Protection Systems website`
                )}`;
                
                // Try to open email client
                window.location.href = mailtoLink;
                
                // Show success message
                showMessage('success', 'Your email client should open with a pre-filled message. Please send the email to complete your inquiry.');
                form.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1000);
        });
    });
    
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
