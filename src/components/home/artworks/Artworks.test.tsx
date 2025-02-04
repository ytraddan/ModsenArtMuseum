import { render, screen } from '@testing-library/react';
import { LoadingGrid, NoResults } from '@components/home/artworks/Artworks';
import Artworks from '@components/home/artworks/Artworks';
import FavoritesProvider from '@components/providers/FavoritesProvider';
import { type LinkProps } from 'react-router';

jest.mock('react-router', () => {
  const actual = jest.requireActual('react-router');
  return {
    ...actual,
    useLoaderData: () => ({
      artworks: [
        {
          id: 1,
          title: 'Test Artwork',
          artist_title: 'Test Artist',
          image_id: 'test-image',
          is_public_domain: true,
        },
      ],
      iiifUrl: 'https://test.com',
      totalPages: 1,
      page: 1,
    }),
    useNavigation: () => ({
      state: 'idle',
    }),
    Link: ({ children, to }: LinkProps) => (
      <a href={typeof to === 'string' ? to : '#'}>{children}</a>
    ),
  };
});

describe('Artworks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state', () => {
    render(<LoadingGrid />);
    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons).toHaveLength(3);
  });

  it('should render no results message when no artworks found', () => {
    render(<NoResults />);
    expect(screen.getByText('No artworks found')).toBeInTheDocument();
  });

  it('should render artwork cards correctly', async () => {
    render(
      <FavoritesProvider>
        <Artworks />
      </FavoritesProvider>
    );

    expect(screen.getByText('Test Artwork')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('Public Domain')).toBeInTheDocument();
  });
});
