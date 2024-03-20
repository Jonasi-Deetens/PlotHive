import React, { useState } from "react";

const CommentInput = () => {
  const [newComment, setNewComment] = useState("");
  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    console.log("Adding comment:", newComment);
    setNewComment("");
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
