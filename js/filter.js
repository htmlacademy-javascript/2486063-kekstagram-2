const RANDOM_PICTURES_COUNT = 10;
const RERENDER_DELAY = 500;

const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const filterForm = document.querySelector('.img-filters__form');

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const compareComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const filters = {
  [FilterType.DEFAULT]: (pictures) => pictures,
  [FilterType.RANDOM]: (pictures) => {
    const randomIndexes = [];
    const picturesCopy = pictures.slice();
    const result = [];

    while (result.length < RANDOM_PICTURES_COUNT) {
      const index = getRandomIndex(0, picturesCopy.length);
      if (!randomIndexes.includes(index)) {
        randomIndexes.push(index);
        result.push(picturesCopy[index]);
      }
    }
    return result;
  },
  [FilterType.DISCUSSED]: (pictures) => pictures.slice().sort(compareComments),
};

const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), timeoutDelay);
  };
};

const initFilters = (pictures, renderCallback) => {

  const debouncedRender = debounce(renderCallback);

  filterForm.addEventListener('click', (evt) => {
    const button = evt.target;
    if (!button.classList.contains('img-filters__button')) {
      return;
    }

    const activeButton = filterForm.querySelector('.img-filters__button--active');
    if (activeButton) {
      activeButton.classList.remove('img-filters__button--active');
    }
    button.classList.add('img-filters__button--active');

    const filteredPictures = filters[button.id.replace('filter-', '')](pictures);
    debouncedRender(filteredPictures);
  });
};

export { initFilters };
