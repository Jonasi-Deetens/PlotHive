import { useEffect, useState } from "react";
import "../assets/styles/pages/Explore/explore.css";
import loupe from "../assets/svgs/search.png";
import BookShowcase from "../components/BookShowcase";
import SearchBar from "../components/SearchBar";

const Explore = () => {
  // const [query, setQuery] = useState(null);
  // const [genres, setGenres] = useState(null);
  // const [selectedGenre, setSelectedGenre] = useState(null);
  // let timeoutId = null;

  // let handleSearch = ({ currentTarget = {} }) => {
  //   const { value } = currentTarget;

  //   if (timeoutId) {
  //     clearTimeout(timeoutId);
  //   }

  //   timeoutId = setTimeout(() => {
  //     setQuery(value);
  //   }, 300);
  // };

  // useEffect(() => {
  //   const getGenres = async () => {
  //     try {
  //       const response = await fetch("http://127.0.0.1:5000/api/genres", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         const titles = data.map((genre) => genre.title);
  //         setGenres(titles);
  //       }
  //     } catch (error) {
  //       throw new Error(error.message);
  //     }
  //   };

  //   getGenres();
  // }, []);

  // let handleSelected = (genre) => {
  //   if (genre === selectedGenre) {
  //     setSelectedGenre(null);
  //   } else {
  //     setSelectedGenre(genre);
  //   }
  // };

  return (
    <main className="explore-page">
      <h1 className="explore">Explore our titles!</h1>
      <SearchBar placeholder={"Pieter and the little kids..."} />
      <BookShowcase category={"like-this"} />
    </main>
  );
};

export default Explore;
