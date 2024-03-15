import "../assets/styles/components/UserStats/userstats.css"
import React from 'react'

const UserStats = () => {
    return (
        <div className="stat-container">
            <div className="badge">
                <p className="badge-title">Books contributed to</p>
                <p className="badge-number">13</p>
            </div>
            <div className="badge">
                <p className="badge-title">Made the final version</p>
                <p className="badge-number">3</p>
            </div>
            <div className="badge">
                <p className="badge-title">Comments received</p>
                <p className="badge-number">45</p>
            </div>
            <div className="badge">
                <p className="badge-title">Character written</p>
                <p className="badge-number">2964</p>
            </div>
            <div className="badge">
                <p className="badge-title">Chapters written</p>
                <p className="badge-number">24</p>
            </div>
            <div className="badge">
                <p className="badge-title">Upvotes received</p>
                <p className="badge-number">344</p>
            </div>
        </div>
    )
}

export default UserStats