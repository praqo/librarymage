import { useState } from "react";
import Link from "next/link";
import Router from "next/router";

function Search() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.replace(/ /g, "")) {
      setInputValue("");

      return;
    }
    
    Router.push({
      pathname: "/search",
      query: { q: inputValue },
    });
  };

  const handleChange = (e) => {
    const newValue = e.currentTarget.value;
    setInputValue(newValue);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit" className="button">
        Search
      </button>
    </form>
  );
  search;
}

export default Search;
