const bookService = require("../services/bookService.js");

// --- add Book controller

exports.addBook = async (req, res) => {
  try {
    //get data from request body
    const { title, publishedDate, authorId } = req.body;

    // --- create book in DB with service
    const book = await bookService.addBook(
      title,
      new Date(publishedDate),
      authorId
    );
    // --- created ---
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// --- get All Books
exports.getAllBooks = async (req, res) => {
  try {
    // get all books from DB
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- get Book by ID
exports.getBookById = async (req, res) => {
  try {
    //get book id from request params
    const bookId = req.params.id;
    //book by id from DB
    const book = await bookService.getBookById(parseInt(bookId));
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- update Book
exports.updateBook = async (req, res) => {
  try {
    // -- get title from request body
    const { title } = req.body;

    // --
    const book = await bookService.updateBook(parseInt(req.params.id), title);
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// --- delete Book
exports.deleteBook = async (req, res) => {
  try {
    // -- delete book in DB
    await bookService.deleteBook(parseInt(req.params.id));
    res.json({ message: `Deleted book with id ${parseInt(req.params.id)}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
