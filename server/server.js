import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cron from "node-cron";
import connectToDatabase from "./Database/database.js";
import BookController from "./Controllers/BookController.js";

const app = express();
dotenv.config();

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 4000;

connectToDatabase();

cron.schedule('0 0 * * *', async () => {
  console.log('Creating new book...');
  await BookController.createBook();
});

app.use(express.json());
app.use(express.static('./public'));
app.use(cors());

import authRoutes from './Routes/auth.js';
app.use('/auth', authRoutes);

import bookRoutes from "./Routes/books.js";
app.use("/api/books", bookRoutes);

import userRoutes from "./Routes/users.js";
app.use("/api/users", userRoutes);

import genreRoutes from "./Routes/genres.js";
app.use("/api/genres", genreRoutes);

import promptRoutes from "./Routes/prompts.js";
app.use("/api/prompts", promptRoutes);

import contributionRoutes from "./Routes/contributions.js";
app.use("/api/contributions", contributionRoutes);

import commentRoutes from "./Routes/comments.js";
app.use("/api/comments", commentRoutes);

app.all("*", (req, res) => {
  res.send("No resource found!");
});

app.listen(port, () => {
  console.log("Welcome " + host + ", server is listening on port: " + port);
});
