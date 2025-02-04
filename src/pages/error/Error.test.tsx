import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import ErrorPage from '@/pages/error/Error';

describe('ErrorPage', () => {
  it('should render route error correctly', () => {
    const routes = [
      {
        path: '/',
        element: <div>Home</div>,
        errorElement: <ErrorPage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/invalid'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /sorry, an unexpected error has occurred/i
    );
  });
});
