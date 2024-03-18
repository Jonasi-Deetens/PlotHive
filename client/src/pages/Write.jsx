import { useContext } from "react";
import { UserContext } from "../providers/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Contribution from "../components/Contribution";
import { BookContext } from "../providers/BookContext";
import Tinymce from "../components/Tinymce";

const Write = () => {
  const { authUser, user } = useContext(UserContext);
  const navigate = useNavigate();
  //const [contributions, setContributions] = useState([]);
  //const [book, setBook] = useState();

  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get("id");

  const { getBookById } = useContext(BookContext);
  const book = getBookById(bookId);

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        if (!user) {
          const checkAuth = await authUser();
          if (!checkAuth) {
            navigate("/Login");
          }
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
          <h3>{book.prompt_id.content}</h3>
          <div className="write-book">
            <div className="write-book-contributions">
              <p>{book.text}</p>
              <Tinymce bookId={book._id} />
            </div>
            <div className="write-current-contributions">
              <h1>Contributions</h1>
              {book.contributions.map((contribution) => (
                <Contribution
                  key={contribution._id}
                  contribution={contribution}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Write;
