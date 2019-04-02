import React from "react";
import { Route } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import gifReducer from "../gifReducer";
import getRandomSearchString from "../getRandomSearchString";
import ThemeButton from "./ThemeButton";
import Card from "./Card";
import Search from "./Search";
import Row from "./Row";
import Details from "./Details";
import axios from "axios";

import "../styles.css";

const App = () => {
  const theme = React.useContext(ThemeContext);
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
      const url = `https://api.giphy.com/v1/gifs/search?q=${urlQuery}&api_key=OJ3Y53fPIs7cHSRfaYqxjIpcXy8Bgv61&limit=4`;
      const { data: fetchedGifs } = await axios.get(url).then(res => res.data);
      console.log(fetchedGifs);
      return dispatch({ type: "set-gifs", gifs: fetchedGifs });
    };
    getGifs();
  }, [state.searchQuery]);
  const showData = React.useCallback((e, data, id) => {
    e.preventDefault();
    dispatch({ type: "select-gif", selectedData: data, id });
  }, []);
  return (
    <div
      className="page-container"
      style={{
        color: theme.currentTheme.textColor
      }}
    >
      <ThemeButton type="button" onClick={() => theme.toggleTheme()}>
        Go {theme.currentTheme.toggleKey}
      </ThemeButton>
      <Search
        inputValue={state.inputValue}
        onChange={e =>
          dispatch({
            type: "set-input-value",
            inputValue: e.target.value
          })
        }
        onClick={e => {
          e.preventDefault();
          dispatch({
            type: "set-query",
            searchQuery: state.inputValue
          });
        }}
      />
      <Route
        path="/"
        exact
        render={() => (
          <div className="rows-container">
            {!!state.gifs.length &&
              state.gifs.map(gif => (
                <Card className="hover" theme={theme.currentTheme}>
                  <Row
                    key={gif.id}
                    gif={gif}
                    setShowData={showData}
                    selected={state.selectedRow === gif.id}
                  />
                </Card>
              ))}
          </div>
        )}
      />
      <Route
        path={"/:gifId"}
        render={({ match }) => (
          <Card theme={theme.currentTheme}>
            <Details
              gif={state.gifs.find(gif => gif.id === match.params.gifId)}
            />
          </Card>
        )}
      />
    </div>
  );
};

export default App;
