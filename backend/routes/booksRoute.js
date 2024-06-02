import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.send({ message: "send all required fields", });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.send(book);
    } catch (error) {
        console.log(error.message);
        response.send({ message: error.message });
    }
});

router.get("/", async(request, response) => {
    try{
        const books = await Book.find({});
        return response.json({
            count: books.length,
            data: books
        });
    } catch (error){
        console.log(error.message);
        response.send({message: error.message});
    }
});

router.get("/:id", async(request, response) => {
    try{
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.json(book);
    } catch (error){
        console.log(error.message);
        response.send({message: error.message});
    }
});

router.put("/:id", async(request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.send({message: "Send all required fields",});
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result) {
            return response.json({message: "Book not found"});
        }
        return response.send({message: "Book updated successfully"});
    } catch (error) {
        console.log(error.message);
        response.send({message: error.message});
    }
});

router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result) {
            return response.json({message: "Book not found"});
        }
        return response.send({message: "Book deleted successfully"})
    } catch (error) {
        console.log(error.message);
        response.send({message: error.message});
    }
});

export default router;