import express from "express";
import path from 'path';
import dotenv from 'dotenv';
import { createUser } from "./Controllers/UserController.js";
import connectToDatabase from "./Database/database.js";

const app = express();
dotenv.config();

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 4000;

connectToDatabase();

app.use(express.static('./public'))

app.get("/", (req, res) => {
    res.send('<h1>Vite + React</h1>')
    createUser();
})

app.listen(port, () => {
    console.log('Welcome ' + host + ', server is listening on port: ' + port );
})