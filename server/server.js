import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cron from "node-cron";
import connectToDatabase from "./Database/database.js";
import BookController from "./Controllers/BookController.js";
import configureWebSocket from "./Websocket/websocket.js";

const app = express();
const wss = configureWebSocket(app);
dotenv.config();


app.use(express.json());
app.use(express.static('./public'));
const corsOptions = {
  origin: 'https://plothive.netlify.app'
};

app.use(cors());

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 4000;

connectToDatabase();

cron.schedule('50 59 00 * * *', async () => {
  // await BookController.createBook();

  await BookController.addFavoriteContributionsToBooks();

  wss.clients.forEach((client) => {
    if (client._readyState === client.OPEN) {
        console.log("message sent")
        client.send(JSON.stringify({ event: 'bookUpdate' }));
    }
  });
});

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

export {
  wss
}