import React from "react";
import { Link, Route } from "react-router-dom";
import Search from "./Search";
import Row from "./Row";
import axios from "axios";

import "../styles.css";

const getRandomSearchString = () => {
  const randomNumber = () => Math.floor(Math.random() * (8 - 0 + 1)) + 0;
  const map = {
    0: "tennessee",
    1: "tacos",
    2: "new york city",
    3: "ireland",
    4: "airplanes",
    5: "doge",
    6: "kung fu",
    7: "explosions",
    8: "kazoo kid"
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
  const showData = React.useCallback((e, data, id) => {
    e.preventDefault();
    dispatch({ type: "select-gif", selectedData: data, id });
  }, []);
  // const showData = (e, data, id) => {
  //   e.preventDefault();
  //   dispatch({ type: "select-gif", selectedData: data, id });
  // };
  return (
    <div className="page-container">
      <Search
        inputValue={state.inputValue}
        onChange={e =>
          dispatch({
            type: "set-input-value",
            inputValue: e.target.value
          })
        }
        onClick={() =>
          dispatch({
            type: "set-query",
            searchQuery: state.inputValue
          })
        }
      />
      <Route
        path="/"
        exact
        render={() => (
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
        )}
      />
      <Route
        path={"/:gifId"}
        render={({ match }) => (
          <div className="data-container">
            <Link to="/">
              <button>Back</button>
            </Link>
            <pre>
              {JSON.stringify(
                state.gifs.find(gif => gif.id === match.params.gifId),
                null,
                2
              )}
            </pre>
          </div>
        )}
      />
    </div>
  );
};

export default App;
