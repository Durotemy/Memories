import express from "express";
import {
  createPosts,
  getPosts,
  updatePost,
  deletePost,
  likePost,
} from "../controller/post";
import { Auth } from "../middleware/protect";

const router = express.Router();
router.post("/createPost", Auth, createPosts);
router.get("/", getPosts);
router.patch("/:id", Auth, updatePost);
router.delete("/:id", Auth, deletePost);
router.patch("/:id/likePost", Auth, likePost);

export default router;
