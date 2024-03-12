import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import UserModel from '../Models/User.js';

// Create a new item
router.post('/', validateRegistrationData, async (req, res) => {
    try {
        const newUser = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            email: req.body.email
        });
        
        const savedUser = await newUser.save();
        console.log('User saved successfully:', savedUser);
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all items
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single item
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Update an item
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an item
router.delete('/:id', getUser, async (req, res) => {
    try {
        console.log(res.user);
        await res.user.deleteOne();
        res.json({ message: 'Deleted user' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await UserModel.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}

async function validateRegistrationData(req, res, next) {
    const { username, password, confirmPassword, email } = req.body;

    try {
        const user = await UserModel.findOne({ username: username });
        if (user) {
            return res.status(404).json({ message: 'Username already taken' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            return res.status(404).json({ message: 'Email already in use' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    if (!username || !password || !confirmPassword || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    next();
}

export default router;