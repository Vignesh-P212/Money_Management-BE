import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import generateToken from "../../middleware/generateToken.js";

const refreshAccessToken = async (req, res) => {
  try {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided."
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token."
      });
    }

    generateToken(res, user._id);

    const newRefreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully."
    });

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Invalid refresh token.",
      error: error.message
    });

  }
};

export default refreshAccessToken;