import { createContext, useState } from "react";
import { useRouter } from "next/router";

export const AppContext = createContext();

export function ContextProvider({ children }) {
  const router = useRouter();
  const [searchData, setSearchData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (url) => {
    try {
      setIsLoading(true);
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setSearchData(data);
      console.log(searchData);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("error try again later");
      router.push("/");
    }
  };

  const filterData = (data) => {
    const filteredDataArr = [];
    console.log(data);
    data.allData.cards.forEach((card) => {
      let duplicateCard = false;
      if (card.printings.length > 1) {
        for (let i = 0; i < filteredDataArr.length; i++) {
          if (card.name === filteredDataArr[i].name) {
            duplicateCard = true;
            break;
          }
        }
      }

      if (!duplicateCard) {
        filteredDataArr.push(card);
      }
    });
    console.log(filteredDataArr);
    setFilteredData({
      data: filteredDataArr,
      totalCount: data.totalCount,
    });
    setIsLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        searchData,
        filteredData,
        currentSearchPage,
        setCurrentSearchPage,
        isLoading,
        searchQuery,
        setSearchQuery,
        fetchData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
