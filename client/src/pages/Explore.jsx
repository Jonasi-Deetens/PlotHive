import { useState } from "react";
import "../assets/styles/pages/Explore/explore.css";
import loupe from "../assets/svgs/search.png";
import BookShowcase from "../components/BookShowcase";
useState;

const Explore = () => {
  const [query, setQuery] = useState(null);
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
    <main>
      <h1 className="explore">Explore our titles!</h1>
      <div className="search-bar">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="e.g. Pieter and the little kids..."
          onChange={handleSearch}
        />
        <img src={loupe} alt="search loupe image" />
      </div>
      {query && <BookShowcase category={"search-results"} query={query} />}
      <BookShowcase category={"like-this"} />
    </main>
  );
};

export default Explore;
