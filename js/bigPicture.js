'use strict';

/*
_________________________________________________

--- МОДУЛЬ ПОКАЗА ПОЛНОРАЗМЕРНОГО ИЗОБРАЖЕНИЯ ---
_________________________________________________

*/
window.bigPicture = (function () {
  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */
  // ********* КОНСТАНТЫ *********
  var REG_EXP_OF_NUMBER = /\d+/; // --- Шаблон регулярного выражения для поиска числа в составе строки
  var NUBER_SYSTEM_BASE = 10; // --- Основа истемы счисления ( десятичная, для метода "parseInt()" )
  var SHIFT = 1; // --- Сдвиг ( для выбора нужного элемента массива )


  // ********* DOM-элементы *********
  var BODY = document.querySelector('body'); // --- DOM-элемент для <body>

  var PICTURES_CONTAINER = document.querySelector('.pictures'); // --- Блок для отрисовки фотографий на страницу

  var BIG_PICTURE_CONTAINER = document.querySelector('.big-picture'); // --- Контейнер для полноразмерной фотографии
  var BIG_PICTURE = BIG_PICTURE_CONTAINER.querySelector('.big-picture__preview'); // --- Шаблон для полноразмерной фотографии
  var BIG_PICTURE_CLOSE = BIG_PICTURE.querySelector('.big-picture__cancel'); // --- Кнопка закрытия полноразмерной фотографии


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */


  // *** Функция для обработчика события закрытия полноразмерного изображения с помощью "Escape" ***
  var onEscPress = function (evt) {
    if (evt.key === window.util.ESC) {
      evt.preventDefault();

      onClose();
    }
  };

  // *** Функция для обработчика события ОТКРЫТИЯ полноразмерного изображения ***
  var onOpen = function (evt) {
    var numberOfJSObject; // --- Переменная для порядкового номера JS-объекта


    // --- Дерево условий для таргетированного нахождения нужного элемента ---
    if (evt.target.src) {
      numberOfJSObject = parseInt(evt.target.getAttribute('src').match(REG_EXP_OF_NUMBER), NUBER_SYSTEM_BASE);
    } else if (evt.target.querySelector('img').src) {
      numberOfJSObject = parseInt(evt.target.querySelector('img').getAttribute('src').match(REG_EXP_OF_NUMBER), NUBER_SYSTEM_BASE);
    }


    // --- Получение полноразмерного изображения ---
    window.fullsizePictureFiller(window.backend.dataArray[numberOfJSObject - SHIFT]);

    // --- Открытие полноразмерного изображения ---
    BIG_PICTURE_CONTAINER.classList.remove('hidden');

    // --- Добавление <body> класса для отключения прокрутки страницы при открытом модальном окне ---
    BODY.classList.add('modal-open');

    // === ОБРАБОТЧИКИ СОБЫТИЙ ===
    BIG_PICTURE_CLOSE.addEventListener('click', onClose);

    document.addEventListener('keydown', onEscPress);
  };

  // *** Функция для обработчика события ЗАКРЫТИЯ полноразмерного изображения ***
  var onClose = function () {
    // --- Сокрытие полноразмерного изображения ---
    BIG_PICTURE_CONTAINER.classList.add('hidden');

    // --- Удаление <body> класса для отключения прокрутки страницы при открытом модальном окне ---
    BODY.classList.remove('modal-open');

    // === УДАЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ ===
    BIG_PICTURE_CLOSE.removeEventListener('click', onClose);

    document.removeEventListener('keydown', onEscPress);
  };


  // *** Добавление обработчика события для показа Полноразмерной фотографии ***
  PICTURES_CONTAINER.addEventListener('click', onOpen);

})();
