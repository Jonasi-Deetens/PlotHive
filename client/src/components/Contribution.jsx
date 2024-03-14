import PropTypes from "prop-types";

const Contribution = ({ contribution }) => {
  return (
    <div>
      <button>{contribution.upvote_count}</button>
      <p>{contribution.text}</p>
      <p>By: {contribution.user_id}</p> {/*placeholder*/}
    </div>
  );
};

Contribution.propTypes = {
  contribution: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    upvote_count: PropTypes.number.isRequired,
    user_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contribution;
