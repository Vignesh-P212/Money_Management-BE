import Asset from '../models/Asset.js';

const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAsset = async (req, res) => {
  try {
    const asset = await Asset.create({ ...req.body, user: req.user._id });
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findOne({ _id: req.params.id, user: req.user._id });
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    Object.assign(asset, req.body);
    await asset.save();
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.json({ message: 'Asset removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAssets, createAsset, updateAsset, deleteAsset };
