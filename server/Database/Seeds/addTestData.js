import mongoose from "mongoose";
import UserModel from "../../Models/User.js";
import PromptModel from "../../Models/Prompt.js";
import GenreModel from "../../Models/Genre.js";
import CommentModel from "../../Models/Comment.js";
import ContributionModel from "../../Models/Contribution.js";
import BookModel from "../../Models/Book.js";

async function seedDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://kilianboute:2pjgXtDgjJnDS8bB@plothive-development-cl.q5wnh4g.mongodb.net/Plothive?retryWrites=true&w=majority&appName=plothive-development-cluster",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Seed Users
    const users = [];
    for (let i = 0; i < getRandomInt(2, 5); i++) {
      const user = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        username: `user${i}`,
        password: `password${i}`,
        email: `user${i}@example.com`,
      });
      users.push(user);
      await user.save();
    }

    // Seed Prompts
    const prompts = [];
    for (let i = 0; i < getRandomInt(2, 5); i++) {
      const prompt = new PromptModel({
        _id: new mongoose.Types.ObjectId(),
        content: `Prompt ${i}`,
      });
      prompts.push(prompt);
      await prompt.save();
    }

    // Seed Genres
    const genres = [];
    for (let i = 0; i < getRandomInt(2, 5); i++) {
      const genre = new GenreModel({
        _id: new mongoose.Types.ObjectId(),
        title: `Genre ${i}`,
      });
      genres.push(genre);
      await genre.save();
    }

    // Seed Comments
    const comments = [];
    for (let i = 0; i < getRandomInt(2, 5); i++) {
      const comment = new CommentModel({
        _id: new mongoose.Types.ObjectId(),
        content: `Comment ${i}`,
        user_id: users[getRandomInt(0, users.length - 1)]._id,
      });
      comments.push(comment);
      await comment.save();
    }

    // Seed Contributions
    const contributions = [];
    for (let i = 0; i < getRandomInt(2, 5); i++) {
      const contribution = new ContributionModel({
        _id: new mongoose.Types.ObjectId(),
        text: `Contribution ${i}`,
        user_id: users[getRandomInt(0, users.length - 1)]._id,
      });
      contribution.comments.push(
        comments[getRandomInt(0, comments.length - 1)]._id
      );
      contributions.push(contribution);
      await contribution.save();
    }

    // Seed Books
    const books = [];
    for (let i = 0; i < getRandomInt(2, 5); i++) {
      const book = new BookModel({
        _id: new mongoose.Types.ObjectId(),
        title: `Book ${i}`,
        prompt_id: prompts[getRandomInt(0, prompts.length - 1)]._id,
      });
      book.contributions.push(
        contributions[getRandomInt(0, contributions.length - 1)]._id
      );
      book.genres.push(genres[getRandomInt(0, genres.length - 1)]._id);
      books.push(book);
      await book.save();
    }

    console.log("Database seeded successfully.");

    // Disconnect from the database after seeding
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Call the seedDatabase function to start seeding
seedDatabase();
