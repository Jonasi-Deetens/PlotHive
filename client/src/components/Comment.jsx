/* eslint-disable react/prop-types */
const Comment = ({ comment }) => {
  console.log(comment);

  const createdAt = new Date(comment.created_at);

  const hours = createdAt.getHours();
  const minutes = createdAt.getMinutes();

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return (
    <>
      <p>{comment.content}</p>
      <p>By: {comment.user_id.username}</p>
      <p>At: {formattedTime}</p>
    </>
  );
};

export default Comment;
