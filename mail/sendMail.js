// sendMail.js
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
      email,
      subject,
      (text = "Request to download brochures."),
      html
    ); // Pass 'subject' correctly
    console.log("Email sent successfully on ",email)
    res.status(200).json({ message: "Email sent successfully", response });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
};

// Reusable sendMail function
const sendMail = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail };
