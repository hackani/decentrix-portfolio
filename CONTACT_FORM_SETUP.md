# Contact Form Setup

This guide explains how to set up the contact form to send emails using Gmail.

## Prerequisites

- Gmail account
- App password for your Gmail account (not your regular Gmail password)

## Setting Up Gmail App Password

If you're using Gmail to send emails, you'll need to set up an app password:

1. Go to your Google Account at [https://myaccount.google.com/](https://myaccount.google.com/)
2. Navigate to Security
3. Under "Signing in to Google," select "2-Step Verification" and enable it if not already enabled
4. After enabling 2-Step Verification, go back to the Security page
5. Under "Signing in to Google," select "App passwords"
6. Select "Mail" as the app and "Other" as the device
7. Enter a name (e.g., "Webverse Contact Form")
8. Click "Generate"
9. Google will display a 16-character app password - copy this password

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=kanishkchaudhary2005@gmail.com
```

Replace:
- `your-gmail-address@gmail.com` with your Gmail address
- `your-app-password` with the app password you generated

## How It Works

1. When a visitor submits the contact form, the data is sent to the `/api/contact` API route
2. The API route uses Nodemailer with your Gmail credentials to send an email
3. The email is sent from your Gmail account to the specified recipient email
4. A success message is shown to the visitor

## Troubleshooting

If emails are not being sent:

1. Check console logs for any errors
2. Verify that your app password is correct
3. Make sure your Gmail account doesn't have additional security restrictions
4. Try using a different email service if Gmail continues to block the application

## Security Considerations

- Never commit your `.env.local` file to version control
- Consider using environment variables in your production deployment platform
- Keep your app password secure and rotate it periodically 