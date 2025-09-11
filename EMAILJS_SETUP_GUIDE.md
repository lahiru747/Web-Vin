# EmailJS Setup Guide for PSA Protection Systems

## Overview
This guide will help you set up EmailJS to send emails directly from your client-side website without needing any backend server or SMTP configuration.

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook**
   - **Yahoo**
   - **Custom SMTP**
4. Follow the setup instructions for your chosen provider
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

### Template ID: `template_psa_contact`

**Subject:** PSA Protection Systems - Contact Form: {{subject}}

**Content:**
```
New Contact Form Submission
Protection Systems Australia

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}
Message: {{message}}

Submitted: {{submission_date}}

This email was sent from the PSA Protection Systems contact form.
Reply directly to this email to respond to the customer.
```

4. Save the template and note the **Template ID**

## Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `user_abc123def456`)

## Step 5: Update Configuration
1. Open `assets/js/emailjs-config.js`
2. Update the configuration:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'your_service_id_here',     // From Step 2
    templateId: 'template_psa_contact',    // From Step 3
    publicKey: 'your_public_key_here'      // From Step 4
};
```

## Step 6: Test the Setup
1. Upload your files to your web server
2. Open the contact form on your website
3. Fill out and submit a test message
4. Check the recipient email inbox

## Step 7: Update Email Address
1. In `assets/js/emailjs-config.js`
2. Change the test email address:
```javascript
to_email: 'admin@psaprotections.com.au', // Production email
```

## Benefits of EmailJS
- ✅ **No backend server required**
- ✅ **No SMTP configuration needed**
- ✅ **Free tier available** (200 emails/month)
- ✅ **Works with any hosting provider**
- ✅ **Client-side only solution**
- ✅ **Professional email templates**
- ✅ **Reliable delivery**

## Troubleshooting
- **Emails not sending:** Check browser console for errors
- **Template not found:** Verify template ID is correct
- **Service not found:** Verify service ID is correct
- **Public key error:** Verify public key is correct

## Security Notes
- EmailJS public key is safe to expose in client-side code
- No sensitive credentials are stored in your website files
- EmailJS handles all the backend email processing

## Support
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)
