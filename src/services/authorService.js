const { PrismaClient } = require("../generated/prisma/client");
//const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- add new author in DB
async function addAuthor(name) {
  try {
    const newlyCreatedAuthor = await prisma.author.create({
      data: {
        name,
      },
    });

    return newlyCreatedAuthor;
  } catch (error) {
    console.error("Error in addAuthor Service", error);
    throw error;
  }
}

// --- delete the author
async function deleteAuthor(id) {
  try {
    const deletedAuthor = await prisma.author.delete({
      where: { id },
      include: { books: true },
    });

    return deletedAuthor;
  } catch (error) {
    console.error("Error in deleteAuthor Service", error);
    throw error;
  }
}

//-----
module.exports = { addAuthor, deleteAuthor };
