import { useSearchParams } from 'react-router';
// import { HomePageLoaderData } from "@/utils/loaders";
// import { useLoaderData } from "react-router";
import { useState } from 'react';

export default function Search() {
  // const { totalPages, page } = useLoaderData() as HomePageLoaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || ''
  );

  return (
    <input
      type="search"
      placeholder="Search artworks..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setSearchParams(
          (prev) => {
            prev.set('q', e.target.value);
            prev.set('page', '1');
            return prev;
          },
          { replace: true }
        );
      }}
    />
  );
}
