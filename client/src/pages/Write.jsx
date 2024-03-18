import '../assets/styles/pages/Write/write.css'
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
          <div className="write-book">
            <h1 className='title'>{book.title}</h1>
            <div className="write-book-contributions">
              <h3 className='book-prompt'>{'"' + book.prompt_id.content + '...,"'}</h3>
              <p>{book.contributions && book.contributions.length > 0 && book.contributions[0].text}</p>
              <Tinymce bookId={book._id} />
            </div>
            <div className="write-current-contributions">
              <h2 className='title'>Contributions</h2>
              {book.contributions.map((contribution, index) => (
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
