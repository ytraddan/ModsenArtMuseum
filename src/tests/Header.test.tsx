import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Header from '@components/header/Header';

describe('Header', () => {
  it('should render header with logo and navigation', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Museum of Art')).toBeInTheDocument();
    expect(screen.getByText('Your Favorites')).toBeInTheDocument();
  });

  it('should toggle mobile menu on burger click', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const burgerButton = screen.getByRole('button');
    expect(screen.queryByTestId('mobile-nav')).not.toBeInTheDocument();

    fireEvent.click(burgerButton);
    expect(screen.queryByTestId('mobile-nav')).toBeInTheDocument();

    fireEvent.click(burgerButton);
    expect(screen.queryByTestId('mobile-nav')).not.toBeInTheDocument();
  });

  it('should not show home link on home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('should close mobile menu when clicking outside', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const burgerButton = screen.getByRole('button');
    fireEvent.click(burgerButton);
    expect(screen.queryByTestId('mobile-nav')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId('mobile-nav')).not.toBeInTheDocument();
  });
});
