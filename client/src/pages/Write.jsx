import '../assets/styles/pages/Write/write.css';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserContext";
import { useNavigate } from "react-router-dom";
import Contribution from "../components/Contribution";
import { BookContext } from "../providers/BookContext";
import Tinymce from "../components/Tinymce";

const Write = () => {
  const { authUser, user } = useContext(UserContext);
  const { getBookById } = useContext(BookContext);
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        if (!user) {
          console.log('a')
          const checkAuth = await authUser();
          if (!checkAuth) {
            navigate("/Login");
            return;
          }
        } else {
          console.log('b')
          if (!book) {
            console.log('c')
            setBook(getBookById(getBookIdFromUrl()));
          }
        }
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };
    isAuthorized();
  }, [authUser, user]);

  const getBookIdFromUrl = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("id");
  };

  return (
    <>
      {book && (
        <div className="write-page">
          <div className="write-book">
            <h1 className='title'>{book.title}</h1>
            <div className="write-book-contributions">
              <h3 className='book-prompt'>{`"${book.prompt_id.content}..."`}</h3>
              <p>{book.contributions?.[0]?.text}</p>
              <Tinymce bookId={book._id} />
            </div>
            <div className="write-current-contributions">
              <h2 className='title'>Contributions</h2>
              {book.contributions.map((contribution, index) => (
                (user && contribution.user_id._id != user._id) && 
                <div key={contribution._id}>
                  <Contribution contribution={contribution} />
                  {index < book.contributions.length - 1 && <hr />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Write;