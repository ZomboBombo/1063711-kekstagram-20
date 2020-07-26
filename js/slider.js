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
  var HUNDRED_PERCENT_VALUE = 100;

  // ********* DOM-элементы *********
  var imagePreviewContainer = document.querySelector('.img-upload__preview-container'); // --- Контейнер для превью загруженного изображения в Форму редактирования
  var imageEffectLevel = imagePreviewContainer.querySelector('.img-upload__effect-level'); // --- Группа полей слайдера

  var effectLevelValue = imageEffectLevel.querySelector('.effect-level__value'); // --- <input> для отправки значения насыщенности фильтра на сервер
  var effectLevelLine = imageEffectLevel.querySelector('.effect-level__line'); // --- Полоска слайдера
  var effectLevelPin = imageEffectLevel.querySelector('.effect-level__pin'); // --- Ручка слайдера
  var effectLevelDepth = imageEffectLevel.querySelector('.effect-level__depth'); // --- Элемент отображения насыщенности фильтра


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */
  // --- Установка верного начального значения для элементов слайдера ---
  effectLevelValue.setAttribute('value', HUNDRED_PERCENT_VALUE);
  effectLevelPin.style.left = HUNDRED_PERCENT_VALUE + PERCENT_UNIT;
  effectLevelDepth.style.width = HUNDRED_PERCENT_VALUE + PERCENT_UNIT;


  // *** Обработчик события нажатия кнопки мыши ***
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


    // --- Границы полосы движения ползунка ---
    var Slider = {
      minValue: effectLevelLine.clientLeft,
      maxValue: effectLevelLine.clientWidth
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
      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + PIXEL_UNIT;
      effectLevelDepth.style.width = (effectLevelPin.offsetLeft - shift.x) + PIXEL_UNIT;


      // --- Выделение целого числа из коррдинаты ---
      var xCoordInteger = parseInt(effectLevelPin.style.left, window.util.NUMBER_SYSTEM);


      // --- Условия определения пределов движения ползунка ---
      if (xCoordInteger <= Slider.minValue) {
        effectLevelPin.style.left = Slider.minValue + PIXEL_UNIT;
      } else if (xCoordInteger >= Slider.maxValue) {
        effectLevelPin.style.left = Slider.maxValue + PIXEL_UNIT;
      }


      // --- Процентное выражение значения насыщенности ---
      var percentOfEffectValue = Math.floor(parseInt(effectLevelPin.style.left, window.util.NUMBER_SYSTEM) * HUNDRED_PERCENT_VALUE / Slider.maxValue);


      // --- Запись значения насыщенности в <input> для отправки на сервер ---
      effectLevelValue.setAttribute('value', percentOfEffectValue);


      // --- Изменение насыщенности фильтра ---
      window.effectLevel.change(percentOfEffectValue);
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
    effectLevelPin: effectLevelPin,
    effectLevelDepth: effectLevelDepth
  };

})();
