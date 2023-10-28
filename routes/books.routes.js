const express = require("express");
const { BooksModel } = require("../model/book.model");
const { auth } = require("../middleware/auth.middleware");

const booksRouter = express();

booksRouter.use(auth);

booksRouter.post("/add", async(req, res) => {
    try{
        const newBook = new BooksModel(req.body)
        console.log(newBook)
        await newBook.save()
        res.status(200).send({"msg": "New book has been added", "New Book": newBook})
    } catch(err) {
        res.status(400).send({"error": err})
    }
})

booksRouter.get("/", async(req, res) => {
    try{
        const books = await BooksModel.find()
        res.status(200).send(books)
    } catch(err) {
        res.status(400).send({"error": err})
    }
});

booksRouter.patch("/update/:bookId", async(req, res) => {
    const {bookId} = req.params
    const book = await BooksModel.findOne({_id: bookId})
    
    try{
        if(req.body.userId === book.userId){
            await BooksModel.findByIdAndUpdate({_id: bookId}, req.body)
            res.status(200).send({"msg": `The book with ID: ${bookId} has been updated.`})
        }else{
            res.status(200).send({"msg": "You can update book only authorized by you!"})
        }
    } catch(err){
        res.status(400).send({"error": err})
    }
});

booksRouter.delete("/delete/:id", async(req, res) => {
    const {bookId} = req.params
    const book = await BooksModel.findOne({_id: bookId})
    
    try{
        if(req.body.userId === book.userId){
            await BooksModel.findByIdAndDelete({_id: bookId})
            res.status(200).send({"msg": `The book with ID: ${bookId} has been deleted.`})
        }else{
            res.status(200).send({"msg": "You can update book only authorized by you!"})
        }
    } catch(err){
        res.status(400).send({"error": err})
    }
})

module.exports = {
    booksRouter
}