import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (pictureData) => {
  const { url, description, likes, comments } = pictureData;
  const thumbnail = pictureTemplate.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(pictureData);
  });

  return thumbnail;
};

const clearThumbnails = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const renderThumbnails = (pictures) => {
  clearThumbnails();
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });
  picturesContainer.append(fragment);
};

export { renderThumbnails };
