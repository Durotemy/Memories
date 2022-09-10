import express, { Request, Response } from "express";
import mongoose from "mongoose";
import PostMessage from "../model/postMessage";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const postMessage = await PostMessage.find();

    res.status(200).json(postMessage);
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
    console.log("updatedPost", updatedPost);
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
    console.log("deletedPost", deletedPost);
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
export default { createPosts, getPosts, updatePost, deletePost, likePost };
