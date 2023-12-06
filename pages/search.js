import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "../components/Pagination";
import { useGlobalContext } from "../context/context";

function search() {
  const router = useRouter();
  const [fetchedData, setFetchedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { searchData, searchResults, isLoading } = useGlobalContext();

  useEffect(() => {
    console.log(router.query.q);
    if (router.query.q) {
      setSearchQuery(router.query.q);
    }

    if (router.query.page) {
      setPage(router.query.page);
    }
  });

  useEffect(() => {
    if (searchQuery) {
      searchData(
        `https://api.magicthegathering.io/v1/cards?name=${searchQuery}&page=${page}`
      );
    }
  }, [searchQuery]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h3>Search results</h3>
      <div className="grid">
        {searchResults.cards.map((card) => {
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
      {fetchedData.totalCount / 100 > 1 && <Pagination data={fetchedData} />}
    </div>
  );
}

export default search;
