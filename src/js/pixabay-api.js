import axios from 'axios';

const API_KEY = '39052006-3aff4103abebd0ee62bb756b7';

axios.defaults.baseURL = 'https://pixabay.com/api/';

class PixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  getPixabayApi(searchQuery) {
    const params = {
      key: API_KEY,
      q: `${searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    };
    return axios
      .get(baseURL, { params })
      .then(resp => resp.json())
      .then(data => {
        this.page += 1;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}

export { PixabayApi };
