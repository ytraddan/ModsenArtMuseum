import { RouterProvider, createMemoryRouter } from 'react-router';
import { useArtworkFilters } from '@hooks/useArtworkFilters';
import { render, screen } from '@testing-library/react';
import { ROUTES } from '@constants/routes';
import Pagination from './Pagination';

jest.mock('@hooks/useArtworkFilters');
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLoaderData: () => ({
    totalPages: 10,
  }),
}));

describe('Pagination', () => {
  beforeEach(() => {
    (useArtworkFilters as jest.Mock).mockReturnValue({
      setFilters: jest.fn(),
      page: 1,
    });
  });

  const renderPagination = () => {
    const routes = [
      {
        path: ROUTES.HOME,
        element: <Pagination />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    return render(<RouterProvider router={router} />);
  };

  it('should render first page pagination correctly', () => {
    renderPagination();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();

    const backButton = screen.getByText('←');
    expect(backButton).toHaveAttribute('hidden');

    const forwardButton = screen.getByText('→');
    expect(forwardButton).not.toHaveAttribute('hidden');
  });

  it('should disable current page button', () => {
    renderPagination();

    const pageOneButton = screen.getByText('1');
    expect(pageOneButton).toBeDisabled();
  });

  it('should show correct navigation buttons', () => {
    (useArtworkFilters as jest.Mock).mockReturnValue({
      setFilters: jest.fn(),
      page: 5,
    });

    renderPagination();

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();

    const backButton = screen.getByText('←');
    const forwardButton = screen.getByText('→');
    expect(backButton).not.toHaveAttribute('hidden');
    expect(forwardButton).not.toHaveAttribute('hidden');
  });
});
