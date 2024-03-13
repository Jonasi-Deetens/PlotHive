import mongoose from "mongoose";
import ContributionModel from "../../Models/Contribution.js";
import BookModel from "../../Models/Book.js";

async function addRandomContributions() {
  try {
    // Connect to the database
    const uri =
      "mongodb+srv://kilianboute:2pjgXtDgjJnDS8bB@plothive-development-cl.q5wnh4g.mongodb.net/Plothive?retryWrites=true&w=majority&appName=plothive-development-cluster";
    await mongoose.connect(uri);
  } catch (error) {
    console.error("Error adding data:", error);
  } finally {
    // Close the connection after adding contributions
    mongoose.connection.close();
  }
}

addRandomContributions();
