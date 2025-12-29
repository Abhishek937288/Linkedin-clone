import { Router } from "express";

import { getProfileData, getUserData, updateUser } from "../controllers/userControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = Router();

router.put("/updateuser", protectRoute, updateUser);
router.get("/",protectRoute, getUserData);
router.get("/profile/:id" , protectRoute , getProfileData);

export default router;
