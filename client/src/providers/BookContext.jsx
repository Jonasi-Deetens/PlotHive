import React, { createContext, useContext, useEffect, useState } from 'react';

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
        try {
        const response = await fetch('http://127.0.0.1:5000/api/books', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            setBooks(data);
        }
        } catch (error) {
        throw new Error(error.message);
        }
    }

    getBooks();
  }, [setBooks])

  const getTopBooks = () => {
    if (books) {
        books.sort((bookA, bookB) => {
            const itemCountA = bookA.contributions.length;
            console.log(itemCountA);
            const itemCountB = bookB.contributions.length;
            console.log(itemCountB);
            return itemCountB - itemCountA;
          });
          console.log(books);
        return books;
    }
  }

  const getLatestBook = () => {
    console.log("in");
    if (books) {
        console.log("in in");
        books.sort((bookA, bookB) => {
            const dateA = new Date(bookA.created_at);
            const dateB = new Date(bookB.created_at);
            
            return dateB - dateA;
        });
        return books[0];
    }
  }

  return (
    <BookContext.Provider value={{books, getTopBooks, getLatestBook}}>
      {books && children}
    </BookContext.Provider>
  );
};

export {BookProvider, BookContext} ;