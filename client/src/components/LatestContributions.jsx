import '../assets/styles/components/LikedBooks/likedbooks.css'
import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from '../providers/BookContext';
import { UserContext } from '../providers/UserContext';

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
            {contributed && contributed.slice(0,4).map((book) => (
                <div className='flex-wrapper'>
                    <p className="book-title">{book.title}</p>
                    <p className="book-date">{book.created_at.split("T")[0]}</p>
                </div>
            ))}
            </div>
        </section>
    )
}

export default LatestContributions