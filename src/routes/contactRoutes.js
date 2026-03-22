// routes/contact.js
import express from "express";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/contact
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

  try {
    // ✅ Email 1: Notify YOU
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // safe default sender
      to: process.env.EMAIL_USER,
      reply_to: email, // allows direct reply
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p>${message}</p>
        </div>
      `,
    });

    // ✅ Email 2: Auto-reply to user
    await resend.emails.send({
      from: "Vignesh P <onboarding@resend.dev>",
      to: email,
      subject: "Got your message — Vignesh P",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out. I’ve received your message and will get back to you within 24 hours.</p>
        <br/>
        <p>— Vignesh</p>
      `,
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