import React, { createContext, useContext, useEffect, useState } from "react";

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/books", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    };

    getBooks();
  }, []);

  const getTopBooks = () => {
    if (books) {
      books.sort((bookA, bookB) => {
        const itemCountA = bookA.contributions.length;
        const itemCountB = bookB.contributions.length;
        return itemCountB - itemCountA;
      });
      return books;
    }
  };

  const addContributionToBook = (bookId, contribution) => {
    console.log(bookId);
    console.log(contribution);
    if (books) {
      const book = getBookById(bookId);
      if (book) {
        console.log(book.title);
        book.contributions.push(contribution);
      }
    }
  };

  const getLatestBook = () => {
    if (books) {
      books.sort((bookA, bookB) => {
        const dateA = new Date(bookA.created_at);
        const dateB = new Date(bookB.created_at);

        return dateB - dateA;
      });
      return books[0];
    }
  };

  const getBookById = (id) => {
    if (books) {
      let bookWithId;
      books.forEach((book) => {
        if (book._id === id) bookWithId = book;
      });
      return bookWithId;
    }
  };

  const getBookByTitle = (query) => {
    console.log(query);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        getTopBooks,
        getLatestBook,
        getBookById,
        getBookByTitle,
        addContributionToBook,
      }}
    >
      {books && children}
    </BookContext.Provider>
  );
};

export { BookProvider, BookContext };
