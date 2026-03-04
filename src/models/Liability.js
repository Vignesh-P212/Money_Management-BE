import mongoose from 'mongoose';

const liabilitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['loan', 'creditcard', 'emi'], required: true },
  amount: { type: Number, required: true },
  interestRate: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Liability = mongoose.model('Liability', liabilitySchema);
export default Liability;