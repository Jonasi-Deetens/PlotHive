import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import PromptModel from '../Models/Prompt.js';

// Create a new item
router.post('/', async (req, res) => {
    try {
        const newPrompt = new PromptModel({
            _id: new mongoose.Types.ObjectId(),
            content: req.body.content,
        });
        
        const savedPrompt = await newPrompt.save();
        console.log('Prompt saved successfully:', savedPrompt);
        res.status(201).json(savedPrompt);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all items
router.get('/', async (req, res) => {
    try {
        const prompts = await PromptModel.find();
        res.json(prompts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single item
router.get('/:id', getPrompt, (req, res) => {
    res.json(res.prompt);
});

// Update an item
router.patch('/:id', getPrompt, async (req, res) => {
    if (req.body.content != null) {
        res.prompt.content = req.body.content;
    }
    try {
        const updatedPrompt = await res.prompt.save();
        res.json(updatedPrompt);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an item
router.delete('/:id', getPrompt, async (req, res) => {
    try {
        console.log(res.prompt);
        await res.prompt.deleteOne();
        res.json({ message: 'Deleted prompt' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getPrompt(req, res, next) {
    let prompt;
    try {
        prompt = await PromptModel.findById(req.params.id);
        if (prompt == null) {
            return res.status(404).json({ message: 'Prompt not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.prompt = prompt;
    next();
}

export default router;