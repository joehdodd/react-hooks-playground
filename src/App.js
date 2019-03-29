import React from "react";

import "./styles.css";

let randomNumber = 0;

const getRandomNumber = () => {
  return (randomNumber = Math.floor(Math.random() * 160));
};

const Row = React.memo(({ setShowData, gif, selected }) => {
  console.log("row re-rendered!", gif.id);
  return (
    <div
      className="row"
      style={
        selected
          ? { border: "2px solid tomato" }
          : { border: "2px solid transparent" }
      }
      onClick={() => setShowData(gif, gif.id)}
    >
      <img src={gif.images.fixed_height_small.url} alt={gif.title} />
      <div className="row-info">
        <span style={{ color: "tomato", fontSize: "32px" }}>
          {randomNumber}
        </span>
        <p>{gif.id}</p>
      </div>
    </div>
  );
});

const getRandomSearchString = () => {
  const randomNumber = () => Math.floor(Math.random() * (7 - 0 + 1)) + 0;
  const map = {
    0: "tennessee",
    1: "tacos",
    2: "new york city",
    3: "ireland",
    4: "airplanes",
    5: "doge",
    6: "kung fu",
    7: "explosions"
  };
  return map[randomNumber()];
};

const gifReducer = (state, action) => {
  switch (action.type) {
    case "set-gifs":
      return {
        ...state,
        gifs: action.gifs
      };
    case "select-gif":
      return {
        ...state,
        selectedData: action.selectedData,
        selectedRow: action.id
      };
    default:
      return {
        ...state
      };
  }
};

const App = props => {
  getRandomNumber();
  const KEY = "OJ3Y53fPIs7cHSRfaYqxjIpcXy8Bgv61";
  const [state, dispatch] = React.useReducer(gifReducer, {
    gifs: [],
    selectedData: null,
    selectedRow: null
  });
  React.useEffect(() => {
    const getGifs = async search => {
      const searchString = search.split(" ").join("+");
      const { data: fetchedGifs } = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${searchString}&api_key=${KEY}&limit=4`
      ).then(res => res.json());
      return dispatch({ type: "set-gifs", gifs: fetchedGifs });
    };
    getGifs(getRandomSearchString());
  }, []);
  const showData = React.useCallback((data, id) => {
    dispatch({ type: "select-gif", selectedData: data, id });
  }, []);
  return (
    <div className="page-container">
      <div className="data-container">
        {!!state.selectedData && (
          <pre>{JSON.stringify(state.selectedData, null, 2)}</pre>
        )}
      </div>
      <div className="row-container">
        {!!state.gifs.length &&
          state.gifs.map(gif => (
            <Row
              key={gif.id}
              gif={gif}
              setShowData={showData}
              selected={gif.id === state.selectedRow}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
