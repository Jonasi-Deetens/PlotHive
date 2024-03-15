import React from "react";
import BookShowcase from "../components/BookShowcase";

const Store = () => {
  return (
    <div>
      <BookShowcase category={"top"} />
      <BookShowcase category={"like-this"} />
    </div>
  );
};

export default Store;
