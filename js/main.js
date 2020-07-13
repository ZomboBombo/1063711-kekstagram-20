'use strict';

/*
______________________

--- ГЛАВНЫЙ МОДУЛЬ ---
______________________

*/
window.main = (function () {

  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */

  // ********* DOM-элементы *********
  var PICTURES_CONTAINER = document.querySelector('.pictures'); // --- Блок для отрисовки фотографий на страницу

  var FORM_UPLOAD_IMAGE = document.querySelector('#upload-select-image'); // --- Форма загрузки и редактирования изображения
  var UPLOAD_FILE = FORM_UPLOAD_IMAGE.querySelector('#upload-file'); // --- Контрол загрузки нового изображения

  var USER_IMAGES = PICTURES_CONTAINER.querySelectorAll('.picture__img'); // --- DOM-элементы пользовательских фотографий


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */

  // *** Присвоение ID каждому DOM-элементу с фотографией ***
  /*
    Данный цикл нужен для связи DOM-элементов пользовательских фотографий
    с JS-объектами, которые их описывают.
    Необходимо для применения способа делегирования.
  */
  for (var i = 0; i < USER_IMAGES.length; i++) {
    USER_IMAGES[i].id = i; // --- Присвоение в качестве ID порядкового номера (от 0 до длины коллекции фотографий пользователей)
  }


  // *** Добавление обработчика события для показа Полноразмерной фотографии ***
  PICTURES_CONTAINER.addEventListener('click', window.bigPicture.onOpen);


  // *** Обработчик события — Загрузка изображения на сайт ***
  UPLOAD_FILE.addEventListener('change', function () {
    window.imageEditingForm.onOpen();
  });


  // *** Обработчик события — Закрытие Формы редактирования изображения ***
  window.imageEditingForm.IMAGE_EDITING_FORM_EXIT.addEventListener('click', function () {
    window.imageEditingForm.onClose();
  });

})();
