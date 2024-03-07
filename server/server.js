import express from "express";
import path from 'path';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const host = process.env.host || "localhost";
const port = process.env.PORT || 4000;

app.use(express.static('./public'))

app.get("/", (req, res) => {
    res.send('<h1>Vite + React</h1>')
})

app.listen(port, () => {
    console.log('Welcome ' + host + ', server is listening on port: ' + port );
})