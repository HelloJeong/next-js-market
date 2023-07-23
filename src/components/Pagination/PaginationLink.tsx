"use client";
import { PRODUCTS_PER_PAGE } from "@/constants";
import { useSearchParams } from "next/navigation";
import React, { PropsWithChildren } from "react";
import qs from "query-string";
import Link from "next/link";

type PaginationLinkProps = {
  page?: number | string;
  active?: boolean;
  disabled?: boolean;
} & PropsWithChildren; // children type을 이렇게도 넣을 수 있음

const PaginationLink: React.FC<PaginationLinkProps> = ({ page, active, disabled, children }) => {
  const params = useSearchParams();
  const limit = PRODUCTS_PER_PAGE;
  const skip = page ? (+page - 1) * limit : 0;

  let currentQuery = {};

  if (params) {
    currentQuery = qs.parse(params.toString());
  }

  const updatedQuery = {
    ...currentQuery,
    page,
    skip,
  };

  return (
    <Link
      href={{ query: updatedQuery }}
      className={`
      p-2
      text-2xl
      ${active ? "font-bold text-orange-500" : "text-gray-500"}
      ${disabled ? "pointer-events-none text-gray-200" : ""}
    `}
    >
      {children}
    </Link>
  );
};

export default PaginationLink;
