import { useArtworkFilters } from '@hooks/useArtworkFilters';
import { MemoryRouter, useSearchParams } from 'react-router';
import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { ReactNode } from 'react';

function TestComponent({ onSearch }: { onSearch: (search: string) => void }) {
  const [searchParams] = useSearchParams();
  onSearch(searchParams.toString());
  return null;
}

type WrapperProps = {
  children: ReactNode;
};

describe('useArtworkFilters', () => {
  it('should return default values when no params present', () => {
    const wrapper = ({ children }: WrapperProps) => (
      <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
    );

    const { result } = renderHook(() => useArtworkFilters(), { wrapper });

    expect(result.current.search).toBeUndefined();
    expect(result.current.page).toBe(1);
    expect(result.current.sort).toBe('');
  });

  it('should parse URL params correctly', () => {
    const wrapper = ({ children }: WrapperProps) => (
      <MemoryRouter initialEntries={['/?search=test&page=2&sort=title']}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useArtworkFilters(), { wrapper });

    expect(result.current.search).toBe('test');
    expect(result.current.page).toBe(2);
    expect(result.current.sort).toBe('title');
  });

  it('should update filters correctly', async () => {
    let currentSearch = '';

    const wrapper = ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={['/']}>
        {children}
        <TestComponent
          onSearch={(search) => {
            currentSearch = search;
          }}
        />
      </MemoryRouter>
    );

    const { result } = renderHook(() => useArtworkFilters(), { wrapper });

    await act(async () => {
      result.current.setFilters({ search: 'test', sort: 'title' });
    });

    await waitFor(() => {
      expect(currentSearch).toBe('search=test&sort=title');
    });
  });
});
