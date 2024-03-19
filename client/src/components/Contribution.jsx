import { useState } from "react";
import "../assets/styles/components/Contribution/contribution.css";

const Contribution = ({ contribution }) => {
  const { text, upvoters, user_id } = contribution;
  const username = user_id.username;
  const [upvoted, setUpvoted] = useState(contribution.upvoters.indexOf(user_id._id) != -1);

  const upvote = async () => {
    const index = contribution.upvoters.indexOf(user_id._id);
    if (index !== -1) {
      contribution.upvoters.splice(index, 1);
    } else {
      contribution.upvoters.push(user_id._id);
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/contributions/' + contribution._id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          upvoters: contribution.upvoters
        })
      })
      if (response.ok) {
        upvoted ? alert("Succesfully unvoted!") : alert("Succesfully upvoted!");
        setUpvoted(!upvoted);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="contribution-component">
      <div className="contribution-wrapper">
        <button onClick={upvote} className="contribution-button">
          <img
            src={upvoted ? "src/assets/svgs/vote-yellow.svg" : "src/assets/svgs/vote.svg"}
            alt="icon of a arrow pointing up"
          />
        </button>
        <p>{upvoters.length}</p>
      </div>
      <p>{text}</p>
      <p className="contribution-author">By: {username}</p>
    </div>
  );
};

export default Contribution;
