import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import UserModel from '../Models/User.js';
import { hashPassword, comparePassword } from '../Encryption/bcrypt.js';
import jwt from 'jsonwebtoken';
import ContributionModel from '../Models/Contribution.js';

// Login user
router.post('/login', validateLoginData, async (req, res) => {
    if (res.user) {
        const token = jwt.sign({userId: res.user._id}, process.env.JWT_KEY, {expiresIn: '1h'});
        return res.status(201).json({user: res.user, token});
    }
    else   
        res.status(500).json({ message: err.message });
});

// Register new user
router.post('/', validateRegistrationData, async (req, res) => {
    try {
        const newUser = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: await hashPassword(req.body.password),
            favourites: [],
            email: req.body.email
        });

        const savedUser = await newUser.save();
        console.log('User saved successfully:', savedUser);
        const token = jwt.sign({userId: savedUser._id}, process.env.JWT_KEY, {expiresIn: '1h'});
        return res.status(201).json({user: savedUser, token});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single user
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Update an user
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }
    if ((req.body.password != null && req.body.confirmPassword != null)) {
        if (req.body.password != "" && req.body.confirmPassword != "") {
            if (req.body.password == req.body.confirmPassword) 
                res.user.password = await hashPassword(req.body.password);
            else    
                return res.status(400).json({ message: 'Passwords do not match' });
        } else return res.status(400).json({ message: 'Please fill in both fields' });
    } 

    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.favourites != null) {
        res.user.favourites = req.body.favourites;
    }
    try {
        const updatedUser = await res.user.save();
        res.status(201).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an user
router.delete('/:id', getUser, async (req, res) => {
    try {
        console.log(res.user);
        const contributions = await ContributionModel.find();
        for (const contribution of contributions) {
            if (contribution.user_id.toString() === res.user._id.toString()) {
                await contribution.deleteOne();
            }
        }
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

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ message: 'No special characters allowed as username' });
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

async function validateLoginData(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await UserModel.findOne({ username: username });

        if (!user) {
            return res.status(400).json({ message: 'That username does not exist' });
        }

        const correctPassword = await comparePassword(password, user.password);
        if (!correctPassword)
            return res.status(400).json({ message: 'That passsword is incorrect' });
        else 
            res.user = user;
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    next();
}

export default router;