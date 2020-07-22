'use strict';

/*
______________________________

--- МОДУЛЬ ЛОГИКИ СЛАЙДЕРА ---
______________________________

*/
window.slider = (function () {
  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */
  // ********* КОНСТАНТЫ *********
  var PIXEL_UNIT = 'px';
  var PERCENT_UNIT = '%';
  var BASE_NUMBER_SYSTEM = 10;
  var HUNDRED_PERCENT_VALUE = 100;

  // ********* DOM-элементы *********
  var IMAGE_PREVIEW_CONTAINER = document.querySelector('.img-upload__preview-container'); // --- Контейнер для превью загруженного изображения в Форму редактирования
  var IMAGE_PREVIEW = IMAGE_PREVIEW_CONTAINER.querySelector('.img-upload__preview img'); // --- Превью загруженного изображения в Форму редактирования
  var IMAGE_EFFECT_LEVEL = IMAGE_PREVIEW_CONTAINER.querySelector('.img-upload__effect-level'); // --- Группа полей слайдера

  var FIELDSET_OF_FILTERS = document.querySelector('.img-upload__effects'); // --- Контейнер для фильтров, накаладыаемых на изображение
  var FILTERS = FIELDSET_OF_FILTERS.querySelectorAll('.effects__radio'); // --- Коллекция фильтров, накаладыаемых на изображение

  var EFFECT_LEVEL_VALUE = IMAGE_EFFECT_LEVEL.querySelector('.effect-level__value'); // --- <input> для отправки значения насыщенности фильтра на сервер
  var EFFECT_LEVEL_LINE = IMAGE_EFFECT_LEVEL.querySelector('.effect-level__line'); // --- Полоска слайдера
  var EFFECT_LEVEL_PIN = IMAGE_EFFECT_LEVEL.querySelector('.effect-level__pin'); // --- Ручка слайдера
  var EFFECT_LEVEL_DEPTH = IMAGE_EFFECT_LEVEL.querySelector('.effect-level__depth'); // --- Элемент отображения насыщенности фильтра

  // *** Ключи для фильтров ***
  var Filter = {
    NONE: 'none',
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */
  // --- Установка верного начального значения для элементов слайдера ---
  EFFECT_LEVEL_VALUE.setAttribute('value', HUNDRED_PERCENT_VALUE);
  EFFECT_LEVEL_PIN.style.left = HUNDRED_PERCENT_VALUE + PERCENT_UNIT;
  EFFECT_LEVEL_DEPTH.style.width = HUNDRED_PERCENT_VALUE + PERCENT_UNIT;


  // *** Список функций для переключения фильтров изображения ***
  var changeFilter = {
    onNone: function () {
      IMAGE_PREVIEW.style.filter = '';
    },
    onChrome: function (percentOfEffect) {
      percentOfEffect = percentOfEffect * 0.01;
      IMAGE_PREVIEW.style.filter = 'grayscale(' + percentOfEffect + ')';
    },
    onSepia: function (percentOfEffect) {
      percentOfEffect = percentOfEffect * 0.01;
      IMAGE_PREVIEW.style.filter = 'sepia(' + percentOfEffect + ')';
    },
    onMarvin: function (percentOfEffect) {
      IMAGE_PREVIEW.style.filter = 'invert(' + percentOfEffect + '%)';
    },
    onPhobos: function (percentOfEffect) {
      percentOfEffect = percentOfEffect * 0.01 * 3;
      IMAGE_PREVIEW.style.filter = 'blur(' + percentOfEffect + 'px)';
    },
    onHeat: function (percentOfEffect) {
      percentOfEffect = percentOfEffect * 0.01 * 3;
      IMAGE_PREVIEW.style.filter = 'brightness(' + percentOfEffect + ')';
    }
  };


  // *** Функция изменения насыщенности фильтра ***
  var filterDepthChange = function (percentOfEffect) {
    var valueOfFilter;

    for (var i = 0; i < FILTERS.length; i++) {
      if (FILTERS[i].checked) {
        valueOfFilter = FILTERS[i].value;
        break;
      }
    }

    // --- Условия переключения фильтров ---
    switch (valueOfFilter) {
      case Filter.NONE:
        changeFilter.onNone(percentOfEffect);
        break;
      case Filter.CHROME:
        changeFilter.onChrome(percentOfEffect);
        break;
      case Filter.SEPIA:
        changeFilter.onSepia(percentOfEffect);
        break;
      case Filter.MARVIN:
        changeFilter.onMarvin(percentOfEffect);
        break;
      case Filter.PHOBOS:
        changeFilter.onPhobos(percentOfEffect);
        break;
      case Filter.HEAT:
        changeFilter.onHeat(percentOfEffect);
        break;
    }
  };


  // *** Обработчик события нажатия кнопки мыши ***
  EFFECT_LEVEL_PIN.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


    // --- Границы полосы движения ползунка ---
    var Slider = {
      minValue: EFFECT_LEVEL_LINE.clientLeft,
      maxValue: EFFECT_LEVEL_LINE.clientWidth
    };


    // --- Начальные координаты ручки слайдера ---
    var startCoords = {
      x: evt.clientX
    };


    // *** Функция для обработки события движения мыши ***
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();


      // --- Величина сдвига относительно движения мыши ---
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };


      startCoords = {
        x: moveEvt.clientX
      };


      // --- Перезапись стилевых параметров DOM-элементов ---
      EFFECT_LEVEL_PIN.style.left = (EFFECT_LEVEL_PIN.offsetLeft - shift.x) + PIXEL_UNIT;
      EFFECT_LEVEL_DEPTH.style.width = (EFFECT_LEVEL_PIN.offsetLeft - shift.x) + PIXEL_UNIT;


      // --- Выделение целого числа из коррдинаты ---
      var xCoordInteger = parseInt(EFFECT_LEVEL_PIN.style.left, BASE_NUMBER_SYSTEM);


      // --- Условия определения пределов движения ползунка ---
      if (xCoordInteger <= Slider.minValue) {
        EFFECT_LEVEL_PIN.style.left = Slider.minValue + PIXEL_UNIT;
      } else if (xCoordInteger >= Slider.maxValue) {
        EFFECT_LEVEL_PIN.style.left = Slider.maxValue + PIXEL_UNIT;
      }


      // --- Процентное выражение значения насыщенности ---
      var percentOfEffectValue = Math.floor(parseInt(EFFECT_LEVEL_PIN.style.left, BASE_NUMBER_SYSTEM) * HUNDRED_PERCENT_VALUE / Slider.maxValue);


      // --- Запись значения насыщенности в <input> для отправки на сервер ---
      EFFECT_LEVEL_VALUE.setAttribute('value', percentOfEffectValue);


      // --- Изменение насыщенности фильтра ---
      filterDepthChange(percentOfEffectValue);
    };


    // *** Функция для обработки события отпускания кнопки мыши ***
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();


      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  return {
    // --- Ссылки на DOM-элементы ---
    EFFECT_LEVEL_PIN: EFFECT_LEVEL_PIN,
    EFFECT_LEVEL_DEPTH: EFFECT_LEVEL_DEPTH
  };

})();
