/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "../assets/styles/components/Contribution/contribution.css";
import { UserContext } from "../providers/UserContext";
import CommentSection from "./CommentSection";

const Contribution = ({ contribution, userContribution }) => {
  const { user } = useContext(UserContext);
  const { text, upvoters, user_id } = contribution;
  const username = user_id.username;
  const [upvoted, setUpvoted] = useState(
    contribution.upvoters.indexOf(user._id) != -1
  );

  const upvote = async () => {
    const index = contribution.upvoters.indexOf(user._id);
    if (user && index !== -1) {
      contribution.upvoters.splice(index, 1);
    } else {
      contribution.upvoters.push(user._id);
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/contributions/" + contribution._id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            upvoters: contribution.upvoters,
          }),
        }
      );
      if (response.ok) {
        upvoted ? alert("Succesfully unvoted!") : alert("Succesfully upvoted!");
        setUpvoted(!upvoted);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="contribution-component">
      {!userContribution && (
        <div className="contribution-wrapper">
          <button onClick={upvote} className="contribution-button">
            <img
              src={
                upvoted
                  ? "src/assets/svgs/vote-yellow.svg"
                  : "src/assets/svgs/vote.svg"
              }
              alt="icon of a arrow pointing up"
            />
          </button>
          <p>{upvoters.length}</p>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: text }}></div>
      <p className="contribution-author">
        By: {!userContribution ? username : "You"}
      </p>
      <CommentSection contribtion={contribution} />
    </div>
  );
};

export default Contribution;
