import { Router } from "express";

import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
} from "../controllers/postControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", protectRoute, createPost);
router.get("/", protectRoute, getAllPost);
router.get("/:id", protectRoute, getPost);
router.put("/:id", protectRoute, updatePost);
router.delete("/:id", protectRoute, deletePost);

export default router;
