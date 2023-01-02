import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../model/postMessage";
import PostMessage from "../model/postMessage";

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
    console.log("post from backend", post);
  } catch (error) {
    console.log("eeee", error);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  const { page } = req.query;
  try {
    const Limit = 6;
    const startIndex = (Number(page) - 1) * Limit;
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(Limit)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / Limit),
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
export const getPostsBySearch = async (req: Request, res: Response) => {
  const { searchQuery, tags } = req.query;
  try {
    const title: any = new RegExp(searchQuery as string, "i");
    const posts = await PostMessage.find({
      $or: [{ title }],
    });
    // , { tags: { $in: tags?.toString().split(",") } }
    res.json({ data: posts });
    console.log("postfromBackend", posts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req: Request, res: Response) => {
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    const newPost = await new PostMessage(newPostMessage).save();

    res.status(201).json(newPost);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const deletePost = async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);
  try {
    const deletedPost = await PostMessage.findByIdAndDelete(_id);
    res.status(200).json(deletedPost);
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};
export const likePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  let post: any = await PostMessage.findById(id);

  const index: any = post?.likes.findIndex(
    (id: any) => id === String(req.userId)
  );

  if (index === -1) {
    post?.likes.push(req.userId);
  } else {
    post.likes = post?.likes.filter((id: any) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export const commentPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { value } = req.body;
  try {
    const post: any = await PostMessage.findById(id);
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export default {
  createPosts,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  commentPost,
};
