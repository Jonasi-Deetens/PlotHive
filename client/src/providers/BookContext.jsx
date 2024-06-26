/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch("https://plothiveserver1-1y57tl0h.b4a.run/api/books", {
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

    let ws;
    const connectWebSocket = () => {
      ws = new WebSocket("wss://plothiveserver1-1y57tl0h.b4a.run/ws");
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
      ws.onclose = () => {
        console.log("WebSocket disconnected. Reconnecting...");
        connectWebSocket(); // Retry after 5 seconds
      };
    };

    getBooks();
    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
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
    if (books) {
      const updatedBook = getBookById(bookId);
      updatedBook.contributions.push(contribution);
      try {
        const response = await fetch(
          `https://plothiveserver1-1y57tl0h.b4a.run/api/books/${bookId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
          }
        );
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
        `https://plothiveserver1-1y57tl0h.b4a.run/api/contributions/${contribution._id}`,
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
