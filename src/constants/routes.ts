export const ROUTES = {
  HOME: '/',
  ARTWORK: '/artwork/:artworkId',
  ARTWORK_BY_ID: (id: string | number) => `/artwork/${id}`,
  FAVORITES: '/favorites',
} as const;
