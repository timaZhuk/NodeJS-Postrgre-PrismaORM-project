const express = require("express");
const authorController = require("../controllers/authorController.js");

//router
const router = express.Router();

//add author
router.post("/add-author", authorController.addAuthor);
//delete author
router.delete("/:id", authorController.deleteAuthor);

//----
module.exports = router;
