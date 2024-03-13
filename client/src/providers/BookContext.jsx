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
  }, [])

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

  return (
    <BookContext.Provider value={{books, getTopBooks}}>
      {children}
    </BookContext.Provider>
  );
};

export {BookProvider, BookContext} ;