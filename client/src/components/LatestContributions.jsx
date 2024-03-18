import '../assets/styles/components/LikedBooks/likedbooks.css'
import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from '../providers/BookContext';
import { UserContext } from '../providers/UserContext';
import { Link } from 'react-router-dom';

const LatestContributions = () => {
    const { user } = useContext(UserContext);
    const { books } = useContext(BookContext);
    const [contributed, setContributed] = useState([]);

    useEffect(() => {
        const fillContributeList = () => {
            let contributions = [];

            if (books && user) {
                books.map((book) => {
                    book.contributions.forEach(contribution => {
                        if (contribution.user_id._id === user._id) contributions.push(book);
                    });
                });
            }
            if(contributions) setContributed(contributions);
        }

        fillContributeList();
    }, [user, books, setContributed])

    return (
        <section className="books-section">
            <h2 className="books-title">Latest contributions</h2>
            <div className="book-wrapper">
            {contributed.length ?( contributed.slice(0,4).map((book) => (
                <div className='flex-wrapper'>
                    <Link className='book-link' to={"/write?" + book._id}><p className="book-title">{book.title}</p></Link>
                    <p className="book-date">{book.created_at.split("T")[0]}</p>
                </div>
            ))) : (
                <p className="book-error">No contributions yet.</p>
            )}
            </div>
        </section>
    )
}

export default LatestContributions