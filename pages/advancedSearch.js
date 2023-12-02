import Link from "next/link";
import { useRouter } from "next/router";

function advancedSearch() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return <h2>advanced search</h2>;
}

export default advancedSearch;
