/* eslint-disable react/prop-types */
import "../assets/styles/components/Comment/comment.css";

const Comment = ({ comment }) => {
  const createdAt = new Date(comment.created_at);
  const hours = createdAt.getHours();
  const minutes = createdAt.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="comment-component">
      <p className="comment-content">{comment.content}</p>
      <div className="comment-info-container">
        <p className="comment-user">By: {comment.user_id.username}</p>
        <p className="comment-time">At: {formattedTime}</p>
      </div>
    </div>
  );
};

export default Comment;
