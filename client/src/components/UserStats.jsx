import "../assets/styles/components/UserStats/userstats.css"
import React, { useEffect, useState } from 'react'

const UserStats = ({ user, books }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const generateStats = () => {
            const generatedStats = {
                books_contributed_to: 0,
                contributions: 0,
                final: 0,
                comments_received: 0,
                characters: 0,
                upvotes: 0,
            };

            books.forEach(book => {
                let contributedToBook = false;

                book.contributions.forEach(contribution => {
                    if (contribution.user_id._id === user._id) {
                        contributedToBook = true;
                        generatedStats.contributions += 1;
                        generatedStats.upvotes += contribution.upvoters?.length;
                        generatedStats.comments_received += contribution.comments?.length;
                        generatedStats.characters += contribution.text.length;
                    }
                })

                if (contributedToBook) {
                    generatedStats.books_contributed_to += 1;
                    if (book.finished) generatedStats.final += 1;
                }
            })

            setStats(generatedStats);
        };

        if (user && books) generateStats();
    }, [user, books])
    

    return (
        <>
        { stats && (
            <div className="stat-container">
                <div className="badge">
                    <p className="badge-title">Books contributed to</p>
                    <p className="badge-number">{stats.books_contributed_to}</p>
                </div>
                <div className="badge">
                    <p className="badge-title">Made the final version</p>
                    <p className="badge-number">{stats.final}</p>
                </div>
                <div className="badge">
                    <p className="badge-title">Comments received</p>
                    <p className="badge-number">{stats.comments_received}</p>
                </div>
                <div className="badge">
                    <p className="badge-title">Character written</p>
                    <p className="badge-number">{stats.characters}</p>
                </div>
                <div className="badge">
                    <p className="badge-title">Chapters written</p>
                    <p className="badge-number">{stats.contributions}</p>
                </div>
                <div className="badge">
                    <p className="badge-title">Upvotes received</p>
                    <p className="badge-number">{stats.upvotes}</p>
                </div>
            </div>
        ) }
        </>
    )
}

export default UserStats