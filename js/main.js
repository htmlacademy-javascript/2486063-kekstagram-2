import {createPhotoDescriptions} from './photo.js';
import {renderThumbnails} from './thumbnail.js';
import './form.js';

const photos = createPhotoDescriptions();
renderThumbnails(photos);
