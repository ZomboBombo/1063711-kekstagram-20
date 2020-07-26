'use strict';

/*
_______________________________________________________

--- МОДУЛЬ УПРАВЛЕНИЯ НАСЫЩЕННОСТЬЮ ЭФФЕКТА ФИЛЬТРА ---
_______________________________________________________

*/
window.effectLevel = (function () {
  // ********* DOM-элементы *********
  var imagePreviewContainer = document.querySelector('.img-upload__preview-container'); // --- Контейнер для превью загруженного изображения в Форму редактирования
  var imagePreview = imagePreviewContainer.querySelector('.img-upload__preview img'); // --- Превью загруженного изображения в Форму редактирования

  var fieldsetOfFilters = document.querySelector('.img-upload__effects'); // --- Контейнер для фильтров, накаладыаемых на изображение
  var filters = fieldsetOfFilters.querySelectorAll('.effects__radio'); // --- Коллекция фильтров, накаладыаемых на изображение

  // *** Ключи для фильтров ***
  var Filter = {
    NONE: 'none',
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };


  // *** Список функций для переключения фильтров изображения ***
  var changeFilter = {
    onNone: function () {
      imagePreview.style.filter = '';
    },
    onChrome: function (percentOfEffect) {
      percentOfEffect = percentOfEffect * 0.01;
      imagePreview.style.filter = 'grayscale(' + percentOfEffect + ')';
    },
    onSepia: function (percentOfEffect) {
      percentOfEffect = percentOfEffect * 0.01;
      imagePreview.style.filter = 'sepia(' + percentOfEffect + ')';
    },
    onMarvin: function (percentOfEffect) {
      imagePreview.style.filter = 'invert(' + percentOfEffect + '%)';
    },
    onPhobos: function (percentOfEffect) {
      percentOfEffect = percentOfEffect * 0.01 * 3;
      imagePreview.style.filter = 'blur(' + percentOfEffect + 'px)';
    },
    onHeat: function (percentOfEffect) {
      percentOfEffect = percentOfEffect * 0.01 * 3;
      imagePreview.style.filter = 'brightness(' + percentOfEffect + ')';
    }
  };


  // *** Функция изменения насыщенности фильтра ***
  var changeDepth = function (percentOfEffect) {
    var valueOfFilter;

    for (var i = 0; i < filters.length; i++) {
      if (filters[i].checked) {
        valueOfFilter = filters[i].value;
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


  return {
    change: changeDepth
  };

})();
