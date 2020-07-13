'use strict';

/*
_____________________________________________

--- МОДУЛЬ ИЗМЕНЕНИЯ МАСШТАБА ИЗОБРАЖЕНИЯ ---
_____________________________________________

*/
window.pictureScale = (function () {

  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */

  // ********* КОНСТАНТЫ *********
  var BASE_NUMBER_SYSTEM = 10; // --- Основа системы счисления
  var PERCENTAGE = '%'; // --- Процентный символ (для указания значения масштаба в процентах)
  var TRANSFORMATION_RATIO = 100; // --- Коэффициент трансформации ( для "transform: scale()" )
  var MIN_SCALE_VALUE = 25; // --- Минимальное значение масштаба изображения
  var MAX_SCALE_VALUE = 100; // --- Максимальное значение масштаба изображения
  var SCALE_STEP = 25; // --- Шаг масштабирования

  // ********* DOM-элементы *********
  var FORM_UPLOAD_IMAGE = document.querySelector('#upload-select-image'); // --- Форма загрузки и редактирования изображения
  var IMAGE_EDITING_FORM = FORM_UPLOAD_IMAGE.querySelector('.img-upload__overlay'); // --- Окно редактирования изображения
  var IMAGE_EDITING_PREVIEW = IMAGE_EDITING_FORM.querySelector('.img-upload__preview img'); // --- Превью редактируемого изображения
  var SCALE_CONTROL_VALUE = IMAGE_EDITING_FORM.querySelector('.scale__control--value'); // --- Поле, отображающее масштаб (в процентах)


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */

  // *** Функция для изменения значения в поле и масштаба изображения ***
  var scaleChange = function (valueOfScale) {
    // --- Запись получившегося значения в атрибут "value" поля отображения масштаба ---
    SCALE_CONTROL_VALUE.value = valueOfScale + PERCENTAGE;

    // --- Коэффициент масштабирования для CSS-свойства "transform" ---
    var scaleFactor = valueOfScale / TRANSFORMATION_RATIO;

    // --- Добавление CSS-свойства "transform: scale()" редактируемому изображению ---
    IMAGE_EDITING_PREVIEW.style = 'transform: scale(' + scaleFactor + ')';
  };


  return {
    // *** Функция для обработчика события УМЕНЬШЕНИЯ масштаба изображения ***
    onDecrease: function () {
      // --- Приведение значения масштаба к числовому типу ---
      var valueOfScaleForDecrease = parseInt(SCALE_CONTROL_VALUE.value, BASE_NUMBER_SYSTEM);

      /*
        Если значение масштаба больше либо равно МИНИМАЛЬНОМУ значению,
        тогда УМЕНЬШИТЬ значение на Шаг масштабирования (25).
      */
      if (valueOfScaleForDecrease >= MIN_SCALE_VALUE) {
        valueOfScaleForDecrease -= SCALE_STEP;

        /*
          Если получившееся значение меньше МИНИМАЛЬНОГО значения масштаба,
          тогда приравнять получившееся к МИНИМАЛЬНОМУ.
        */
        if (valueOfScaleForDecrease < MIN_SCALE_VALUE) {
          valueOfScaleForDecrease = MIN_SCALE_VALUE;
        }
      }

      // --- Изменение масштаба редактируемого изображения ---
      scaleChange(valueOfScaleForDecrease);
    },

    // *** Функция для обработчика события УВЕЛИЧЕНИЯ масштаба изображения ***
    onIncrease: function () {
      // --- Приведение значения масштаба к числовому типу ---
      var valueOfScaleForIncrease = parseInt(SCALE_CONTROL_VALUE.value, BASE_NUMBER_SYSTEM);

      /*
        Если значение масштаба меньше либо равно МАКСИМАЛЬНОМУ значению,
        тогда УВЕЛИЧИТЬ значение на Шаг масштабирования (25).
      */
      if (valueOfScaleForIncrease <= MAX_SCALE_VALUE) {
        valueOfScaleForIncrease += SCALE_STEP;

        /*
          Если получившееся значение больше МАКСИМАЛЬНОГО значения масштаба,
          тогда приравнять получившееся к МАКСИМАЛЬНОМУ.
        */
        if (valueOfScaleForIncrease > MAX_SCALE_VALUE) {
          valueOfScaleForIncrease = MAX_SCALE_VALUE;
        }
      }

      // --- Изменение масштаба редактируемого изображения ---
      scaleChange(valueOfScaleForIncrease);
    }
  };

})();
