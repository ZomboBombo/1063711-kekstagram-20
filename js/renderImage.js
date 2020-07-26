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
  var pictureTemplate = document.querySelector('#picture') // --- Шаблон для вставки фотографий
                      .content
                      .querySelector('.picture');

  var picturesContainer = document.querySelector('.pictures'); // --- Блок для отрисовки фотографий на страницу


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
    var renderedPicture = pictureTemplate.cloneNode(true); // --- Клонирование шаблона для фотографий

    // --- Заполнение шаблона данными от элементов массива ---
    renderedPicture.querySelector('.picture__img').src = photoCard.url;
    renderedPicture.querySelector('.picture__likes').textContent = photoCard.likes;
    renderedPicture.querySelector('.picture__comments').textContent = photoCard.comments.length;

    return renderedPicture;
  };


  return function (images) {
    // --- Коллекция пользовательских изображений ---
    var userPictures = picturesContainer.querySelectorAll('.picture'); // --- Пользовательские изображения

    // --- Удаление "старых" пользовательских фотографий ---
    userPictures.forEach(function (element) {
      element.remove();
    });

    // --- Наполнение DOM-элемента данными ---
    for (var i = 0; i < images.length; i++) {
      picturesContainer.appendChild(getARenderedPicture(images[i]));
    }
  };

})();
