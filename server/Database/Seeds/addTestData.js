import mongoose from "mongoose";
import ContributionModel from "../../Models/Contribution.js";

// Connect to the database
const uri =
  "mongodb+srv://kilianboute:2pjgXtDgjJnDS8bB@plothive-development-cl.q5wnh4g.mongodb.net/Plothive?retryWrites=true&w=majority&appName=plothive-development-cluster";

mongoose.connect(uri);
console.log(uri);
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Create a new contribution
const newContribution = new ContributionModel({
  _id: new mongoose.Types.ObjectId(),
  text: "Example contribution",
  user_id: new mongoose.Types.ObjectId(), // Assuming you have a user ID
  date_added: new Date(),
  upvote_count: 0,
  comments: [], // Assuming comments is an array of Comment IDs
});

// Save the contribution to the database
newContribution
  .save()
  .then(() => {
    console.log("Contribution added successfully");
    mongoose.connection.close(); // Close the connection after adding the contribution
  })
  .catch((error) => {
    console.error("Error adding contribution:", error);
    mongoose.connection.close(); // Close the connection in case of an error
  });
