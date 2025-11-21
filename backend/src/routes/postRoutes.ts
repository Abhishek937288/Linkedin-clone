import { Router } from "express";

import { createPost, getAllPost } from "../controllers/postControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/createpost", protectRoute, createPost);
router.get("/allposts", protectRoute, getAllPost);

export default router;
