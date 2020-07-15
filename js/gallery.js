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
  var getARenderedPicture = function (photoCard, idNumber) {
    var renderedPicture = PICTURE_TEMPLATE.cloneNode(true); // --- Клонирование шаблона для фотографий

    // --- Заполнение шаблона данными от элементов массива ---
    renderedPicture.querySelector('.picture__img').id = idNumber;
    renderedPicture.querySelector('.picture__img').src = photoCard.url;
    renderedPicture.querySelector('.picture__likes').textContent = photoCard.likes;
    renderedPicture.querySelector('.picture__comments').textContent = photoCard.comments.length;

    return renderedPicture;
  };


  // *** Функция для обработчика события успешного выполнения запроса ***
  var onRequestSuccess = function (images) {
    // --- Создание фрагмента в DOM ---
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < images.length; i++) {
      fragment.appendChild(getARenderedPicture(images[i], i));
    }

    // --- Отрисовка фотографий на страницу ---
    PICTURES_CONTAINER.appendChild(fragment);
  };

  // *** Функция для обработчика события при ошибке в запросе ***
  var onRequestError = function (errorMessage) {
    // --- Создаём новый DOM-элемент — блок "div" для вывода сообщения об ошибке ---
    var node = document.createElement('div');

    // --- Задаём ему стили ---
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(227, 38, 54, 0.9);';
    node.style.padding = '25px 0';
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


  window.backend.load(onRequestSuccess, onRequestError);

})();
