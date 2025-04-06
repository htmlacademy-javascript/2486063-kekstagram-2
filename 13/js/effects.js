const EFFECTS = {
  none: {
    name: 'none',
    filter: '',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    }
  },
  chrome: {
    name: 'chrome',
    filter: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    }
  },
  sepia: {
    name: 'sepia',
    filter: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    }
  },
  marvin: {
    name: 'marvin',
    filter: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    }
  },
  phobos: {
    name: 'phobos',
    filter: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    }
  },
  heat: {
    name: 'heat',
    filter: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    }
  }
};

const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

let currentEffect = EFFECTS.none;

const isDefault = () => currentEffect === EFFECTS.none;

const showSlider = () => {
  effectLevel.classList.remove('hidden');
};

const hideSlider = () => {
  effectLevel.classList.add('hidden');
};

const updateSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.options.range.min,
      max: currentEffect.options.range.max
    },
    start: currentEffect.options.start,
    step: currentEffect.options.step
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  imagePreview.style.filter = isDefault()
    ? ''
    : `${currentEffect.filter}(${sliderValue}${currentEffect.unit})`;
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = EFFECTS[evt.target.value];
  updateSlider();
};

const resetEffects = () => {
  currentEffect = EFFECTS.none;
  updateSlider();
};

const initEffects = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: EFFECTS.none.options.range.min,
      max: EFFECTS.none.options.range.max
    },
    start: EFFECTS.none.options.start,
    step: EFFECTS.none.options.step,
    connect: 'lower'
  });
  hideSlider();

  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
  effectsList.addEventListener('change', onEffectsChange);
};

export { initEffects, resetEffects };
