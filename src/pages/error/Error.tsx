import {
  useRouteError,
  isRouteErrorResponse,
  useRevalidator,
} from 'react-router';
import './error.scss';
import Loading from '@/components/loading/Loading';

export default function ErrorPage() {
  const error = useRouteError();
  const revalidator = useRevalidator();

  console.error(error);

  let errorMessage: string;
  let statusCode: number | null = null;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage = error.statusText || 'An unexpected error occurred.';
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'An unknown error occurred.';
  }

  return (
    <div className="error-page">
      <div className="error-content">
        <h1>
          Sorry, an unexpected <span className="highlight">Error</span> has
          occurred
        </h1>
        <div className="error-details">
          {statusCode && (
            <p className="status-code">Status Code: {statusCode}</p>
          )}
          <p className="error-message">{errorMessage}</p>
        </div>

        <button
          className="refresh"
          onClick={revalidator.revalidate}
          disabled={revalidator.state === 'loading'}
        >
          Try again
        </button>
        {revalidator.state === 'loading' && (
          <div className="loading-container">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
