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

    static async addFavoriteContributionsToBooks () {
        try {
            const books = await BookModel.find({
                'finished': false
            }).populate('contributions');
            console.log('BOOKS...');
            console.log(books)

            const updatedBooks = books.map(book => {
                const today = new Date().toISOString().slice(0, 10);
                const contributionsToday = book.contributions.filter(contribution => contribution.created_at.toISOString().slice(0, 10) === today);
                console.log('CONTRIBUTION OF TODAY...');
                console.log(contributionsToday)

                let mostUpvotedContribution = null;
                let maxUpvotes = 0;

                contributionsToday.forEach(contribution => {
                    if (contribution.upvoters.length > maxUpvotes) {
                        mostUpvotedContribution = contribution;
                        maxUpvotes = contribution.upvotes;
                    }
                });
        
                if (mostUpvotedContribution) {
                    console.log('MOST UPVOTED...');
                    console.log(mostUpvotedContribution)
                    book.sections.push(mostUpvotedContribution._id);
                }
        
                return book;
            });

            for (const updatedBook of updatedBooks) {
                console.log("saving...")
                await updatedBook.save();
            }

        } catch (err) {
            console.log(err.message);
        }
    }

}

export default BookController