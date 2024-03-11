// routes/contributionRoutes.js

import express from "express";
import ContributionModel from "../Models/Contribution.js";

const router = express.Router();

// Route to fetch all contributions
router.get("/contributions", async (req, res) => {
  try {
    // Fetch all contributions from the database
    const contributions = await ContributionModel.find();

    // Respond with the fetched contributions
    res.status(200).json(contributions);
  } catch (error) {
    // Handle errors
    console.error("Error fetching contributions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
