import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import GenreModel from '../Models/Genre.js';

// Create a new item
router.post('/', async (req, res) => {
    try {
        const newGenre = new GenreModel({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title
        });
        
        const savedGenre = await newGenre.save();
        console.log('Genre saved successfully:', savedGenre);
        res.status(201).json(savedGenre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all items
router.get('/', async (req, res) => {
    try {
        const genres = await GenreModel.find();
        res.json(genres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single item
router.get('/:id', getGenre, (req, res) => {
    res.json(res.genre);
});

// Update an item
router.patch('/:id', getGenre, async (req, res) => {
    if (req.body.title != null) {
        res.genre.title = req.body.title;
    }
    try {
        const updatedGenre = await res.genre.save();
        res.json(updatedGenre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an item
router.delete('/:id', getGenre, async (req, res) => {
    try {
        console.log(res.genre);
        await res.genre.deleteOne();
        res.json({ message: 'Deleted genre' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getGenre(req, res, next) {
    let genre;
    try {
        genre = await GenreModel.findById(req.params.id);
        if (genre == null) {
            return res.status(404).json({ message: 'Genre not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.genre = genre;
    next();
}

export default router;