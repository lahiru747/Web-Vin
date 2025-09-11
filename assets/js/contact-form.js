// Contact Form Handler using EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Wait for EmailJS to load
    const checkEmailJS = setInterval(() => {
        if (typeof emailjs !== 'undefined') {
            clearInterval(checkEmailJS);
            initializeForms();
        }
    }, 100);

    function initializeForms() {
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
                
                // Validate form
                if (!validateForm(formData)) {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    return;
                }
                
                // Send email using EmailJS
                sendEmail(formData)
                    .then(data => {
                        if (data.success) {
                            // Success message
                            showMessage('success', data.message);
                            form.reset(); // Clear form
                        } else {
                            // Error message
                            showMessage('error', data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        showMessage('error', 'Sorry, there was an error sending your message. Please try again later.');
                    })
                    .finally(() => {
                        // Reset button
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    });
            });
        });
    }
    
    // Form validation
    function validateForm(formData) {
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const subject = formData.get('subject');
        
        // Check name
        if (!name || name.trim().length < 1) {
            showMessage('error', 'Please enter your name.');
            return false;
        }
        
        // Check email
        if (!email || !isValidEmail(email)) {
            showMessage('error', 'Please enter a valid email address.');
            return false;
        }
        
        // Check message
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
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                const messages = document.querySelectorAll('.form-message.success');
                messages.forEach(msg => msg.remove());
            }, 5000);
        }
    }
});
