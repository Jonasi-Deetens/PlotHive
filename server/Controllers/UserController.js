import mongoose from 'mongoose';
import UserModel from "../Models/User.js";

const createUser = () => {
    const newUser = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        username: 'exampleUser',
        email: 'user@example.com',
        password: 'password123',
    });
    
    // Save the user to the database
    newUser.save()
    .then(savedUser => {
        console.log('User saved successfully:', savedUser);
    })
    .catch(err => {
        console.error('Error saving user:', err);
    });
}

export {
    createUser,
}