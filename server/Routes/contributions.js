import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import ContributionModel from "../Models/Contribution.js";
import { wss } from "../server.js";

// Create a new item
router.post("/", async (req, res) => {
  try {
    const newContribution = new ContributionModel({
      _id: new mongoose.Types.ObjectId(),
      text: req.body.text,
      user_id: req.body.user_id,
      upvoters: [],
      comments: req.body.comments,
    });

    const savedContribution = await newContribution.save();
    console.log("Contribution saved successfully:", savedContribution);
    res.status(201).json(savedContribution);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all items
router.get("/", async (req, res) => {
  try {
    const contributions = await ContributionModel.find()
      .populate("user_id")
      .populate("comments");
    res.json(contributions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single item
router.get("/:id", getContribution, (req, res) => {
  res.json(res.contribution);
});

// Update an item
router.patch("/:id", getContribution, async (req, res) => {
  if (req.body.text != null) {
    res.contribution.text = req.body.text;
  }
  if (req.body.user_id != null) {
    res.contribution.user_id = req.body.user_id;
  }
  if (req.body.upvoters != null) {
    res.contribution.upvoters = req.body.upvoters;
  }
  if (req.body.comments != null) {
    res.contribution.comments = req.body.comments;
  }
  try {
    const updatedContribution = await res.contribution.save();
    wss.clients.forEach((client) => {
      if (client._readyState === client.OPEN) {
        console.log("message sent");
        client.send(JSON.stringify({ event: "bookUpdate" }));
      }
    });
    res.json(updatedContribution);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete("/:id", getContribution, async (req, res) => {
  try {
    console.log(res.contribution);
    await res.contribution.deleteOne();
    res.json({ message: "Deleted contribution" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getContribution(req, res, next) {
  let contribution;
  try {
    contribution = await ContributionModel.findById(req.params.id);
    if (contribution == null) {
      return res.status(404).json({ message: "Contribution not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.contribution = contribution;
  next();
}

export default router;
