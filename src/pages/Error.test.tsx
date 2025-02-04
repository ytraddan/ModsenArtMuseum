import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import ErrorPage from '@pages/Error';

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

    expect(
      screen.getByText(/sorry, an unexpected error has occurred/i)
    ).toBeInTheDocument();
  });
});
