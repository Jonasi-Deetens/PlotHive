import mongoose from "mongoose";

// Define schema for Books collection
const bookSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        primaryKey: true
    },
    title: {
        type: String,
        required: true
    },
    prompt_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Prompt'
    },
    contributions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contribution'
    }],
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    finished: {
        type: Boolean,
        required: true,
        default: false
    }
});

// Create and export the model based on the schema
const BookModel = mongoose.model('Book', bookSchema);

export default BookModel;