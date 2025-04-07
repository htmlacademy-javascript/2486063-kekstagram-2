const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const hideMessage = () => {
  const existingMessage = document.querySelector('.success') || document.querySelector('.error');
  if (existingMessage) {
    existingMessage.dispatchEvent(new Event('message-close', { bubbles: true }));
    existingMessage.remove();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
    hideMessage();
  }
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

const showMessage = (element, buttonClass) => {
  document.body.append(element);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onBodyClick);
  element.querySelector(buttonClass).addEventListener('click', hideMessage);
};

const showSuccess = () => {
  showMessage(successTemplate.cloneNode(true), '.success__button');
};

const showError = () => {
  showMessage(errorTemplate.cloneNode(true), '.error__button');
};

export {showSuccess, showError};
