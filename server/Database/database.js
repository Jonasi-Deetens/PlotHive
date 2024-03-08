import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; 
    }
};

export default connectToDatabase;