import {getData} from './api.js';

const loadPhotos = async () => {
  try {
    const photos = await getData();
    return photos;
  } catch (err) {
    const dataError = document.querySelector('#data-error')
      .content
      .querySelector('.data-error');
    document.body.append(dataError.cloneNode(true));
    throw err;
  }
};

export {loadPhotos};
