import express from "express";

import registerUser from "../controllers/auth/registerUser.js";
import loginUser from "../controllers/auth/loginUser.js";
import refreshAccessToken from "../controllers/auth/refreshAccessToken.js";
import logoutUser from "../controllers/auth/logoutUser.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

export default router;