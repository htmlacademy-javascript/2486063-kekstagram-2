const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentCount = bigPicture.querySelector('.social__comment-count');

let currentComments = [];
let shownCommentsCount = 0;

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  comment.append(img);
  comment.append(text);

  return comment;
};

const renderComments = () => {
  socialComments.innerHTML = '';
  const fragment = document.createDocumentFragment();
  const commentsToShow = currentComments.slice(0, shownCommentsCount);

  commentsToShow.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.append(commentElement);
  });

  socialComments.append(fragment);
  commentsShownCount.textContent = shownCommentsCount;
  commentsTotalCount.textContent = currentComments.length;

  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

const onCommentsLoaderClick = () => {
  shownCommentsCount = Math.min(shownCommentsCount + COMMENTS_PER_PORTION, currentComments.length);
  renderComments();
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  currentComments = [];
  shownCommentsCount = 0;
}

const openBigPicture = ({ url, description, likes, comments }) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  currentComments = comments;
  shownCommentsCount = Math.min(COMMENTS_PER_PORTION, comments.length);

  renderComments();

  commentCount.classList.remove('hidden');
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  document.addEventListener('keydown', onDocumentKeydown);
};

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
