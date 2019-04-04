import React from "react";

export default ({ gif }) => {
  return (
    <div
      className="gif-row"
      style={{
        backgroundImage: `url(${gif.images.original.url})`,
        backgroundSize: "cover",
        height: `${gif.images.fixed_height.height}px`
      }}
    >
      <div className="gif-info">
        <h2>{gif.title}</h2>
      </div>
    </div>
  );
};
