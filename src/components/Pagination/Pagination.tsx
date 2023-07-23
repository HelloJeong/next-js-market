"use client";
import usePagination from "@lucasmogari/react-pagination";
import React from "react";
import PaginationLink from "./PaginationLink";

interface PaginationProps {
  page: number;
  totalItems: number;
  perPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalItems, perPage }) => {
  const { fromItem, toItem, getPageItem, totalPages } = usePagination({
    totalItems: totalItems,
    page: page,
    itemsPerPage: perPage,
    maxPageItems: 5,
  });

  const firstPage = 1;
  const nextPage = Math.min(page + 1, totalPages);
  const prevPage = Math.max(page - 1, firstPage);

  const arr = new Array(totalPages + 2); // + 2 => < , > 각각의 아이콘도 추가하기 위해

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {[...arr].map((_, i) => {
        const { page, disabled, current } = getPageItem(i);
        // console.log("getPageItem(i)", getPageItem(i));

        if (page === "previous") {
          return (
            <PaginationLink key={i} page={prevPage} disabled={disabled}>
              {"<"}
            </PaginationLink>
          );
        }

        if (page === "next") {
          return (
            <PaginationLink key={i} page={nextPage} disabled={disabled}>
              {">"}
            </PaginationLink>
          );
        }

        if (page === "gap") {
          return <span key={i}>...</span>;
        }

        return (
          <PaginationLink key={i} active={current} page={page}>
            {page}
          </PaginationLink>
        );
      })}
    </div>
  );
};

export default Pagination;
