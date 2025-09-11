// EmailJS Configuration
// This will handle sending emails directly from the client-side

// EmailJS Service Configuration
const EMAILJS_CONFIG = {
    serviceId: 'service_psa_protection', // You'll need to create this in EmailJS
    templateId: 'template_psa_contact',  // You'll need to create this template
    publicKey: 'your_public_key_here'    // You'll get this from EmailJS
};

// Initialize EmailJS
(function() {
    // Load EmailJS script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = function() {
        // Initialize EmailJS
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized successfully');
    };
    document.head.appendChild(script);
})();

// Email sending function
async function sendEmail(formData) {
    try {
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject') || 'Contact Form Submission',
            message: formData.get('message'),
            to_email: 'lahiru747@yahoo.com', // Test email
            company_name: 'Protection Systems Australia',
            submission_date: new Date().toLocaleString()
        };

        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );

        return {
            success: true,
            message: 'Thank you for your message! We will get back to you soon.'
        };
    } catch (error) {
        console.error('EmailJS Error:', error);
        return {
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again later.'
        };
    }
}
