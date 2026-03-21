import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import assetRoutes from "./src/routes/assetRoutes.js";
import liabilityRoutes from "./src/routes/liabilityRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import goalRoutes from "./src/routes/goalRoutes.js";
import insightRoutes from "./src/routes/insightRoutes.js";
import contactRoute from "./src/routes/contactRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



// Security Middleware
app.use(helmet());
// const corsOptions = {
//   origin: "https://money-management-fe.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// };

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // allow preflight
app.use(cookieParser());



// Rate Limit (Login Protection)
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many login attempts. Please try again later."
});

app.use("/api/auth", loginLimiter);



// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/liabilities", liabilityRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/insights", insightRoutes);
app.use("/api/contact", contactRoute);


//Health Check
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

//Default Route 
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Money Management API is running"
  });
});

//Server Start
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

export default app;