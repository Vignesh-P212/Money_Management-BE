import express from "express";
import cors from "cors";
import connectDB from './src/config/db.js';
import dotenv from "dotenv";
import authRoutes from'./routes/authRoutes';
import assetRoutes from'./routes/assetRoutes';
import liabilityRoutes from'./routes/liabilityRoutes';
import transactionRoutes from'./routes/transactionRoutes';
import goalRoutes from'./routes/goalRoutes';
import insightRoutes from'./routes/insightRoutes';




const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/liabilities', liabilityRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/insights', insightRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Finance API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
