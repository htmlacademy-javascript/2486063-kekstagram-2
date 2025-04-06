import {loadPhotos} from './photo.js';
import {renderThumbnails} from './thumbnail.js';
import {initScale} from './scale.js';
import {initEffects} from './effects.js';
import {initForm} from './form.js';
import {initFilters} from './filter.js';

const bootstrap = async () => {
  try {
    const photos = await loadPhotos();
    renderThumbnails(photos);
    initFilters(photos, renderThumbnails);
  } catch (err) {
    // Ошибка уже обработана в loadPhotos
  }
};

bootstrap();
initScale();
initEffects();
initForm();
