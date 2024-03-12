import express from 'express';
const router = express.Router();
import {verifyToken} from '../Authentication/auth.js';
import UserModel from '../Models/User.js';

router.post('/user', verifyToken, async (req, res) => {
    let user;
    try {
        user = await UserModel.findById(req.userId);
        if (user == null) {
            return res.status(400).json({ message: 'User not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    return res.json(user);
});

export default router;