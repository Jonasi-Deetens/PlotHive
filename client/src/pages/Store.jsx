import { useEffect, useState } from "react";
import "../assets/styles/pages/Store/store.css";
import BookShowcase from "../components/BookShowcase";
import SearchBar from "../components/SearchBar";
useState;

const Store = () => {
  const [query, setQuery] = useState(null);
  const [genres, setGenres] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  let timeoutId = null;

  let handleSearch = ({ currentTarget = {} }) => {
    const { value } = currentTarget;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      setQuery(value);
    }, 300);
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
          onChange={handleSearch}
        />
        <div className="book-store-showcase-all">
          <div className="book-store-showcase1">
            <BookShowcase
              category={"search-results"}
              query={query}
              selectedGenre={selectedGenre}
            />
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
