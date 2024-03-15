import "../assets/styles/pages/Store/store.css";
import BookShowcase from "../components/BookShowcase";
// import loupe from "../assets/svgs/search.png";

const Store = () => {
  return (
    <>
      <body className="store-page-body">
        <div className="store-page-banner"></div>
        <div className="store-search-bar">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="e.g. Pieter and the little kids..."
          />
          <a href="">
            <img src="../assets/svgs/404-bee.svg" alt="search loupe image" />
          </a>
        </div>
        <div className="book-store-showcase-all">
          <div className="book-store-showcase1">
            <BookShowcase category={"top"} />
          </div>
          <br />
          <div className="book-store-showcase2">
            <BookShowcase category={"like-this"} />
          </div>
        </div>
      </body>
    </>
  );
};

export default Store;
