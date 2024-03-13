import mongoose from "mongoose";
import ContributionModel from "../../Models/Contribution.js";
import BookModel from "../../Models/Book.js";

async function addRandomContributions() {
  try {
    // Connect to the database
    const uri =
      "mongodb+srv://kilianboute:2pjgXtDgjJnDS8bB@plothive-development-cl.q5wnh4g.mongodb.net/Plothive?retryWrites=true&w=majority&appName=plothive-development-cluster";
    await mongoose.connect(uri);

    // Specific user ids
    const userIds = [
      "65f18cca703f62991757d0c1",
      "65f18ccb703f62991757d0c4",
      "65f18ccb703f62991757d0c6",
    ];

    // Find the book with the specified _id
    const book2 = await BookModel.findOne({ _id: "65f18ccb703f62991757d0ee" });

    if (book2) {
      for (let i = 0; i < userIds.length; i++) {
        const contribution = new ContributionModel({
          _id: new mongoose.Types.ObjectId(),
          text: `Additional Contribution ${i + 1} for Book 2`,
          user_id: new mongoose.Types.ObjectId(userIds[i]), // Corrected to use new
        });
        book2.contributions.push(contribution._id);
        await contribution.save();
      }
      await book2.save();
    }
  } catch (error) {
    console.error("Error adding data:", error);
  } finally {
    // Close the connection after adding contributions
    mongoose.connection.close();
  }
}

// Call the function to add random contributions
addRandomContributions();
