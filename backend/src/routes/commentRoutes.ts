import { Router } from "express";

import {
  addComment,
  deleteComment,
} from "../controllers/commentControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/:id", protectRoute, addComment);
router.delete("/:id", protectRoute, deleteComment);

export default router;
