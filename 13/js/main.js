import {createPhotoDescriptions} from './photo.js';
import {renderThumbnails} from './thumbnail.js';
import './form.js';
import {initScale} from './scale.js';
import {initEffects} from './effects.js';

const photos = createPhotoDescriptions();
renderThumbnails(photos);

initScale();
initEffects();
