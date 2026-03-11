import User from "../../models/User.js";
import generateToken from "../../middleware/generateToken.js";

const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (![name, email, password].every(field => field && field.trim() !== "")) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required."
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email."
      });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    // set cookie
    generateToken(res, newUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message
    });

  }
};

export default registerUser;