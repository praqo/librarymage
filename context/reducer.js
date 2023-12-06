const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return { ...state, isLoading: true };
  }

  if (action.type === "SEARCH_RESULTS") {
    return { ...state, searchResults: action.payload, isLoading: false };
  }

  return state;
};

export default reducer;
