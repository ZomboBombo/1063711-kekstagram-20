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
  var PERCENTAGE = '%'; // --- Процентный символ (для указания значения масштаба в процентах)
  var TRANSFORMATION_RATIO = 100; // --- Коэффициент трансформации ( для "transform: scale()" )
  var MIN_SCALE_VALUE = 25; // --- Минимальное значение масштаба изображения
  var MAX_SCALE_VALUE = 100; // --- Максимальное значение масштаба изображения
  var SCALE_STEP = 25; // --- Шаг масштабирования

  // ********* DOM-элементы *********
  var formUploadImage = document.querySelector('#upload-select-image'); // --- Форма загрузки и редактирования изображения
  var imageEditingForm = formUploadImage.querySelector('.img-upload__overlay'); // --- Окно редактирования изображения
  var imageEditingPreview = imageEditingForm.querySelector('.img-upload__preview img'); // --- Превью редактируемого изображения
  var scaleControlValue = imageEditingForm.querySelector('.scale__control--value'); // --- Поле, отображающее масштаб (в процентах)


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */
  // *** Функция для изменения значения в поле и масштаба изображения ***
  var scaleChange = function (valueOfScale) {
    // --- Запись получившегося значения в атрибут "value" поля отображения масштаба ---
    scaleControlValue.value = valueOfScale + PERCENTAGE;

    // --- Коэффициент масштабирования для CSS-свойства "transform" ---
    var scaleFactor = valueOfScale / TRANSFORMATION_RATIO;

    // --- Добавление CSS-свойства "transform: scale()" редактируемому изображению ---
    imageEditingPreview.style.transform = 'scale(' + scaleFactor + ')';
  };


  return {
    // *** Функция для обработчика события УМЕНЬШЕНИЯ масштаба изображения ***
    zoomOut: function () {
      // --- Приведение значения масштаба к числовому типу ---
      var valueOfScaleForDecrease = parseInt(scaleControlValue.value, window.util.NUMBER_SYSTEM);

      if (valueOfScaleForDecrease >= MIN_SCALE_VALUE) {
        valueOfScaleForDecrease -= SCALE_STEP;

        if (valueOfScaleForDecrease < MIN_SCALE_VALUE) {
          valueOfScaleForDecrease = MIN_SCALE_VALUE;
        }
      }

      // --- Изменение масштаба редактируемого изображения ---
      scaleChange(valueOfScaleForDecrease);
    },

    // *** Функция для обработчика события УВЕЛИЧЕНИЯ масштаба изображения ***
    zoomIn: function () {
      // --- Приведение значения масштаба к числовому типу ---
      var valueOfScaleForIncrease = parseInt(scaleControlValue.value, window.util.NUMBER_SYSTEM);

      if (valueOfScaleForIncrease <= MAX_SCALE_VALUE) {
        valueOfScaleForIncrease += SCALE_STEP;

        if (valueOfScaleForIncrease > MAX_SCALE_VALUE) {
          valueOfScaleForIncrease = MAX_SCALE_VALUE;
        }
      }

      // --- Изменение масштаба редактируемого изображения ---
      scaleChange(valueOfScaleForIncrease);
    }
  };

})();
