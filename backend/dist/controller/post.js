"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentPost = exports.likePost = exports.deletePost = exports.updatePost = exports.createPosts = exports.getPostsBySearch = exports.getPosts = exports.getPost = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postMessage_1 = __importDefault(require("../model/postMessage"));
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get a single post
    const { id } = req.params;
    try {
        const post = yield postMessage_1.default.findById(id);
        res.status(200).json(post);
        console.log("post from backend", post);
    }
    catch (error) {
        console.log("eeee", error);
    }
});
exports.getPost = getPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    try {
        const Limit = 6;
        const startIndex = (Number(page) - 1) * Limit;
        const total = yield postMessage_1.default.countDocuments({});
        const posts = yield postMessage_1.default.find()
            .sort({ _id: -1 })
            .limit(Limit)
            .skip(startIndex);
        res.status(200).json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / Limit),
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getPosts = getPosts;
const getPostsBySearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        const posts = yield postMessage_1.default.find({
            $or: [{ title }],
        });
        // , { tags: { $in: tags?.toString().split(",") } }
        res.json({ data: posts });
        console.log("postfromBackend", posts);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getPostsBySearch = getPostsBySearch;
const createPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.body;
    const newPostMessage = new postMessage_1.default(Object.assign(Object.assign({}, post), { creator: req.userId, createdAt: new Date().toISOString() }));
    try {
        const newPost = yield new postMessage_1.default(newPostMessage).save();
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
});
exports.createPosts = createPosts;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No post with id: ${_id}`);
    try {
        const updatedPost = yield postMessage_1.default.findByIdAndUpdate(_id, Object.assign(Object.assign({}, post), { _id }), { new: true });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No post with id: ${_id}`);
    try {
        const deletedPost = yield postMessage_1.default.findByIdAndDelete(_id);
        res.status(200).json(deletedPost);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deletePost = deletePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId)
        return res.json({ message: "Unauthenticated" });
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
    let post = yield postMessage_1.default.findById(id);
    const index = post === null || post === void 0 ? void 0 : post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        post === null || post === void 0 ? void 0 : post.likes.push(req.userId);
    }
    else {
        post.likes = post === null || post === void 0 ? void 0 : post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = yield postMessage_1.default.findByIdAndUpdate(id, post, {
        new: true,
    });
    res.status(200).json(updatedPost);
});
exports.likePost = likePost;
const commentPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { value } = req.body;
    try {
        const post = yield postMessage_1.default.findById(id);
        post.comments.push(value);
        const updatedPost = yield postMessage_1.default.findByIdAndUpdate(id, post, {
            new: true,
        });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.commentPost = commentPost;
exports.default = {
    createPosts: exports.createPosts,
    getPosts: exports.getPosts,
    updatePost: exports.updatePost,
    deletePost: exports.deletePost,
    likePost: exports.likePost,
    commentPost: exports.commentPost,
};
