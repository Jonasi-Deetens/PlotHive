import { useEffect, useState } from "react";
import "../assets/styles/components/SearchBar/searchbar.css";
import BookShowcase from "./BookShowcase";

const SearchBar = ({ placeholder }) => {
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

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/api/genres", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          const titles = data.map((genre) => genre.title);
          setGenres(titles);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    };

    getGenres();
  }, []);

  let handleSelected = (genre) => {
    if (genre === selectedGenre) {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genre);
    }
  };
  
  return (
    <>
      <div className="search-bar">
        <input
          type="search"
          name="search"
          id="search"
          placeholder={placeholder}
          onChange={handleSearch}
        />
        <div className="button-div">
          <button className="searchbar-button" onClick={handleSearch}>
            <img src="src/assets/svgs/search.png" alt="search-loupe-image" />
          </button>
        </div>
      </div>
      <div className="search-buttons">
        <ul className="buttons-list">
          {genres &&
            genres.map((genre) => (
              <button key={genre} onClick={() => handleSelected(genre)}>
                {genre}
              </button>
            ))}
        </ul>
      </div>
      {(query || selectedGenre) && (
        <BookShowcase
          category={"search-results"}
          query={query}
          selectedGenre={selectedGenre}
        />
      )}
    </>
  );
};

export default SearchBar;
