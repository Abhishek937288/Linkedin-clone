import { Router } from "express";

import { getUserData, updateUser } from "../controllers/userControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = Router();

router.put("/updateuser", protectRoute, updateUser);
router.get("/",protectRoute, getUserData);

export default router;
