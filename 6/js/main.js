const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getUniqueRangeInteger = (min, max) => {
  const usedInteger = [];

  return function () {
    if (usedInteger.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }

    let currentInteger;

    do {
      currentInteger = getRandomInteger(min, max);
    } while (usedInteger.includes(currentInteger));

    usedInteger.push(currentInteger);
    return currentInteger;
  };
};

const DESCRIPTIONS = [
  'Прекрасный закат на побережье',
  'Уютное кафе в центре города',
  'Незабываемое путешествие в горы',
  'Семейный пикник в парке',
  'Яркие краски осени',
  'Городской пейзаж в дождливый день',
  'Веселая вечеринка с друзьями',
  'Уличное искусство',
  'Домашние питомцы',
  'Архитектурные шедевры'
];

const COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'Екатерина',
  'Александр',
  'Ольга',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Наталья'
];

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

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

const photos = createPhotoDescriptions();
console.log('photos:', photos);
