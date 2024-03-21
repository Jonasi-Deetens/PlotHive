import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserContext";
import { Navigate } from "react-router";
import { BookContext } from "../providers/BookContext";

const CommentInput = (contributionId) => {
  const [newComment, setNewComment] = useState("");
  const [user, authUser] = useContext(UserContext);
  const { addCommentToContribution } = useContext(BookContext);

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
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    console.log("Adding comment:", newComment);
    const commentData = {
      content: newComment,
      user_id: user,
    };
    try {
      const response = await fetch("http://127.0.0.1:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        const data = await response.json();
        await addCommentToContribution(contributionId, data);
        console.log("Post created successfully");
        setNewComment("");
      } else {
        console.error("Failed to create post");
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="Add a comment..."
        value={newComment}
        onChange={handleInputChange}
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </>
  );
};

export default CommentInput;
