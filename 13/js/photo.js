import {getRandomInteger, getRandomArrayElement} from './util.js';
import {DESCRIPTIONS, COMMENTS_MESSAGES, NAMES} from './data.js';

const createComment = () => {
  const messages = [];
  const messagesCount = getRandomInteger(1, 2);
  for (let i = 0; i < messagesCount; i++) {
    messages.push(getRandomArrayElement(COMMENTS_MESSAGES));
  }

  return {
    id: getRandomInteger(1, 1000),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: messages.join(' '),
    name: getRandomArrayElement(NAMES)
  };
};

const createPhotoDescription = (index) => {
  const commentCount = getRandomInteger(0, 30);
  const comments = Array.from({length: commentCount}, createComment);

  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments
  };
};

const createPhotoDescriptions = () => Array.from(
  {length: 25},
  (_, index) => createPhotoDescription(index + 1)
);

export {createPhotoDescriptions};
