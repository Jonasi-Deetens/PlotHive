import "../assets/styles/components/Contribution/contribution.css";

const Contribution = ({ contribution }) => {
  const { text, upvote_count, user_id } = contribution;
  const username = user_id.username;

  return (
    <div className="contribution-component">
      <div className="contribution-wrapper">
        <button className="contribution-button">
          <img
            src="src/assets/svgs/vote.svg"
            alt="icon of a arrow pointing up"
          />
        </button>
        <p>{upvote_count}</p>
      </div>
      <p>{text}</p>
      <p className="contribution-author">By: {username}</p>
    </div>
  );
};

export default Contribution;
