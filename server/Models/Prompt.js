import mongoose from 'mongoose';

// Define schema for Prompts collection
const promptSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        primaryKey: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
});

const PromptModel = mongoose.model('Prompt', promptSchema);

export default PromptModel;