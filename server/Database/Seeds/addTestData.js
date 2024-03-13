import mongoose from "mongoose";
import ContributionModel from "../../Models/Contribution.js";
import UserModel from "../../Models/User.js";
import BookModel from "../../Models/Book.js";

async function seedDatabase() {
  try {
    // Connect to the database
    const uri =
      "mongodb+srv://kilianboute:2pjgXtDgjJnDS8bB@plothive-development-cl.q5wnh4g.mongodb.net/Plothive?retryWrites=true&w=majority&appName=plothive-development-cluster";
    await mongoose.connect(uri);

    // Create example users
    const user1 = await UserModel.create({
      _id: new mongoose.Types.ObjectId(),
      username: "user1",
      password: "password1",
      email: "user1@example.com",
    });
    const user2 = await UserModel.create({
      _id: new mongoose.Types.ObjectId(),
      username: "user2",
      password: "password2",
      email: "user2@example.com",
    });
    const user3 = await UserModel.create({
      _id: new mongoose.Types.ObjectId(),
      username: "user3",
      password: "password3",
      email: "user3@example.com",
    });

    // Create example books
    const book1 = await BookModel.create({
      _id: new mongoose.Types.ObjectId(),
      title: "Book 1",
      prompt_id: new mongoose.Types.ObjectId(),
    });
    const book2 = await BookModel.create({
      _id: new mongoose.Types.ObjectId(),
      title: "Book 2",
      prompt_id: new mongoose.Types.ObjectId(),
    });
    const book3 = await BookModel.create({
      _id: new mongoose.Types.ObjectId(),
      title: "Book 3",
      prompt_id: new mongoose.Types.ObjectId(),
    });
    const book4 = await BookModel.create({
      _id: new mongoose.Types.ObjectId(),
      title: "Book 4",
      prompt_id: new mongoose.Types.ObjectId(),
    });

    // Create example contributions linked to users and books
    const contributions = [];
    for (let i = 0; i < 5; i++) {
      contributions.push({
        _id: new mongoose.Types.ObjectId(),
        text: `Example contribution ${i + 1} for Book 1`,
        user_id: user1._id,
        book_id: book1._id,
      });
      contributions.push({
        _id: new mongoose.Types.ObjectId(),
        text: `Example contribution ${i + 1} for Book 2`,
        user_id: user2._id,
        book_id: book2._id,
      });
      contributions.push({
        _id: new mongoose.Types.ObjectId(),
        text: `Example contribution ${i + 1} for Book 3`,
        user_id: user3._id,
        book_id: book3._id,
      });
      contributions.push({
        _id: new mongoose.Types.ObjectId(),
        text: `Example contribution ${i + 1} for Book 4`,
        user_id: user1._id,
        book_id: book4._id,
      });
    }

    // Insert contributions into the database
    await ContributionModel.insertMany(contributions);

    console.log("Contributions added successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection after seeding the database
    mongoose.connection.close();
  }
}

seedDatabase();
