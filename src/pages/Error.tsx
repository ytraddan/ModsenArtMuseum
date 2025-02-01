// src/pages/ErrorPage.tsx
import { useRouteError, isRouteErrorResponse } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();

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
    <div>
      <h1>Sorry, an unexpected error has occurred.</h1>
      {statusCode && <p>Status Code: {statusCode}</p>}
      <p>Error Message: {errorMessage}</p>
    </div>
  );
}
