import React from "react";
import { Link } from "react-router-dom";

let randomNumber = 0;

const getRandomNumber = () => {
  return (randomNumber = Math.floor(Math.random() * 160));
};

export default React.memo(({ setShowData, gif, selected }) => {
  console.log("row re-rendered!", gif.id);
  getRandomNumber();
  return (
    <Link to={gif.id}>
      <div
        className="card-wrapper hover"
        style={
          selected
            ? { border: "2px solid tomato" }
            : { border: "2px solid transparent" }
        }
      >
        <div className="row-container">
          <img src={gif.images.fixed_height_small.url} alt={gif.title} />
          <div className="row-info">
            <span style={{ color: "tomato", fontSize: "32px" }}>
              {randomNumber}
            </span>
            <div
              className="gif-id-container"
              onClick={e => setShowData(e, gif, gif.id)}
            >
              <p style={{ margin: 0 }}>{gif.id}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});
