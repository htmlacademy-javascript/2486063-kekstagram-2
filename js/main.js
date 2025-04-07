import {loadPhotos} from './photo.js';
import {renderThumbnails} from './thumbnail.js';
import {initScale} from './scale.js';
import {initEffects} from './effects.js';
import {initForm} from './form.js';
import {initFilters} from './filter.js';

const clearContainer = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const bootstrap = async () => {
  clearContainer();

  try {
    const photos = await loadPhotos();
    renderThumbnails(photos);
    const filterElement = document.querySelector('.img-filters');
    filterElement.classList.remove('img-filters--inactive');
    initFilters(photos, renderThumbnails);
  } catch (err) {
    // Ошибка уже обработана в loadPhotos
  }
};

bootstrap();
initScale();
initEffects();
initForm();
