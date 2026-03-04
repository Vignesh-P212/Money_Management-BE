const Liability = require('../models/Liability');

const getLiabilities = async (req, res) => {
  try {
    const liabilities = await Liability.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(liabilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLiability = async (req, res) => {
  try {
    const liability = await Liability.create({ ...req.body, user: req.user._id });
    res.status(201).json(liability);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLiability = async (req, res) => {
  try {
    const liability = await Liability.findOne({ _id: req.params.id, user: req.user._id });
    if (!liability) return res.status(404).json({ message: 'Liability not found' });
    Object.assign(liability, req.body);
    await liability.save();
    res.json(liability);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLiability = async (req, res) => {
  try {
    const liability = await Liability.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!liability) return res.status(404).json({ message: 'Liability not found' });
    res.json({ message: 'Liability removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLiabilities, createLiability, updateLiability, deleteLiability };
