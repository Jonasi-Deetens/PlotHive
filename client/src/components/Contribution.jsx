import PropTypes from "prop-types";

const Contribution = ({ contribution }) => {
  const { text, upvote_count, user_id } = contribution;
  const username = user_id ? user_id.username || "Unknown" : "Unknown";

  return (
    <div>
      <button>{upvote_count}</button>
      <p>{text}</p>
      <p>By: {username}</p> {/*placeholder*/}
    </div>
  );
};

Contribution.propTypes = {
  contribution: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    upvote_count: PropTypes.number.isRequired,
    user_id: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Contribution;
