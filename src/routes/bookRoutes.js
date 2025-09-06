const express = require("express");
const bookController = require("../controllers/bookController.js");

const router = express.Router();

//POST add new book
router.post("/add-new-book", bookController.addBook);

//GET books
router.get("/get-all-books", bookController.getAllBooks);

//Get book by Id
router.get("/get-book/:id", bookController.getBookById);

//Update book by id
router.put("/update-book/:id", bookController.updateBook);

//Delete book by id
router.delete("/delete-book/:id", bookController.deleteBook);

//---
module.exports = router;
