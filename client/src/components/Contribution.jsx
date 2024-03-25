/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "../assets/styles/components/Contribution/contribution.css";
import { UserContext } from "../providers/UserContext";
import CommentSection from "./CommentSection";

const Contribution = ({ contribution, userContribution }) => {
  const { user } = useContext(UserContext);
  const [upvoted, setUpvoted] = useState();
  const [showComments, setShowComments] = useState(false);
  console.log("con:  dzqdqzdz");
  console.log(contribution);
  useEffect(() => {
    if (contribution) {
      setUpvoted(contribution.upvoters.indexOf(user?._id) != -1);
    }
  }, []);

  const upvote = async () => {
    const index = contribution.upvoters.indexOf(user._id);
    if (user && index !== -1) {
      contribution.upvoters.splice(index, 1);
    } else {
      contribution.upvoters.push(user._id);
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:4000/api/contributions/" + contribution._id,
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
        setUpvoted(!upvoted);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {contribution && (
        <div className="contribution-component">
          <div className="contribution-wrapper">
            {!userContribution ? (
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
            ) : (
              <p className="contribution-vote">Upvotes:</p>
            )}
            <p>{contribution.upvoters.length}</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: contribution.text }}></div>
          <p className="contribution-author">
            By: {!userContribution ? contribution.user_id.username : "You"}
          </p>
          <div className="contribution-wrapper">
            <button
              className="comment-toggle"
              onClick={() => setShowComments(!showComments)}
            >
              {showComments ? (
                <img src="src/assets/svgs/commentIcon.svg"></img>
              ) : (
                <img src="src/assets/svgs/commentIconYellow.svg"></img>
              )}
            </button>
          </div>
          {showComments && <CommentSection contribution={contribution} />}
        </div>
      )}
    </>
  );
};

export default Contribution;
