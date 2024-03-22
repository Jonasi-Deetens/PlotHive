/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/api/books", {
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

    const ws = new WebSocket("ws://127.0.0.1:4000/ws");
    ws.onopen = () => {
      console.log("WebSocket connected");
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.event === "bookUpdate") {
        console.log("message received");
        getBooks();
      }
    };

    return () => {
      ws.close();
    };
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

  const addContributionToBook = async (bookId, contribution) => {
    console.log(bookId);
    console.log(contribution);
    if (books) {
      const updatedBook = getBookById(bookId);
      updatedBook.contributions.push(contribution);
      try {
        const response = await fetch(
          `http://127.0.0.1:4000/api/books/${bookId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
          }
        );
        console.log(updatedBook);
        if (!response.ok) {
          throw new Error("Failed to update book");
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const addCommentToContribution = async (contribution, comment) => {
    try {
      contribution.comments.push(comment);

      const updateResponse = await fetch(
        `http://127.0.0.1:4000/api/contributions/${contribution._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comments: contribution.comments }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update contribution with new comment");
      }
      console.log("Comment added to contribution successfully");
    } catch (e) {
      console.error(e.message);
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
      const book = books.find((book) => book._id === id);
      console.log("find book: ");
      console.log(book);
      return book;
    }
  };

  const getBookByTitle = (query) => {
    if (books) {
      let booksByName = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      return booksByName;
    }
  };

  const getBooksByGenre = (selectedGenre) => {
    if (books) {
      let booksByGenre = books.filter((book) => {
        const titles = book.genres.map((genre) => genre.title);
        return titles.includes(selectedGenre);
      });
      return booksByGenre;
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        getTopBooks,
        getLatestBook,
        getBookById,
        getBookByTitle,
        getBooksByGenre,
        addContributionToBook,
        addCommentToContribution,
      }}
    >
      {books && children}
    </BookContext.Provider>
  );
};

export { BookProvider, BookContext };
