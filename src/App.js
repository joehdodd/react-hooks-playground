import React from "react";
import axios from "axios";

import "./styles.css";

let randomNumber = 0;

const getRandomNumber = () => {
  return (randomNumber = Math.floor(Math.random() * 160));
};

const Row = React.memo(({ setShowData, gif, selected }) => {
  // console.log("row re-rendered!", gif.id);
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
    case "set-query":
      return {
        ...state,
        searchQuery: action.searchQuery
      };
    case "set-input-value":
      return {
        ...state,
        inputValue: action.inputValue
      };
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

const App = () => {
  getRandomNumber();
  const [state, dispatch] = React.useReducer(gifReducer, {
    gifs: [],
    selectedData: null,
    selectedRow: null,
    inputValue: "",
    searchQuery: getRandomSearchString()
  });
  React.useEffect(() => {
    const getGifs = async () => {
      const urlQuery = state.searchQuery.split(" ").join("+");
      const url = `https://api.giphy.com/v1/gifs/search?q=${urlQuery}&api_key=OJ3Y53fPIs7cHSRfaYqxjIpcXy8Bgv61&limit=8`;
      const { data: fetchedGifs } = await axios.get(url).then(res => res.data);
      return dispatch({ type: "set-gifs", gifs: fetchedGifs });
    };
    getGifs();
  }, [state.searchQuery]);
  const showData = React.useCallback((data, id) => {
    dispatch({ type: "select-gif", selectedData: data, id });
  }, []);
  return (
    <div className="page-container">
      <div className="search-container">
        <input
          type="text"
          value={state.inputValue}
          onChange={e =>
            dispatch({
              type: "set-input-value",
              inputValue: e.target.value
            })
          }
        />
        <button
          type="submit"
          onClick={() =>
            dispatch({
              type: "set-query",
              searchQuery: state.inputValue
            })
          }
        >
          Search
        </button>
      </div>
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
