import { useEffect, useState } from "react";
import "../assets/styles/pages/Explore/explore.css";
import BookShowcase from "../components/BookShowcase";
import SearchBar from "../components/SearchBar";

const Explore = () => {

  return (
    <main className="explore-page">
      <h1 className="explore">Explore our titles!</h1>
      <SearchBar placeholder={"Pieter and the little kids..."} />
      <BookShowcase category={"like-this"} />
    </main>
  );
};

export default Explore;
