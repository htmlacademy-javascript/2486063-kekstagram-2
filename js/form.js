const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

const validateHashtags = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(' ');

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag));
};

const validateComment = (value) => !value || value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Неправильный формат хэштегов'
);

pristine.addValidator(
  commentInput,
  validateComment,
  `Комментарий не может быть длиннее ${MAX_COMMENT_LENGTH} символов`
);

function onEscKeydown(evt) {
  if (evt.key === 'Escape' && document.activeElement !== hashtagInput && document.activeElement !== commentInput) {
    evt.preventDefault();
    hideForm();
  }
}

function hideForm() {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

function showForm() {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
}

uploadInput.addEventListener('change', () => {
  showForm();
});

cancelButton.addEventListener('click', () => {
  hideForm();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    form.submit();
  }
});

export { showForm, hideForm };
