const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//// Get the book list available in the shop with axios 
const axios = require('axios');

public_users.get('/', (req, res) => {
    axios.get('http://localhost:5000/books')
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.status(500).json({ message: "Erreur lors de la récupération des livres", error });
        });
});

/*
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  res.send(JSON.stringify(books,null,4));
});
*/

// Get book details based on ISBN with axios 
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const response = await axios.get(`http://localhost:5000/books${isbn}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du livre", error });
    }
});


/*
// Get book details based on ISBN 
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
 // return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
 */
 
// Get book details based on author with axios 
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const response = await axios.get(`http://localhost:5000/books/author/${author}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des livres de l'auteur", error });
    }
});

/*
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
      const authorName = req.params.author;
    const bookKeys = Object.keys(books);

    const booksByAuthor = bookKeys
        .map(key => books[key])
        .filter(book => book.author === authorName);

    if (booksByAuthor.length > 0) {
        res.json(booksByAuthor);
    } else {
        res.status(404).json({ message: "not books found." });
    }
  //return res.status(300).json({message: "Yet to be implemented"});
});
*/


// Get all books based on title with axios 
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const response = await axios.get(`http://localhost:5000/books/title/${title}`);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du livre par titre", error });
    }
});


/*
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});
*/
module.exports.general = public_users;
