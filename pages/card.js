import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function card() {
  const router = useRouter();
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setFetchedData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alert("error try again later");
      router.push("/");
    }
  };

  useEffect(() => {
    setSearchQuery(router.query.id);
    console.log(searchQuery);
  });

  useEffect(() => {
    if (searchQuery) {
      const url = `https://api.magicthegathering.io/v1/cards/${searchQuery}`;

      fetchData(url);
    }
  }, [searchQuery]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container">
      <div className="grid">
        <div className="col">
            <div className="card-name">{fetchedData.card.name}</div>
          </div>
        <div className="col">
          <img src={fetchedData.card.imageUrl} alt="{fetchedData.card.name}" />
        </div>
        <div className="col">
          <div>
            <h5>legalities</h5>
            {fetchedData.card.legalities.map((item) => {
              return (
                <div key={item.format}>
                  {item.format}: {item.legality}
                </div>
              );
            })}
          </div>
          <div>
            <h5>printings</h5>
            {fetchedData.card.printings.map((item) => {
              return <span key={item}>{item}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default card;
