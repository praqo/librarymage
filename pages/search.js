import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "../components/Pagination";
import { useGlobalContext } from "../context/context";

function Search() {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { searchData, searchResults, isLoading } = useGlobalContext();

  const filterCardData = (data) => {
    console.log(data);
    const filteredData = [];
    data.allData.cards.forEach((card) => {
      let duplicateCard = false;
      if (card.printings.length > 1) {
        for (let i = 0; i < filteredData.length; i++) {
          if (card.name === filteredData[i].name || !card.imageUrl) {
            duplicateCard = true;
            break;
          }
        }
      }

      if (!duplicateCard) {
        filteredData.push(card);
      }
    });
    console.log(filteredData);
    setFilteredData(filteredData);
  };

  useEffect(() => {
    console.log(router.query.q);
    if (router.query.q) {
      setSearchQuery(router.query.q);
    }

    setPage(router.query.page || 1);
  });

  useEffect(() => {
    if (searchQuery) {
      searchData(
        `https://api.magicthegathering.io/v1/cards?name=${searchQuery}&page=${page}`
      );
    }
  }, [searchQuery, page]);

  useEffect(() => {
    console.log(searchResults);
    if (searchResults.length || searchResults.allData) {
      filterCardData(searchResults);
    }
    console.log(filteredData);
  }, [searchResults]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h3>Search results {page && `page ${page}`}</h3>
      <div className="grid">
        {filteredData.map((card) => {
          return (
            <div key={card.id} className="grid-item">
              <Link
                href={{ pathname: "card", query: { id: card.multiverseid } }}
              >
                <a className="card-link">
                  <img src={card.imageUrl} alt="" className="card-image" />
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      {searchResults.totalCount / 100 > 1 && (
        <Pagination pageQuery={searchQuery} activePage={page} />
      )}
    </div>
  );
}

export default Search;
