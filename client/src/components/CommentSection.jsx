/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { UserContext } from "../providers/UserContext";
import { Navigate } from "react-router-dom";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import "../assets/styles/components/CommentSection/commentSection.css";

const CommentSection = ({ contribution }) => {
  const { user, authUser } = useContext(UserContext);

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

  return (
    <div className="comment-section">
      <h4>Comments:</h4>
      {contribution?.comments &&
        contribution.comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      <CommentInput contribution={contribution} />
    </div>
  );
};

export default CommentSection;
