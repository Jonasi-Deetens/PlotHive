import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import BookModel from '../Models/Book.js';

// Create a new item
router.post('/', async (req, res) => {
    try {
        const newBook = new BookModel({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            prompt_id: req.body.prompt_id,
            contributions: req.body.contributions,
            genres: req.body.genres,
            created_at: Date.now()
        });
        
        const savedBook = await newBook.save();
        console.log('Book saved successfully:', savedBook);
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all items
router.get('/', async (req, res) => {
    try {
        const books = await BookModel.find()
            .populate('genres')
            .populate('prompt_id')
            .populate({
                path: 'contributions',
                populate: {
                    path: 'comments user_id'
                }
            });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single item
router.get('/:id', getBook, (req, res) => {
    res.json(res.book);
});

// Update an item
router.patch('/:id', getBook, async (req, res) => {
    if (req.body.title != null) {
        res.book.title = req.body.title;
    }
    if (req.body.genres != null) {
        res.book.genres = req.body.genres;
    }
    if (req.body.contributions != null) {
        res.book.contributions = req.body.contributions;
    }
    if (req.body.prompt_id != null) {
        res.book.prompt_id = req.body.prompt_id;
    }
    try {
        const updatedBook = await res.book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an item
router.delete('/:id', getBook, async (req, res) => {
    try {
        console.log(res.book);
        await res.book.deleteOne();
        res.json({ message: 'Deleted book' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getBook(req, res, next) {
    let book;
    try {
        book = await BookModel.findById(req.params.id)
            .populate('genres')
            .populate('prompt_id')
            .populate('contributions');
        if (book == null) {
            return res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.book = book;
    next();
}

export default router;