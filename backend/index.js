import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
    origin: "https://book-store-front-ten.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
})
);

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });

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