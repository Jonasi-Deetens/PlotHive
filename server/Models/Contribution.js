import mongoose from "mongoose";

// Define schema for Contributions collection
const contributionSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        primaryKey: true
    },
    text: {
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
    },
    upvote_count: {
        type: Number,
        min: 0,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const ContributionModel = mongoose.model('Contribution', contributionSchema);

export default ContributionModel;