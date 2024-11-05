require("dotenv").config();
const nodemailer = require("nodemailer");

// Controller to handle email sending
const sendEmail = async (req, res) => {
  let { email, name, contact, company, type, comment, state } = req.body;
  console.log(req.body);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
      <h1 style="text-align: center; color: #333;">Contact Information</h1>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr style="background-color: #1D94D2; color: white;">
          <th style="padding: 10px;">Field</th>
          <th style="padding: 10px;">Details</th>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">Name</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">Email</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
        </tr>
        ${
          state
            ? `<tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">State</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${state}</td>
        </tr>`
            : ``
        }
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">Contact</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${contact}</td>
        </tr>
    ${
          comment
            ? `<tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">Comment</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${comment}</td>
        </tr>`
            : ``
        }
    ${
          company
            ? `<tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">Company</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${company}</td>
        </tr>`
            : ``
        }
      </table>
    </div>
  `;

  // Subject based on 'type'
  const subject =
    type === "contact"
      ? "Contact for enquiry"
      : "Request to download brochures";

  try {
    // Send email
    const response = await sendMail(
      email, // Placed in the CC
      subject,
      html
    );

    console.log("Email sent successfully to ", email);
    return res
      .status(200)
      .json({ message: "Email sent successfully", response });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

// Reusable sendMail function
const sendMail = async (to, subject, html) => {
  try {
    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com", // Outlook SMTP server
      port: 587, // Secure SMTP port
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to: process.env.EMAIL_USER, // Sending email to yourself
      // cc: to, // Recipient in CC
      subject: subject,
      html: html,
    };

    // Sending mail
    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (error) {
    throw error; // Propagate error to calling function
  }
};

module.exports = { sendEmail };
