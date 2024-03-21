import "../assets/styles/pages/Store/store.css";
import BookShowcase from "../components/BookShowcase";
import SearchBar from "../components/SearchBar";

const Store = () => {
  const handleSearch = () => {
    // Handle search logic here
  };

  return (
    <>
      <div className="store-page-body">
        <div className="store-page-banner">
          <h1 className="store-page-titel">
            Shop our community written books!
          </h1>
        </div>
        <SearchBar
          placeholder="e.g. Pieter and the little kids..."
          buttonText={
            <img src="src/assets/svgs/search.png" alt="search-loupe-image" />
          }
          onSubmit={handleSearch}
        />
        <div className="book-store-showcase-all">
          <div className="book-store-showcase1">
            <BookShowcase category={"top"} />
          </div>
          <br />
          <div className="book-store-showcase2">
            <BookShowcase category={"like-this"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
