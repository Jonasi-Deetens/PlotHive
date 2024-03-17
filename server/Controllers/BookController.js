import BookModel from "../Models/Book.js"
import PromptModel from "../Models/Prompt.js";
import mongoose from "mongoose";

class BookController {

    static async createBook () {
        try {
            const prompts = await PromptModel.find();
            const index = Math.round(Math.random() * prompts.length);

            const newBook = new BookModel({
                _id: new mongoose.Types.ObjectId(),
                title: "Untitled",
                prompt_id: prompts[index]._id,
                contributions: [],
                genres: [],
                created_at: Date.now()
            });
            
            const savedBook = await newBook.save();
            console.log('Book saved successfully:', savedBook);
        } catch (err) {
            console.log(err.message);
        }
    }

}

export default BookController