const authorService = require("../services/authorService.js");

//-- export addAuth controller
exports.addAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    //call authorService functions
    const author = await authorService.addAuthor(name);
    res.status(201).json(author);
  } catch (error) {
    //400 bad request
    res.status(400).json({ error: error.message });
  }
};

// -- delete author controller
exports.deleteAuthor = async (req, res) => {
  try {
    // --- delete author from DB
    await authorService.deleteAuthor(parseInt(req.params.id));
    res
      .status(200)
      .json({ message: `Author deleted with ${parseInt(req.params.id)}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
