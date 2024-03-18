/* eslint-disable react/prop-types */
const Contribution = ({ contribution }) => {
  const { text, upvote_count, user_id } = contribution;
  const username = user_id ? user_id.username || "Unknown" : "Unknown";

  return (
    <div>
      <button>{upvote_count}</button>
      <p>{text}</p>
      <p>By: {username}</p>
    </div>
  );
};

export default Contribution;
