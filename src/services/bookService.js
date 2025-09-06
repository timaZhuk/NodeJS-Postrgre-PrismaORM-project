const { PrismaClient } = require("../generated/prisma/client");

//create new instance of PrismaClient class
const prisma = new PrismaClient();

//------------Services-----------------
// -- add new book service
async function addBook(title, publishedDate, authorId) {
  try {
    const newlyCreatedBook = await prisma.book.create({
      data: {
        title,
        publishedDate,
        author: {
          connect: { id: authorId },
        },
      },
      include: { author: true },
    });

    return newlyCreatedBook;
  } catch (error) {
    console.error("Error in add new book service", error);
    throw error;
  }
}

//-- Get all books
async function getAllBooks() {
  try {
    // get all books with findMany method and include: {author:true}--add info
    //  about author
    const books = await prisma.book.findMany({
      include: { author: true },
    });
    return books;
  } catch (error) {
    console.error("Error in get All books service", error);
    throw error;
  }
}

// --- Get all books by id
async function getBookById(id) {
  try {
    // --- using findUnique with filtering by id
    const book = await prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    return book;
  } catch (error) {
    console.error("Error in get  Book by Id service", error);
    throw error;
  }
}

// --- update the book (only new title)
async function updateBook(id, newTitle) {
  try {
    //-1-check if book exist in DB
    // using findUnique with filtering by id
    const book = await prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    //-2-- then update
    //update method
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title: newTitle,
      },
      include: {
        author: true,
      },
    });
    return updatedBook;
  } catch (error) {
    console.error("Error in Update book by Id service", error);
    throw error;
  }
}

// --- update the book using transactions
async function transUpdateBook(id, newTitle) {
  try {
    // --- using transactions
    const updatedBook = await prisma.$transaction(async (prisma) => {
      // --- check if book exists
      const book = await prisma.book.findUnique({
        where: { id },
        include: { author: true },
      });

      if (!book) {
        throw new Error(`Book with id ${id} not found`);
      }

      // --- return updated book
      return prisma.book.update({
        where: { id },
        data: {
          title: newTitle,
        },
        include: { author: true },
      });
    });

    return updatedBook;
  } catch (error) {
    console.error("Error in Transaction  Update book by Id service", error);
    throw error;
  }
}

// --- Delete book by id
async function deleteBook(id) {
  try {
    const deletedBook = await prisma.book.delete({
      where: { id },
      include: { author: true },
    });
    return deletedBook;
  } catch (error) {
    console.error("Error in Delete book by Id service", error);
    throw error;
  }
}

//---
module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  transUpdateBook,
  deleteBook,
};
