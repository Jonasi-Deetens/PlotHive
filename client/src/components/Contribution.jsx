import PropTypes from "prop-types";

const Contribution = ({ contribution }) => {
  return (
    <div>
      <h1>Contributions</h1>
      <ul>
        <li key={contribution._id}>
          <p>{contribution.text}</p>
          {/* Render other contribution properties as needed */}
        </li>
      </ul>
    </div>
  );
};

Contribution.propTypes = {
  contribution: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contribution;
