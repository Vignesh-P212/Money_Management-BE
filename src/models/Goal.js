import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Goal=  mongoose.model('Goal', goalSchema);
export default Goal