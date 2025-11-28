import { Router } from "express";

import {
  acceptRequest,
  getFriendreqs,
  getFriends,
  getReccomendedUser,
  getSentReqs,
  sendRequest,
} from "../controllers/friendReqControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/recommendedFriends", protectRoute, getReccomendedUser);
router.get("/", protectRoute, getFriends);
router.post("/sendreq/:id", protectRoute, sendRequest);
router.put("/acceptreq/:id", protectRoute, acceptRequest);
router.get("/recivedreq", protectRoute, getFriendreqs);
router.get("/sentreq", protectRoute, getSentReqs);

export default router;
