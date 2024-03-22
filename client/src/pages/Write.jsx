import "../assets/styles/pages/Write/write.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Contribution from "../components/Contribution";
import { BookContext } from "../providers/BookContext";
import Tinymce from "../components/Tinymce";
import FavouriteButton from "../components/FavouriteButton";

const Write = () => {
  const { authUser, user } = useContext(UserContext);
  const { books, getBookById } = useContext(BookContext);
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [contributions, setContributions] = useState(null);
  const [userContributed, setUserContributed] = useState(false);
  const [userContribution, setUserContribution] = useState(null);

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        if (!user) {
          console.log("a");
          const checkAuth = await authUser();
          if (!checkAuth) {
            navigate("/Login");
            return;
          }
        }
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };
    isAuthorized();
  }, [authUser, user]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const bookId = getBookIdFromUrl();
    const foundBook = getBookById(bookId);
    setBook(foundBook);

    const todaysContributions = foundBook.contributions.filter(
      (contribution) => {
        console.log(contribution);
        return contribution.created_at.slice(0, 10) === today;
      }
    );
    setContributions(todaysContributions);

    if (user && book && contributions) {
      const contribution = contributions.find(
        (contribution) => contribution.user_id._id === user._id
      );

      if (contribution) {
        setUserContributed(true);
        setUserContribution(contribution);
      } else {
        setUserContributed(false);
        setUserContribution(null);
      }
    }
  }, [user, book, books]);

  const getBookIdFromUrl = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("id");
  };

  return (
    <>
      {book && user && (
        <div className="write-page">
          <div className="write-book">
            <h1 className="title">{book.title}</h1>
            <div className="write-book-contributions">
              <FavouriteButton book={book} />
              <h2 className="book-prompt">{`"${book.prompt_id.content}..."`}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: book.sections?.[0]?.text }}
              ></div>
              {userContributed ? (
                <div>
                  <Contribution
                    contribution={userContribution}
                    userContribution={true}
                  />
                  <Link to={"/read?id=" + book._id}>
                    <button className="editor-submit">Read</button>
                  </Link>
                </div>
              ) : (
                <Tinymce bookId={book._id} setBook={setBook} />
              )}
            </div>
            <div className="write-current-contributions">
              <h2 className="title">Contributions</h2>
              {contributions?.map(
                (contribution, index) =>
                  contribution.user_id._id != user._id && (
                    <div key={contribution._id}>
                      <Contribution contribution={contribution} />
                      {index < book.contributions.length - 1 && <hr />}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Write;
