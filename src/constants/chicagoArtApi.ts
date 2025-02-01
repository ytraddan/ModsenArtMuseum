export const BASE_URL = 'https://api.artic.edu/api/v1/artworks';
export const ITEMS_PER_PAGE = 3;
export const MAX_ITEMS_PER_PAGE = 100;
export const MAX_OFFSET = 1000;
export const MAX_PAGES = Math.floor(MAX_OFFSET / ITEMS_PER_PAGE);
export const HOME_PAGE_FIELDS =
  'id,title,image_id,artist_title,is_public_domain';
