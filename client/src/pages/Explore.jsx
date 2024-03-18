import { useState } from "react";
import "../assets/styles/pages/Explore/explore.css";
import loupe from "../assets/svgs/search.png";
import BookShowcase from "../components/BookShowcase";
useState;

const Explore = () => {
  const [query, setQuery] = useState(null);

  let handleSearch = ({ currentTarget = {} }) => {
    const { value } = currentTarget;
    setQuery(value);
  };

  return (
    <>
      <h1>Explore our titles!</h1>
      <div className="search-bar">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="e.g. Pieter and the little kids..."
          onChange={handleSearch}
        />
        <a href="">
          <img src={loupe} alt="search loupe image" />
        </a>
      </div>
      <BookShowcase category={"search-results"} query={query} />
      <BookShowcase category={"like-this"} />
    </>
  );
};

export default Explore;
