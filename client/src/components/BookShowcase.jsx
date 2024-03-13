import '../assets/styles/components/BookShowcase/bookshowcase.css'
import React, { useEffect, useState } from 'react'
import cover from "../assets/svgs/cover.png"


const BookShowcase = () => {
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
    

    return (
        <section className="showcase-section">
            <h2 className="showcase-title">You might like</h2>
            <div className="showcase-wrapper">
            {books && books.map((book) => (
                <div className="profile-book" key={'BOOK_KEY_' + book._id}>   
                <img className="profile-book-image" src={cover} width={100} height={160} alt="Placeholder of an image of a book" />
                <h3 className="profile-book-title">{book.title}</h3>
                </div>
            ))}
            </div>
        </section>
    )
}

export default BookShowcase