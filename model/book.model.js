const mongoose = require("mongoose")

const booksSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    username: String,
    userID: String
}, {
    versionKey: false
})

const BooksModel = mongoose.model("book", booksSchema)

module.exports = {
    BooksModel
}