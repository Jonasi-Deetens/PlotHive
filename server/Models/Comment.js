import mongoose from "mongoose";

// Define schema for Comments collection
const commentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        primaryKey: true
    },
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel;