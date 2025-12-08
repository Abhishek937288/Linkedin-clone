import { Router } from "express";

import { getMessagesBetween } from "../controllers/messageControlller.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/:id", protectRoute, getMessagesBetween);

export default router;
