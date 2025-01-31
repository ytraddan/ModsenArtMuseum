import { HomePageLoaderData } from '@/utils/loaders';
import { useLoaderData, useSearchParams } from 'react-router';

export default function Pagination() {
  const { totalPages, page } = useLoaderData() as HomePageLoaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <button
        onClick={() =>
          setSearchParams((prev) => {
            prev.set('page', `${page - 1}`);
            return prev;
          })
        }
        disabled={parseInt(searchParams.get('page') || '1') === 1}
      >
        Previous
      </button>
      <span>
        {page} of {totalPages}
      </span>
      <button
        onClick={() =>
          setSearchParams((prev) => {
            prev.set('page', `${page + 1}`);
            return prev;
          })
        }
      >
        Next
      </button>
    </div>
  );
}
