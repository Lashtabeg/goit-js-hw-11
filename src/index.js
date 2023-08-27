import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImeges } from './js/pixabay-api';
import { createMarkup } from './js/markup';
import { refs } from './js/refs';

let page = 1;
let formValue;
let totalPage;
let lightbox;
refs.form.addEventListener('submit', onSub);

async function onSub(event) {
  try {
    event.preventDefault();
    page = 1;
    formValue = event.currentTarget.elements.searchQuery.value;
    const result = await getImeges(formValue);
    const markup = createMarkup(result);
    refs.gallary.innerHTML = markup;
    totalPage = Math.ceil(result.total / 40);
    checkPages();
    lightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 333,
    });
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    if (result.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.loadBtn.style.display = 'none';
    } else {
      refs.loadBtn.style.display = 'block';
      Notify.success(`SHooray! We found ${result.totalHits} images.`);
    }
  } catch (error) {
    Notify.failure(`${error.message}`);
    refs.loadBtn.style.display = 'none';
  }
}

refs.loadBtn.addEventListener('click', onLoadBtn);

async function onLoadBtn() {
  try {
    page += 1;
    const result = await getImeges(formValue, page);
    const markup = createMarkup(result);
    refs.gallary.insertAdjacentHTML('beforeend', markup);
    checkPages();
    lightbox.refresh();
  } catch (error) {
    Notify.failure(`${error.message}`);
  }
}

function checkPages() {
  if (totalPage === page || totalPage === 1) {
    refs.loadBtn.style.display = 'none';
    Notify.info(`We're sorry, but you've reached the end of search results.`);
  }
}
