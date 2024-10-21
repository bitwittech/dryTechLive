require("dotenv").config();
const nodemailer = require("nodemailer");

// Controller to handle email sending
const sendEmail = async (req, res) => {
  const { email, name, contact, company } = req.body; // Removed 'subject' from destructuring
  const html = `
  <h2>Name : ${name} </h2>
  <h2>Email : ${email} </h2>
  <h2>Contact : ${contact} </h2>
  <h2>Company : ${company} </h2>
  `;

  const subject = "Request to download brochure."; // Define 'subject' here

  try {
    const response = await sendMail(
      email, // This will be placed in the CC
      subject,
      "Request to download brochures.",
      html
    );
    console.log("Email sent successfully to ", email);
    res.status(200).json({ message: "Email sent successfully", response });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error: error.message });
  }
};

// Reusable sendMail function
const sendMail = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",   // Outlook SMTP server
      port: 587,                    // Secure SMTP port
      secure: false,     
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,   // The sender email (yours)
      to: process.env.EMAIL_USER,     // Send to yourself (main recipient)
      cc: to,                         // Place the recipient's email in CC
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log(">>>>",info)
    return info.response;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail };
