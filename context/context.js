import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

const AppContext = createContext();

const initialState = {
  isLoading: true,
  searchResults: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchData = async (url) => {
    dispatch({ type: "LOADING" });
    try {
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();

      dispatch({
        type: "SEARCH_RESULTS",
        payload: {
          allData: data,
          totalCount: response.headers.get("Total-Count"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        searchData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
