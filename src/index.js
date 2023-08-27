import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayApi } from './js/pixabay-api';
import axios from 'axios';

const pixabayApi = new PixabayApi();

const refs = {
  form: document.getElementById('search-form'),
  gallary: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSub);

function onSub(event) {
  event.preventDefault();
  const formValue = event.currentTarget.elements.searchQuery.value;

  PixabayApi.getPixabayApi(formValue);
  refs.form.reset();
}

// lightbox = new SimpleLightbox('.gallery a', {
//   captionDelay: 333,
// });

// Notify.success('SHooray! We found ${totalHits} images.');
// Notify.failure('Sorry, there are no images matching your search query. Please try again.');
// Notify.info('We're sorry, but you've reached the end of search results.');
