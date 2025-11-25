import { Router } from "express";

import { addLike, removeLike } from "../controllers/likeController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/:id", protectRoute, addLike);
router.delete("/:id", protectRoute,removeLike);

export default router;
