export default (state, action) => {
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
