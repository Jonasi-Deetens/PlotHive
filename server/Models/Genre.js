import mongoose from 'mongoose';

// Define schema for Genres collection
const genreSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    primaryKey: true
  },
  title: {
    type: String,
    required: true
  }
});

const GenreModel = mongoose.model("Genre", genreSchema);

export default GenreModel;