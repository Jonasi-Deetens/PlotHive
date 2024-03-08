import React from "react";
import Tinymce from "../components/Tinymce";

export const Write = () => {
  return (
    <div className="write-page">
      <h1>
        “Jonasi stept out of the elevator with blood all over his face, ...”
      </h1>
      <div className="write-book">
        <div className="write-added-contributions">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae unde
            laudantium nisi velit officiis consectetur facere tempore hic quasi,
            est aspernatur at placeat in odio fugiat eius! Cumque, quae
            molestiae.
          </p>
          <Tinymce />
        </div>
        <div className="write-current-contributions"></div>
      </div>
    </div>
  );
};
