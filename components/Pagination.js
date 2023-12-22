import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobalContext } from "../context/context";
import Router, { useRouter } from "next/router";

export default function Pagination({ pageQuery, activePage }) {
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
        const pageNum = i + 1;
        return (
          <button
            key={i}
            onClick={() => handleClick(pageNum)}
            className={
              +activePage === pageNum
                ? "pagination-button active-button"
                : "pagination-button"
            }
          >
            {pageNum}
          </button>
        );
      })}
    </h5>
  );
}
