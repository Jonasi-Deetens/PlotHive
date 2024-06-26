/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserContext";
import { Navigate } from "react-router";
import { BookContext } from "../providers/BookContext";

const CommentInput = ({ contribution }) => {
  const [newComment, setNewComment] = useState("");
  const { user, authUser } = useContext(UserContext);
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
    console.log(user);
    const commentData = {
      content: newComment,
      user_id: user,
    };
    try {
      const response = await fetch(
        "https://plothiveserver-9kh2sv0d.b4a.run/api/comments",
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
        maxLength={300}
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </>
  );
};

export default CommentInput;
