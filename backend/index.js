import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

// app.use(cors());

app.options('/books', cors());

app.use(cors({
    origin: ["https://book-store-front-ten.vercel.app/books"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTION"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})
);

// header('Access-Control-Allow-Origin: *');
// header('Acess-Control-Allow-Methods: POST, GET, PUT, OPTION, DELETE');
// header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');

app.get("/", (req, res) => {
    console.log(req);
    return res.send("Hello!");
});

app.use("/books", booksRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`This app is running on ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });