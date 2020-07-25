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
    /*
      Проверка: если объект, на котором происходит клик, содержит в списке классов
                указанные (".pictures" и ".pictures__img"), то блок кода выполнится.
    */
    if (evt.target.classList.contains('picture') || evt.target.classList.contains('picture__img')) {
      var numberOfJSObject; // --- Переменная для порядкового номера JS-объекта

      // --- Дерево условий для таргетированного нахождения нужного элемента ---
      if (evt.target.src) {
        numberOfJSObject = parseInt(evt.target.getAttribute('src').match(REG_EXP_OF_NUMBER), window.util.NUBER_SYSTEM);
      } else if (evt.target.querySelector('img').src) {
        numberOfJSObject = parseInt(evt.target.querySelector('img').getAttribute('src').match(REG_EXP_OF_NUMBER), window.util.NUBER_SYSTEM);
      }

      window.fullsizePicture.open(window.backend.dataArray[numberOfJSObject - SHIFT]); // --- Получение полноразмерного изображения

      BIG_PICTURE_CONTAINER.classList.remove('hidden'); // --- Открытие полноразмерного изображения
      BODY.classList.add('modal-open'); // --- Добавление <body> класса для отключения прокрутки страницы при открытом модальном окне


      // ====== ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ ======
      BIG_PICTURE_CLOSE.addEventListener('click', onClose);
      document.addEventListener('keydown', onEscPress);
    }
  };

  // *** Функция для обработчика события ЗАКРЫТИЯ полноразмерного изображения ***
  var onClose = function () {
    // --- Сокрытие полноразмерного изображения ---
    BIG_PICTURE_CONTAINER.classList.add('hidden');

    // --- Удаление <body> класса для отключения прокрутки страницы при открытом модальном окне ---
    BODY.classList.remove('modal-open');

    // ====== УДАЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ ======
    BIG_PICTURE_CLOSE.removeEventListener('click', onClose);
    document.removeEventListener('keydown', onEscPress);
  };


  // *** Добавление обработчика события для показа Полноразмерной фотографии ***
  PICTURES_CONTAINER.addEventListener('click', onOpen);

})();
