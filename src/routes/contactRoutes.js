// routes/contact.js
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
const router = express.Router();

// POST /api/contact
dotenv.config();
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  // Nodemailer transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Email 1: Notify you
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `<p><strong>${name}</strong> (${email}) sent a message:</p><p>${message}</p>`,
    });

    // Email 2: Auto-reply
    await transporter.sendMail({
      from: `"Vignesh P" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Got your message — Vignesh P`,
      html: `<p>Hi ${name},</p><p>Thanks for reaching out. I’ll get back to you within 24 hours.</p>`,
    });

    return res.status(200).json({ message: "Message sent successfully." });
  } catch (err) {
    console.error("Mail error:", err);
    return res
      .status(500)
      .json({ message: "Failed to send email. Please try again later." });
  }
});

export default router;