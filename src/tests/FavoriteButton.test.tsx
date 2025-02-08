import { render, fireEvent, screen } from '@testing-library/react';
import { FavoritesContext } from '@contexts/FavoritesContext';
import FavoriteButton from '@components/favoriteButton/FavoriteButton';

const mockArtwork = {
  id: 1,
  title: 'Test Artwork',
  image_id: 'test-image',
  artist_title: 'Test Artist',
  is_public_domain: true,
};

describe('FavoriteButton', () => {
  const mockAddFavorite = jest.fn();
  const mockRemoveFavorite = jest.fn();
  const mockIsFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render unfavorited state correctly', () => {
    mockIsFavorite.mockReturnValue(false);

    render(
      <FavoritesContext.Provider
        value={{
          favorites: [],
          addFavorite: mockAddFavorite,
          removeFavorite: mockRemoveFavorite,
          isFavorite: mockIsFavorite,
        }}
      >
        <FavoriteButton artwork={mockArtwork} />
      </FavoritesContext.Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByAltText('bookmark')).toBeInTheDocument();
  });

  it('should handle favorite toggle correctly', () => {
    mockIsFavorite.mockReturnValue(false);

    render(
      <FavoritesContext.Provider
        value={{
          favorites: [],
          addFavorite: mockAddFavorite,
          removeFavorite: mockRemoveFavorite,
          isFavorite: mockIsFavorite,
        }}
      >
        <FavoriteButton artwork={mockArtwork} />
      </FavoritesContext.Provider>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockAddFavorite).toHaveBeenCalledWith(mockArtwork);
  });
});
