import "../assets/styles/components/BookShowcase/bookshowcase.css";
import React, { useContext, useEffect, useState } from "react";
import cover from "../assets/svgs/cover.png";
import { BookContext } from "../providers/BookContext";
import { Link } from "react-router-dom";

const BookShowcase = ({ category }) => {
  const { books, getTopBooks } = useContext(BookContext);
  const [booksList, setBooksList] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    switch (category) {
      case "top":
        setTitle("Top 4");
        setBooksList(getTopBooks);
        break;
      case "like-this":
        setTitle("You might like");
        setBooksList(books);
        break;
      default:
        setTitle("Error");
        setBooksList(books);
        break;
    }
  }, [category, books, getTopBooks]);

  return (
    <section className="showcase-section">
      <h2 className="showcase-title">{title}</h2>
      <div className="showcase-wrapper">
        {booksList &&
          booksList.slice(0, 4).map((book) => (
            <div className="profile-book" key={"BOOK_KEY_" + book._id}>
              <div className="top-wrapper">
                <div>
                  <img
                    className="profile-book-image"
                    src={cover}
                    width={120}
                    height={190}
                    alt="Placeholder of an image of a book"
                  />
                </div>
                <div className="button-wrapper">
                  <button
                    className="link"
                    onClick={() => {
                      window.location.href = "/read?id=" + book._id;
                    }}
                  >
                    <Link to={"/read?id=" + book._id}>
                      <img
                        src="src/assets/svgs/book.svg"
                        alt="icon of a book"
                      />
                    </Link>
                  </button>
                  <button
                    className="link"
                    onClick={() => {
                      window.location.href = "/write?id=" + book._id;
                    }}
                  >
                    <Link to={"/write?id=" + book._id}>
                      <img
                        src="src/assets/svgs/book-home.svg"
                        alt="icon of a book"
                      />
                    </Link>
                  </button>
                </div>
              </div>
              <h3 className="profile-book-title">{book.title}</h3>
            </div>
          ))}
      </div>
    </section>
  );
};

export default BookShowcase;
