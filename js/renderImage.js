'use strict';

/*
___________________________________

--- МОДУЛЬ ОТРИСОВКИ ФОТОГРАФИЙ ---
___________________________________

*/
window.renderImage = (function () {
  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */
  // ********* DOM-элементы *********
  var PICTURE_TEMPLATE = document.querySelector('#picture') // --- Шаблон для вставки фотографий
                      .content
                      .querySelector('.picture');

  var PICTURES_CONTAINER = document.querySelector('.pictures'); // --- Блок для отрисовки фотографий на страницу


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */

  /*
  ********* Наполнение DOM-элементов и отрисовка Фотографий на страницу *********
  */
  // --- Функция для наполнения шаблона для Фото данными из массива ---
  var getARenderedPicture = function (photoCard) {
    var renderedPicture = PICTURE_TEMPLATE.cloneNode(true); // --- Клонирование шаблона для фотографий

    // --- Заполнение шаблона данными от элементов массива ---
    renderedPicture.querySelector('.picture__img').src = photoCard.url;
    renderedPicture.querySelector('.picture__likes').innerText = photoCard.likes;
    renderedPicture.querySelector('.picture__comments').innerText = photoCard.comments.length;

    return renderedPicture;
  };


  return function (images) {
    // --- Коллекция пользовательских изображений ---
    var userPictures = PICTURES_CONTAINER.querySelectorAll('.picture'); // --- Пользовательские изображения

    // --- Удаление "старых" пользовательских фотографий ---
    userPictures.forEach(function (element) {
      element.remove();
    });

    // --- Наполнение DOM-элемента данными ---
    for (var i = 0; i < images.length; i++) {
      PICTURES_CONTAINER.appendChild(getARenderedPicture(images[i], i));
    }
  };


})();
