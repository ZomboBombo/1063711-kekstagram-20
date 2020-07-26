'use strict';

/*
__________________________________________________

--- МОДУЛЬ ФИЛЬТРОВ ДЛЯ ОТОБРАЖЕНИЯ ФОТОГРАФИЙ ---
__________________________________________________

*/
window.filter = (function () {
  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */
  // ********* КОНСТАНТЫ *********
  var TEN_PHOTOS = 10; // --- Количество отображаемых фотографий для фильтра «Случайные»

  // ********* DOM-элементы *********
  var imageFiltersSection = document.querySelector('.img-filters'); // --- Блок фильтров для отображения фотографий пользователей
  var imageFilterButtons = imageFiltersSection.querySelectorAll('.img-filters__button'); // --- Коллекция кнопок для фильтров

  // *** Фильтры для сортировки фотографий ***
  var Filter = {
    DEFAULT: imageFiltersSection.querySelector('#filter-default'), // --- Фильтр «По умолчанию»
    RANDOM: imageFiltersSection.querySelector('#filter-random'), // --- Фильтр «Случайные»
    DISCUSSED: imageFiltersSection.querySelector('#filter-discussed') // --- Фильтр «Обсуждаемые»
  };


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */

  // *** Объект, на который будут подписаны события изменения фильтров ***
  var changeFilter = {
    onDefault: function () {},
    onRandom: function () {},
    onDiscussed: function () {}
  };


  // *** Функция получения 10-ти рандомных фотографий ***
  var getTenRandomPhotos = function (sourceArray) {
    // --- Пустой массив для 10-ти рандомных фото ---
    var tenRandomPhotos = [];

    // --- Копия данных, полученных с сервера ---
    var copyOfSourceArray = sourceArray.slice();

    for (var i = 0; i < TEN_PHOTOS; i++) {
      var randomPhotoNumber = window.util.getRandomNumber(window.util.ZERO, copyOfSourceArray.length); // --- Номер случайной фотографии

      tenRandomPhotos[i] = copyOfSourceArray[randomPhotoNumber]; // --- Запись случайной фотографии в массив

      copyOfSourceArray.splice(randomPhotoNumber, window.util.DELETE_COUNT); // --- Удаление "использованных" фотографий из массива
    }

    return tenRandomPhotos;
  };


  // *** Функция для сравнения двух элементов между собой ( для сортировки элементов по убыванию ) ***
  var compareLikesCount = function (left, right) {
    return right - left;
  };


  // *** Функция получения массива обсуждаемых фотографий ***
  var getDiscussedPhotos = function (sourceArray) {
    // --- Копия данных, полученных с сервера ---
    var copyOfSourceArray = sourceArray.slice();

    // --- Функция возвращает массив, отсортированный по убыванию количества комментариев под фотографиями ---
    return copyOfSourceArray.sort(function (left, right) {
      var commentsLengthDifference = right.comments.length - left.comments.length;

      if (commentsLengthDifference === window.util.ZERO) {
        commentsLengthDifference = compareLikesCount(left.likes, right.likes);
      }

      return commentsLengthDifference;
    });
  };


  // *** Функция для управления списком классов кнопок для фильтров ***
  var manageClassList = function (filter) {
    // --- Проход по списку кнопок для фильтров и удаление класса "активности" фильтра ---
    Array.from(imageFilterButtons).forEach(function (element) {
      element.classList.remove('img-filters__button--active');
    });

    // --- Добавление класса на нужную кнопку фильтра ---
    filter.classList.add('img-filters__button--active');
  };


  // *** Функция для обработчика события включения фильтра «По умолчанию» ***
  var onDefaultFilter = function () {
    manageClassList(Filter.DEFAULT);
    changeFilter.onDefault();
  };

  // *** Функция для обработчика события включения фильтра «Случайные» ***
  var onRandomFilter = function () {
    manageClassList(Filter.RANDOM);
    changeFilter.onRandom();
  };

  // *** Функция для обработчика события включения фильтра «Обсуждаемые» ***
  var onDiscussedFilter = function () {
    manageClassList(Filter.DISCUSSED);
    changeFilter.onDiscussed();
  };


  // *** Включение фильтра «По умолчанию» ***
  Filter.DEFAULT.addEventListener('click', function () {
    onDefaultFilter();
  });


  // *** Включение фильтра «Случайные» ***
  Filter.RANDOM.addEventListener('click', function () {
    onRandomFilter();
  });


  // *** Включение фильтра «Обсуждаемые» ***
  Filter.DISCUSSED.addEventListener('click', function () {
    onDiscussedFilter();
  });


  return {
    /*
      Возвращаем из модуля объект, на который будут подписаны события
      изменения фильтров отображения фотографий на странице.
    */
    change: changeFilter,

    // *** Функции для фильтров «Случайные» и «Обсуждаемые» соответственно ***
    getTenRandomPhotos: getTenRandomPhotos,
    getDiscussedPhotos: getDiscussedPhotos
  };

})();
