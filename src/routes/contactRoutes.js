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

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  try {
    // ✅ Send ONLY to YOU
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.EMAIL_USER, // MUST be your Resend email
      reply_to: email, // so you can reply to user
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

    return res.status(200).json({ message: "Message sent successfully." });

  } catch (err) {
    console.error("Mail error:", err);
    return res.status(500).json({
      message: "Failed to send email. Please try again later.",
    });
  }
});

export default router;
