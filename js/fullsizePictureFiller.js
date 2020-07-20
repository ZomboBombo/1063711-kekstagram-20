'use strict';

/*
_____________________________________________________

--- МОДУЛЬ НАПОЛНЕНИЯ ПОЛНОРАЗМЕРНОГО ИЗОБРАЖЕНИЯ ---
_____________________________________________________

*/
window.fullsizePictureFiller = (function () {
  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */
  // ********* DOM-элементы *********
  var BIG_PICTURE_CONTAINER = document.querySelector('.big-picture'); // --- Контейнер для полноразмерной фотографии
  var BIG_PICTURE = BIG_PICTURE_CONTAINER.querySelector('.big-picture__preview'); // --- Шаблон для полноразмерной фотографии

  var COMMENTS = BIG_PICTURE.querySelector('.social__comments'); // --- Список комментариев
  var COMMENTS_COUNT = BIG_PICTURE.querySelector('.social__comment-count'); // --- Блок, отображающий количество комментариев
  var COMMENTS_LOADER = BIG_PICTURE.querySelector('.comments-loader'); // --- Кнопка загрузки дополнительных комментариев
  var COMMENTS_ELEMENTS = COMMENTS.querySelectorAll('.social__comment'); // --- Элементы списка комментариев


  // --- Временное сокрытие некоторых блоков ---
  COMMENTS_COUNT.classList.add('hidden');
  COMMENTS_LOADER.classList.add('hidden');


  // *** Функция для наполнения полноразмерного изображения ***
  return function (smallPicture) {
    // --- Превью полноразмерной фотографии ---
    var fullsizePicture = BIG_PICTURE;


    // --- Заполнение полей превью данными из массива ---
    fullsizePicture.querySelector('.big-picture__img').querySelector('img').src = smallPicture.url;
    fullsizePicture.querySelector('.likes-count').innerText = smallPicture.likes;
    fullsizePicture.querySelector('.social__caption').innerText = smallPicture.description;
    fullsizePicture.querySelector('.comments-count').innerText = smallPicture.comments.length;

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
        COMMENTS_ELEMENTS[i].querySelector('.social__picture').src = smallPicture.comments[i].avatar;
        COMMENTS_ELEMENTS[i].querySelector('.social__picture').alt = smallPicture.comments[i].name;
        COMMENTS_ELEMENTS[i].querySelector('.social__text').innerText = smallPicture.comments[i].message;
      }
    }

    return fullsizePicture;
  };

})();
