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
    }
});

const PromptModel = mongoose.model('Prompt', promptSchema);

export default PromptModel;