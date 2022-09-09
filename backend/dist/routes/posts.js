"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = require("../controller/post");
const protect_1 = require("../middleware/protect");
const router = express_1.default.Router();
router.post("/createPost", protect_1.Auth, post_1.createPosts);
router.get("/", post_1.getPosts);
router.patch("/:id", protect_1.Auth, post_1.updatePost);
router.delete("/:id", protect_1.Auth, post_1.deletePost);
router.patch("/:id/likePost", protect_1.Auth, post_1.likePost);
exports.default = router;
