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
  var body = document.querySelector('body'); // --- DOM-элемент для <body>

  var picturesContainer = document.querySelector('.pictures'); // --- Блок для отрисовки фотографий на страницу

  var bigPictureContainer = document.querySelector('.big-picture'); // --- Контейнер для полноразмерной фотографии
  var bigPicture = bigPictureContainer.querySelector('.big-picture__preview'); // --- Шаблон для полноразмерной фотографии
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel'); // --- Кнопка закрытия полноразмерной фотографии

  var commentsCount = bigPicture.querySelector('.social__comment-count'); // --- Блок, отображающий количество комментариев
  var commentsCurrentCount = commentsCount.querySelector('.comments-current-count'); // --- Блок, отображающий количество комментариев
  var commentsLoader = bigPicture.querySelector('.comments-loader'); // --- Кнопка загрузки дополнительных комментариев


  // *** Функция обработки события клика на кнпку загрузки дополнительных комментариев ---
  var onCommentsLoaderClick = window.fullsizePicture.onCommentsLoaderClick;

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

      bigPictureContainer.classList.remove('hidden'); // --- Открытие полноразмерного изображения
      body.classList.add('modal-open'); // --- Добавление <body> класса для отключения прокрутки страницы при открытом модальном окне

      commentsCurrentCount.textContent = window.fullsizePicture.getAvailableCommentsCount();

      // ====== ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ ======
      bigPictureClose.addEventListener('click', onClose);
      document.addEventListener('keydown', onEscPress);
    }
  };

  // *** Функция для обработчика события ЗАКРЫТИЯ полноразмерного изображения ***
  var onClose = function () {
    // --- Сокрытие полноразмерного изображения ---
    bigPictureContainer.classList.add('hidden');

    // --- Удаление <body> класса для отключения прокрутки страницы при открытом модальном окне ---
    body.classList.remove('modal-open');

    commentsCurrentCount.textContent = window.util.ZERO;

    // ====== УДАЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ ======
    bigPictureClose.removeEventListener('click', onClose);
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    document.removeEventListener('keydown', onEscPress);
  };


  // *** Добавление обработчика события для показа Полноразмерной фотографии ***
  picturesContainer.addEventListener('click', onOpen);

})();
