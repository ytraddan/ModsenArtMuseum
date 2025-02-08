import FavoritesProvider from '@components/providers/FavoritesProvider';
import { render, fireEvent, screen } from '@testing-library/react';
import { FavoritesContext } from '@contexts/FavoritesContext';
import { useContext } from 'react';

const mockArtwork = {
  id: 1,
  title: 'Test Artwork',
  image_id: 'test-image',
  artist_title: 'Test Artist',
  is_public_domain: true,
};

const TestComponent = () => {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);
  return (
    <div>
      <div data-testid="favorites-count">{favorites.length}</div>
      <button onClick={() => addFavorite(mockArtwork)}>Add</button>
      <button onClick={() => removeFavorite(mockArtwork)}>Remove</button>
    </div>
  );
};

describe('FavoritesProvider', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should manage favorites state correctly', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');

    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');

    fireEvent.click(screen.getByText('Remove'));
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
  });

  it('should persist favorites to sessionStorage', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText('Add'));

    const storedFavorites = JSON.parse(
      sessionStorage.getItem('favorites') || '[]'
    );
    expect(storedFavorites).toHaveLength(1);
    expect(storedFavorites[0].id).toBe(mockArtwork.id);
  });
});
