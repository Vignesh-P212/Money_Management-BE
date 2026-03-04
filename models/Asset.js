const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['cash', 'bank', 'stock', 'realestate', 'crypto', 'gold'], required: true },
  value: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Asset', assetSchema);
