import "../assets/styles/pages/Store/store.css";
import BookShowcase from "../components/BookShowcase";
import SearchBar from "../components/SearchBar";

const Store = () => {
  return (
    <>
      <div className="store-page-body">
        <div className="store-page-banner">
          <h1 className="store-page-titel">
            Shop our community written books!
          </h1>
        </div>
        <SearchBar placeholder="e.g. Pieter and the little kids..." />
        <div className="book-store-showcase-all">
            <BookShowcase category={"top"} />
          <br />
            <BookShowcase category={"like-this"} />
        </div>
      </div>
    </>
  );
};

export default Store;
