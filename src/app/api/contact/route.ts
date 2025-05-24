import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate form data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please fill in all the required fields.' },
        { status: 400 }
      );
    }

    // Create a transport for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // Use environment variables if available, otherwise use placeholders
        user: process.env.EMAIL_USER || 'kanishkchaudhary2005@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password', // You'll need to set this up
      },
    });

    // Email content
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_TO || 'kanishkchaudhary2005@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #3182ce;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Even if email fails, we'll return success to the user
      // but log the error on the server
    }

    return NextResponse.json({ 
      success: true,
      message: 'Form submitted successfully! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'An error occurred while sending your message.' },
      { status: 500 }
    );
  }
} 