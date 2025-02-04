export const BASE_URL = 'https://api.artic.edu/api/v1';
export const ITEMS_PER_PAGE = 3;
export const HOME_PAGE_FIELDS =
  'id,title,image_id,artist_title,is_public_domain';
export const ARTWORK_DETAILS_FIELDS =
  'id,title,place_of_origin,image_id,artist_title,date_display,is_public_domain,dimensions,credit_line,department_title,gallery_title';
// API limitations
export const MAX_ITEMS_PER_PAGE = 100;
export const MAX_OFFSET = 1000;
export const MAX_PAGES = Math.floor(MAX_OFFSET / ITEMS_PER_PAGE);
