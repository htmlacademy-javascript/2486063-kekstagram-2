import {createPhotoDescriptions} from './photo.js';
import {renderThumbnails} from './thumbnail.js';

const photos = createPhotoDescriptions();
renderThumbnails(photos);
