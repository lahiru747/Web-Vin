// Enhanced Contact Form Handler
// Provides multiple options for sending emails

document.addEventListener('DOMContentLoaded', function() {
    // Handle all contact forms
    const contactForms = document.querySelectorAll('form[id*="contact"]');
    
    contactForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Processing...';
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
            
            // Create email content
            const emailContent = createEmailContent(name, email, subject, message);
            
            // Show options to user
            showEmailOptions(emailContent, form, submitButton, originalText);
        });
    });
    
    // Create formatted email content
    function createEmailContent(name, email, subject, message) {
        return {
            to: 'lahiru747@yahoo.com',
            subject: `PSA Protection Systems - Contact Form: ${subject}`,
            body: `Dear PSA Protection Systems Team,

I am writing to inquire about your electrical protection services.

Contact Information:
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

I look forward to hearing from you soon.

Best regards,
${name}

---
This message was sent from the PSA Protection Systems website contact form.`
        };
    }
    
    // Show email options to user
    function showEmailOptions(emailContent, form, submitButton, originalText) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;
        
        modalContent.innerHTML = `
            <h3 style="color: #2c3e50; margin-bottom: 20px;">Choose How to Send Your Message</h3>
            <p style="color: #666; margin-bottom: 25px;">Your message is ready to send. Choose your preferred method:</p>
            
            <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 25px;">
                <button id="openEmailClient" style="
                    background-color: #f33f3f;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                ">📧 Open Email Client</button>
                
                <button id="copyEmailContent" style="
                    background-color: #2c3e50;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                ">📋 Copy Email Content</button>
                
                <button id="showEmailDetails" style="
                    background-color: #6c757d;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: 500;
                ">👁️ View Email Details</button>
            </div>
            
            <button id="closeModal" style="
                background-color: #dc3545;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
            ">Cancel</button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add event listeners
        document.getElementById('openEmailClient').addEventListener('click', function() {
            const mailtoLink = `mailto:${emailContent.to}?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body)}`;
            window.location.href = mailtoLink;
            closeModal();
            showMessage('success', 'Your email client should open with a pre-filled message. Please send the email to complete your inquiry.');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
        
        document.getElementById('copyEmailContent').addEventListener('click', function() {
            const fullEmail = `To: ${emailContent.to}\nSubject: ${emailContent.subject}\n\n${emailContent.body}`;
            navigator.clipboard.writeText(fullEmail).then(function() {
                showMessage('success', 'Email content copied to clipboard! You can now paste it into any email client.');
                closeModal();
                form.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }).catch(function() {
                showMessage('error', 'Could not copy to clipboard. Please try the "Open Email Client" option instead.');
            });
        });
        
        document.getElementById('showEmailDetails').addEventListener('click', function() {
            const detailsDiv = document.createElement('div');
            detailsDiv.style.cssText = `
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 5px;
                text-align: left;
                margin-top: 20px;
                font-family: monospace;
                font-size: 14px;
                white-space: pre-wrap;
                max-height: 300px;
                overflow-y: auto;
            `;
            detailsDiv.textContent = `To: ${emailContent.to}\nSubject: ${emailContent.subject}\n\n${emailContent.body}`;
            
            modalContent.appendChild(detailsDiv);
            this.style.display = 'none';
        });
        
        document.getElementById('closeModal').addEventListener('click', function() {
            closeModal();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
        
        function closeModal() {
            document.body.removeChild(modal);
        }
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
