import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use(cors({
    origin: ["https://book-store-front-ten.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
})
);

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://book-store-front-ten.vercel.app");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });

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