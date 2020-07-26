'use strict';

/*
___________________________________

--- МОДУЛЬ ГЕНЕРАЦИИ ФОТОГРАФИЙ ---
___________________________________

*/
window.gallery = (function () {
  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */
  // ********* DOM-элементы *********
  var imageFiltersSection = document.querySelector('.img-filters'); // --- Блок фильтров для отображения фотографий пользователей


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */
  var imagesData = []; // --- Пустой массив для хранения фотографий, полученных с сервера

  // *** Функция обновления списка фотографий ***
  var updateImage = window.debounce(function (data) {
    window.renderImage(data);
  });


  // *** Запись данных в обработчики событий фильтра изображений ***
  window.filter.change.onDefault = function () {
    updateImage(imagesData);
  };

  window.filter.change.onRandom = function () {
    var tenRandomImagesData = window.filter.getTenRandomPhoto(imagesData);
    updateImage(tenRandomImagesData);
  };

  window.filter.change.onDiscussed = function () {
    var discussedImagesData = window.filter.getDiscussedPhotos(imagesData);
    updateImage(discussedImagesData);
  };


  // *** Функция для обработчика события успешного выполнения запроса ***
  var onRequestSuccess = function (images) {
    imagesData = images; // --- Заполнение массива данными с сервера
    updateImage(imagesData);

    // --- Показ блока с фильтрами для отображения фотографий ---
    imageFiltersSection.classList.remove('img-filters--inactive');
  };


  // *** Функция для обработчика события при ошибке в запросе ***
  var onRequestError = function (errorMessage) {
    // --- Создаём новый DOM-элемент — блок "div" для вывода сообщения об ошибке ---
    var node = document.createElement('div');

    // --- Задаём ему стили ---
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(227, 38, 54, 0.9);';
    node.style.padding = '25px 20px';
    node.style.position = 'absolute';
    node.style.right = 0;
    node.style.left = 0;
    node.style.fontSize = '30px';
    node.style.lineHeight = '35px';

    // --- Текстовое содержимое блока — это сообщение об ошибке ---
    node.textContent = errorMessage;

    // --- Внедряем элемент в DOM ---
    document.body.insertAdjacentElement('afterbegin', node);
  };


  // --- Получение и обработка данных с сервера ---
  window.backend.loadData(onRequestSuccess, onRequestError);

})();
