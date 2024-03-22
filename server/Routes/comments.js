import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import CommentModel from "../Models/Comment.js";

// Create a new item
router.post("/", async (req, res) => {
  try {
    const newComment = new CommentModel({
      _id: new mongoose.Types.ObjectId(),
      content: req.body.content,
      user_id: req.body.user_id,
    });

    const savedComment = await newComment.save();
    console.log("Comment saved successfully:", savedComment);
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all items
router.get("/", async (req, res) => {
  try {
    console.log("getting all comments");
    const comments = await CommentModel.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single item
router.get("/:id", getComment, (req, res) => {
  res.json(res.comment);
});

// Update an item
router.patch("/:id", getComment, async (req, res) => {
  if (req.body.content != null) {
    res.comment.content = req.body.content;
  }
  if (req.body.user_id != null) {
    res.comment.user_id = req.body.user_id;
  }
  try {
    const updatedComment = await res.comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete("/:id", getComment, async (req, res) => {
  try {
    console.log(res.comment);
    await res.comment.deleteOne();
    res.json({ message: "Deleted comment" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getComment(req, res, next) {
  let comment;
  try {
    comment = await CommentModel.findById(req.params.id);
    if (comment == null) {
      return res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.comment = comment;
  next();
}

export default router;
