import mongoose from 'mongoose';

const snapshotSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalAssets: { type: Number, required: true },
  totalLiabilities: { type: Number, required: true },
  netWorth: { type: Number, required: true },
  savingsRate: { type: Number, default: 0 },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
});

const Snapshot= mongoose.model('Snapshot', snapshotSchema);
export default Snapshot;