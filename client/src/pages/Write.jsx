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
    
    let todaysContributions = foundBook.contributions.filter(
      (contribution) => {
        return contribution.created_at.slice(0, 10) === today;
      }
    );

    todaysContributions = todaysContributions.sort((contA, contB) => {
      const voteA = contA.upvoters.length;
      const voteB = contB.upvoters.length;
      return voteB - voteA;
    })
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

  const genresToString = () => {
    if (book) {
      let genres = "("
      
      book.genres.forEach((genre, index) => {
        if (index === 0) genres += genre.title;
        else {
          genres += ", " + genre.title
        }
      })

      genres += ")";
      return genres;
    }
    return "";
  }

  const getBookIdFromUrl = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("id");
  };

  return (
    <>
      {book && user && (
        <div className="write-page">
          <div className="write-book">
            <h1 className='title'>{book.title}</h1>
            <p className='genres'>{genresToString()}</p>

            <div className="write-book-contributions">
              <FavouriteButton book={book} />
              <h2 className="book-prompt">{`"${book.prompt_id.content}..."`}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: book.sections?.[book.sections.length-1]?.text }}
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
                    <div key={contribution._id} className={index == 0 ? "highlight" : ""}>
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
