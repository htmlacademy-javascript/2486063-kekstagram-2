import {sendData} from './api.js';
import {showSuccess, showError} from './message.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

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

  const hashtags = value.trim().toLowerCase().split(' ').filter((tag) => tag !== '');

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag));
};

const resetValidation = () => {
  pristine.reset();
  const errors = form.querySelectorAll('.pristine-error');
  errors.forEach((error) => {
    error.textContent = '';
    error.style.display = 'none';
  });
};

const validateComment = (value) => !value || value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Неправильный формат хэштегов'
);

hashtagInput.addEventListener('input', () => {
  if (pristine.validate()) {
    resetValidation();
  }
});

pristine.addValidator(
  commentInput,
  validateComment,
  `Комментарий не может быть длиннее ${MAX_COMMENT_LENGTH} символов`
);

let onEscKeydown = null;

const hideForm = () => {
  form.reset();
  pristine.reset();

  // Полностью удаляем элементы с ошибками
  const errors = form.querySelectorAll('.pristine-error');
  errors.forEach((error) => error.remove());

  const previewImage = document.querySelector('.img-upload__preview img');
  const effectsPreviews = document.querySelectorAll('.effects__preview');

  if (previewImage.src.startsWith('blob:')) {
    URL.revokeObjectURL(previewImage.src);
  }
  previewImage.src = 'img/upload-default-image.jpg';
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });

  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
};

onEscKeydown = (evt) => {
  if (evt.key === 'Escape' && document.activeElement !== hashtagInput && document.activeElement !== commentInput) {
    evt.preventDefault();
    hideForm();
  }
};

const showForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

const toggleSubmitButton = (disabled) => {
  if (disabled) {
    submitButton.setAttribute('disabled', '');
    submitButton.textContent = 'Публикация...';
  } else {
    submitButton.removeAttribute('disabled');
    submitButton.textContent = 'Опубликовать';
  }
};

const isValidImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return file instanceof File && validTypes.includes(file.type);
};

const updatePreview = (file) => {
  const previewImage = document.querySelector('.img-upload__preview img');
  const effectsPreviews = document.querySelectorAll('.effects__preview');

  try {
    if (!file || !isValidImageFile(file)) {
      throw new Error('Invalid file');
    }

    const imageUrl = window.URL.createObjectURL(file);
    if (!imageUrl) {
      throw new Error('Failed to create object URL');
    }

    previewImage.src = imageUrl;
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${imageUrl}')`;
    });
  } catch {
    previewImage.src = 'img/upload-default-image.jpg';
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = '';
    });
  }
};

const initForm = () => {
  const handleFileUpload = (evt) => {
    const file = evt.target.files?.[0] || uploadInput.files?.[0];
    if (!file) {
      return;
    }

    // Очищаем все ошибки при открытии формы
    pristine.reset();
    const errors = form.querySelectorAll('.pristine-error');
    errors.forEach((error) => error.remove());

    showForm();

    if (window.URL) {
      updatePreview(file);
    }
  };

  uploadInput.addEventListener('change', handleFileUpload);

  cancelButton.addEventListener('click', () => {
    hideForm();
  });

  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (!pristine.validate()) {
      return;
    }

    try {
      toggleSubmitButton(true);
      const formData = new FormData(evt.target);

      // Добавляем дополнительные данные
      const scale = document.querySelector('.scale__control--value')?.value || '100%';
      const effect = document.querySelector('.effects__radio:checked')?.value || 'none';
      const description = commentInput.value;
      const hashtags = hashtagInput.value;

      formData.set('scale', scale);
      formData.set('effect', effect);
      formData.set('description', description);
      formData.set('hashtags', hashtags);

      await sendData(formData);
      hideForm();
      showSuccess();
    } catch (error) {
      document.removeEventListener('keydown', onEscKeydown);
      showError();
      const onMessageClose = () => {
        document.addEventListener('keydown', onEscKeydown);
        document.removeEventListener('message-close', onMessageClose);
      };
      document.addEventListener('message-close', onMessageClose);
    } finally {
      toggleSubmitButton(false);
    }
  });
};

export {initForm};
