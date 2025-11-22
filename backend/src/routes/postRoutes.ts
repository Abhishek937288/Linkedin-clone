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

router.post("/createpost", protectRoute, createPost);
router.get("/allposts", protectRoute, getAllPost);
router.get("/getpost/:id", protectRoute, getPost);
router.put("/updatepost/:id", protectRoute, updatePost);
router.delete("/deletepost/:id", protectRoute, deletePost);

export default router;
