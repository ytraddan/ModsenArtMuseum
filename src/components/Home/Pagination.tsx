import { HomePageLoaderData } from '@/utils/loaders';
import { useLoaderData, useSearchParams } from 'react-router';

export default function Pagination() {
  const { totalPages, page } = useLoaderData() as HomePageLoaderData;
  const [, setSearchParams] = useSearchParams();

  if (totalPages === 0) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() =>
          setSearchParams(
            (prev) => {
              prev.set('page', `${page - 1}`);
              return prev;
            },
            { replace: true }
          )
        }
        disabled={page === 1}
      >
        Previous
      </button>
      <span>
        {page} of {totalPages}
      </span>
      <button
        onClick={() =>
          setSearchParams(
            (prev) => {
              prev.set('page', `${page + 1}`);
              return prev;
            },
            { replace: true }
          )
        }
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
