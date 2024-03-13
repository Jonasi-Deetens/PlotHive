import '../assets/styles/components/LikedBooks/likedbooks.css'
import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from '../providers/BookContext';
import { UserContext } from '../providers/UserContext';

const LikedBooks = () => {
    const { user } = useContext(UserContext);
    const { books } = useContext(BookContext);
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const fillFavouriteList = () => {
            let favourites = [];

            if (books) {
                books.map((book) => {
                    if (user.favourites.includes(book._id)) favourites.push(book);
                });
            }
            if(favourites) setFavourites(favourites);
        }

        fillFavouriteList();
    }, [user, books, setFavourites])

    return (
        <section className="books-section">
            <h2 className="books-title">Favourites</h2>
            <div className="book-wrapper">
            {favourites && favourites.slice(0,4).map((book) => (
                <p className="book-title">{book.title}</p>
            ))}
            </div>
        </section>
    )
}

export default LikedBooks