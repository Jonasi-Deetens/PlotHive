/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserContext";
import { Navigate } from "react-router";
import { BookContext } from "../providers/BookContext";
import "../assets/styles/components/CommentInput/commentInput.css";

const CommentInput = ({ contribution }) => {
  const [newComment, setNewComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { user, authUser } = useContext(UserContext);
  const { addCommentToContribution } = useContext(BookContext);
  const maxLength = 400;

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        if (!user) {
          const checkAuth = await authUser();
          if (!checkAuth) {
            Navigate("/Login");
            return;
          }
        }
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };
    isAuthorized();
  }, [authUser, user]);

  const handleInputChange = (event) => {
    const input = event.target.value;
    if (input.length <= maxLength) {
      // Check if input length exceeds the character limit
      setNewComment(input);
    }
  };

  const handleAddComment = async () => {
    const commentData = {
      content: newComment,
      user_id: user,
    };
    try {
      const response = await fetch(
        "https://plothiveserver1-1y57tl0h.b4a.run/api/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        await addCommentToContribution(contribution, data);
        setNewComment("");
      } else {
        console.error("Failed to create post");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (newComment.length >= maxLength) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [newComment]);

  return (
    <div className="comment-input">
      <textarea
        type="text"
        placeholder="Add a comment..."
        value={newComment}
        onChange={handleInputChange}
        disabled={isDisabled} // Disable textarea if character limit is reached
      />
      <button onClick={handleAddComment} disabled={isDisabled}>
        Submit
      </button>
      {isDisabled && (
        <p>Maximum character limit reached ({maxLength} characters).</p>
      )}
      {"Comment can only be 400 characters"}
    </div>
  );
};

export default CommentInput;
