# 📧 Direct Email Sending Setup Guide

This guide will help you set up direct email sending for your contact forms using free email APIs.

## 🚀 Option 1: EmailJS (Recommended)

EmailJS is a free service that allows you to send emails directly from your website without a backend server.

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - **Outlook**
   - **Yahoo**
   - **Custom SMTP**
4. Follow the setup instructions for your chosen provider
5. Note down your **Service ID** (e.g., `service_xxxxxx`)

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: PSA Protection Systems - Contact Form: {{subject}}

From: {{from_name}} <{{from_email}}>
To: lahiru747@yahoo.com

Dear PSA Protection Systems Team,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the PSA Protection Systems website.
```

4. Save the template and note down your **Template ID** (e.g., `template_xxxxxx`)

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (e.g., `user_xxxxxx`)

### Step 5: Update Configuration
1. Open `assets/js/contact-form-direct.js`
2. Replace these values:
   ```javascript
   const EMAILJS_SERVICE_ID = 'your_service_id_here';
   const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
   const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
   ```

### Step 6: Add EmailJS Script
Add this script to your HTML files before the contact form script:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

## 🔄 Option 2: Formspree (Alternative)

Formspree is another free service for handling form submissions.

### Step 1: Create Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create New Form
1. In your Formspree dashboard, click "New Form"
2. Enter your email address: `lahiru747@yahoo.com`
3. Choose form name: "PSA Contact Form"
4. Note down your **Form Endpoint** (e.g., `https://formspree.io/f/xpzgqkqk`)

### Step 3: Update Configuration
1. Open `assets/js/contact-form-direct.js`
2. Replace the Formspree endpoint:
   ```javascript
   const formspreeEndpoint = 'your_formspree_endpoint_here';
   ```

## 🎯 Option 3: Netlify Forms (If hosting on Netlify)

If you're hosting your website on Netlify, you can use their built-in form handling.

### Step 1: Add Netlify Attributes
Add these attributes to your form:
```html
<form id="contact" netlify netlify-honeypot="bot-field">
    <input type="hidden" name="bot-field" />
    <!-- rest of your form fields -->
</form>
```

### Step 2: Update JavaScript
The form will automatically submit to Netlify's servers.

## 📋 Quick Setup Checklist

### For EmailJS:
- [ ] Create EmailJS account
- [ ] Set up email service (Gmail/Outlook/Yahoo)
- [ ] Create email template
- [ ] Get Service ID, Template ID, and Public Key
- [ ] Update `contact-form-direct.js` with your credentials
- [ ] Add EmailJS script to HTML files

### For Formspree:
- [ ] Create Formspree account
- [ ] Create new form
- [ ] Get form endpoint
- [ ] Update `contact-form-direct.js` with your endpoint

## 🔧 Testing

1. Open your website
2. Fill out the contact form
3. Click "Send Message"
4. Check your email for the message
5. Verify the form shows success message

## 📊 Free Limits

### EmailJS:
- **Free Plan**: 200 emails/month
- **Paid Plans**: Start at $15/month for 1,000 emails

### Formspree:
- **Free Plan**: 50 submissions/month
- **Paid Plans**: Start at $10/month for 1,000 submissions

## 🚨 Important Notes

1. **Never expose sensitive credentials** in client-side code
2. **Use environment variables** for production
3. **Test thoroughly** before going live
4. **Monitor usage** to avoid hitting limits
5. **Have a backup plan** in case the service is down

## 🆘 Troubleshooting

### Common Issues:
1. **"EmailJS not loaded"** - Make sure you've added the EmailJS script
2. **"Service not found"** - Check your Service ID
3. **"Template not found"** - Check your Template ID
4. **"Invalid public key"** - Check your Public Key
5. **"Rate limit exceeded"** - You've hit the free limit

### Debug Mode:
Add this to your JavaScript to see detailed error messages:
```javascript
console.log('EmailJS Service ID:', EMAILJS_SERVICE_ID);
console.log('EmailJS Template ID:', EMAILJS_TEMPLATE_ID);
console.log('EmailJS Public Key:', EMAILJS_PUBLIC_KEY);
```

## 🎉 Success!

Once set up, your contact forms will send emails directly when users click "Send Message" - no more manual email client opening or clipboard copying needed!
