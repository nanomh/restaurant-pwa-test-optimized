import CONFIG from './config';

const API_ENDPOINT = {
  list: `${CONFIG.BASE_URL}/list`,
  detail: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  ulasan: `${CONFIG.BASE_URL}/review`,
  search: (id) => `${CONFIG.BASE_URL}/search?q=${id}`,
};

export default API_ENDPOINT;
