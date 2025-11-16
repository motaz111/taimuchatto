import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

// Rute untuk memperbarui profil pengguna
router.put("/update/profile", protectRoute, updateProfile);

export default router;
