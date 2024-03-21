import "../assets/styles/components/SearchBar/searchbar.css";

const SearchBar = ({ placeholder, buttonText, onSubmit }) => {
  return (
    <div className="search-bar">
      <input
        type="search"
        name="search"
        id="search"
        placeholder={placeholder}
      />
      <div className="button-div">
        <button className="searchbar-button" onClick={onSubmit}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
