import React from "react";
import { Link } from "react-router-dom";

export default ({ gif }) => {
  return (
    <div className="details-container">
      <Link to="/">
        <button>Back</button>
      </Link>
      <h2>{gif.title}</h2>
      <img
        className="gif-image"
        src={gif.images.original.url}
        alt={gif.title}
      />
    </div>
  );
};
