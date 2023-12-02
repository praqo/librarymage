import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function search() {
  const router = useRouter();
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setFetchedData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alert("error try again later");
      router.push("/");
    }
  };

  useEffect(() => {
    setSearchQuery(router.query.q);
    console.log(searchQuery);
  });

  useEffect(() => {
    if (searchQuery) {
      const url = `https://api.magicthegathering.io/v1/cards?name=${searchQuery}`;

      fetchData(url);
    }
  }, [searchQuery]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h3>Search results</h3>
      <div>{JSON.stringify(fetchedData)}</div>
    </div>
  );
}

export default search;
