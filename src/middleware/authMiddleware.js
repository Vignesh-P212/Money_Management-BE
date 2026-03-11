import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {

    const token = req.cookies?.auth_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token."
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User
      .findById(decoded.id)
      .select("-password -refreshToken");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found."
      });
    }

    req.user = user;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
      error: error.message
    });

  }
};

export default protect;