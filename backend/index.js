import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use(cors({
    origin: ["https://book-store-front-khaki.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true
})
);

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