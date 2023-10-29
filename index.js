const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/users.routes");
const { booksRouter } = require("./routes/books.routes");
const cors = require("cors")
require("dotenv").config()

const app = express();

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to the Home Page!!!!!")
})

app.use("/users", userRouter)
app.use("/books", booksRouter)

app.listen(process.env.port, async(req, res) => {
    try{
        await connection
        console.log("Server is connected to DB")
        console.log(`Server is running at port ${process.env.port}`)
    } catch(err) {
        console.log(err)
    }
})