import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contribution from "../components/Contribution";
import Tinymce from "../components/Tinymce";

const Write = () => {
  const { authUser, user } = useContext(UserContext);
  const navigate = useNavigate();
  //const [contributions, setContributions] = useState([]);
  const [book, setBook] = useState();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/books/65f18ccb703f62991757d0ee",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contributions");
        }

        const data = await response.json();

        console.log(data);

        setBook(data);
      } catch (error) {
        console.error("Error fetching contributions:", error);
      }
    };

    fetchBook();
  }, [book]);

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        await authUser();
        if (!user) {
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to authenticate");
      }
    };

    isAuthorized();
  }, [authUser, navigate, user]);

  return (
    <>
      {book && (
        <div className="write-page">
          <h1>{book.title}</h1>
          <div className="write-book">
            <div className="write-book-contributions">
              <p>{book.text}</p>
              <Tinymce />
            </div>
            <div className="write-current-contributions">
              <Contribution contribution={book.contributions[1]} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Write;
