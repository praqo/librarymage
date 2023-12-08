import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobalContext } from "../context/context";
import Router, { useRouter } from "next/router";

export default function Pagination({ pageQuery }) {
  const router = useRouter();
  const { searchData, searchResults, isLoading } = useGlobalContext();
  const numerOfPages = Math.ceil(searchResults.totalCount / 100);

  const handleClick = (page) => {
    Router.push({
      pathname: "/search",
      query: {
        q: pageQuery,
        page,
      },
    });
  };

  return (
    <h5>
      Pages{" "}
      {[...Array(numerOfPages)].map((e, i) => {
        return (
          <span key={i} onClick={() => handleClick(i + 1)}>
            {i + 1}
          </span>
        );
      })}
    </h5>
  );
}
