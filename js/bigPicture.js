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

  // ********* DOM-элементы *********
  var BODY = document.querySelector('body'); // --- DOM-элемент для <body>

  var BIG_PICTURE_CONTAINER = document.querySelector('.big-picture'); // --- Контейнер для полноразмерной фотографии
  var BIG_PICTURE = BIG_PICTURE_CONTAINER.querySelector('.big-picture__preview'); // --- Шаблон для полноразмерной фотографии
  var BIG_PICTURE_CLOSE = BIG_PICTURE.querySelector('.big-picture__cancel'); // --- Кнопка закрытия полноразмерной фотографии

  var COMMENTS = BIG_PICTURE.querySelector('.social__comments'); // --- Список комментариев
  var COMMENTS_COUNT = BIG_PICTURE.querySelector('.social__comment-count'); // --- Блок, отображающий количество комментариев
  var COMMENTS_LOADER = BIG_PICTURE.querySelector('.comments-loader'); // --- Кнопка загрузки дополнительных комментариев
  var COMMENTS_ELEMENTS = COMMENTS.querySelectorAll('.social__comment'); // --- Элементы списка комментариев


  // --- Временное сокрытие некоторых блоков ---
  COMMENTS_COUNT.classList.add('hidden');
  COMMENTS_LOADER.classList.add('hidden');


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */

  // *** Функция для показа полноразмерного изображения ***
  var getFullsize = function (smallPicture) {
    // --- Превью полноразмерной фотографии ---
    var fullsizePicture = BIG_PICTURE;

    // --- Заполнение полей превью данными из массива ---
    fullsizePicture.querySelector('.big-picture__img').querySelector('img').src = smallPicture.url;
    fullsizePicture.querySelector('.likes-count').textContent = smallPicture.likes;
    fullsizePicture.querySelector('.social__caption').textContent = smallPicture.description;
    fullsizePicture.querySelector('.comments-count').textContent = smallPicture.comments.length;

    // --- Временное значение длины массива отображаемых комментариев ---
    var temporaryCommentsLength = 2;

    // --- Заполнение полей комментариев данными из массива комментариев ---
    for (var i = 0; i < smallPicture.comments.length; i++) {
      /*
        Временное решение для корректного заполнения комментариев.
        Если длина массива комментариев превышает настоящую длину
        списка элементов в разметке, то происходит выход из цикла.
      */
      if (i >= temporaryCommentsLength) {
        break;
      } else {
        COMMENTS_ELEMENTS[i].querySelector('.social__picture').src = smallPicture.comments[i].commentatorAvatar;
        COMMENTS_ELEMENTS[i].querySelector('.social__picture').alt = smallPicture.comments[i].commentatorName;
        COMMENTS_ELEMENTS[i].querySelector('.social__text').textContent = smallPicture.comments[i].commentatorMessage;
      }
    }

    return fullsizePicture;
  };

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

    // --- Дерево условий для таргетированного нахождения нужного ID элемента ---
    if (evt.target.id) {
      numberOfJSObject = evt.target.id;
    } else if (evt.target.querySelector('img').id) {
      numberOfJSObject = evt.target.querySelector('img').id;
    }

    // --- Получение полноразмерного изображения ---
    getFullsize(window.gallery.generatedArrayOfPhotos[numberOfJSObject]);

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


  return {
    onOpen: onOpen
  };

})();
