import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function search() {
  const router = useRouter();
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log({
        allData: data,
        totalCount: response.headers.get("Total-Count"),
      });
      filterData({
        allData: data,
        totalCount: response.headers.get("Total-Count"),
      });
    } catch (error) {
      console.log(error);
      alert("error try again later");
      router.push("/");
    }
  };

  const filterData = (data) => {
    const filteredData = [];
    data.allData.cards.forEach((card) => {
      let duplicateCard = false;
      if (card.printings.length > 1) {
        for (let i = 0; i < filteredData.length; i++) {
          if (card.name === filteredData[i].name) {
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
    setFetchedData({
      data: filteredData,
      totalCount: data.totalCount,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    setSearchQuery(router.query.q);
    console.log(searchQuery);
  });

  useEffect(() => {
    if (searchQuery) {
      const url = `https://api.magicthegathering.io/v1/cards?name=${searchQuery}&page=1`;

      fetchData(url);
    }
  }, [searchQuery]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h3>Search results</h3>
      <div className="grid">
        {fetchedData.data.map((card) => {
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
    </div>
  );
}

export default search;
