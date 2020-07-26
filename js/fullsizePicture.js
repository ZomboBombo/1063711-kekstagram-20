'use strict';

/*
_____________________________________________________

--- МОДУЛЬ НАПОЛНЕНИЯ ПОЛНОРАЗМЕРНОГО ИЗОБРАЖЕНИЯ ---
_____________________________________________________

*/
window.fullsizePicture = (function () {
  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */
  // ********* КОНСТАНТЫ *********
  var FIVE_COMMENTS = 5;

  // ********* DOM-элементы *********
  var BIG_PICTURE_CONTAINER = document.querySelector('.big-picture'); // --- Контейнер для полноразмерной фотографии
  var BIG_PICTURE = BIG_PICTURE_CONTAINER.querySelector('.big-picture__preview'); // --- Шаблон для полноразмерной фотографии

  var COMMENTS = BIG_PICTURE.querySelector('.social__comments'); // --- Список комментариев
  var COMMENTS_COUNT = BIG_PICTURE.querySelector('.social__comment-count'); // --- Блок, отображающий количество комментариев
  var commentsCurrentCount = COMMENTS_COUNT.querySelector('.comments-current-count'); // --- Блок, отображающий количество комментариев
  var COMMENTS_LOADER = BIG_PICTURE.querySelector('.comments-loader'); // --- Кнопка загрузки дополнительных комментариев
  var COMMENT_TEMPLATE = COMMENTS.querySelector('.social__comment'); // --- Шаблон комментария


  // --- Пустая переменная для списка комментариев к каждой фотографии ---
  var commentsList;

  // *** Функция получения числа доступных к просмотру комментариев ***
  var getAvailableCommentsCount = function () {
    commentsCurrentCount.textContent = 0;
    var availableCommentsCount = parseInt(commentsCurrentCount.textContent, window.util.NUMBER_SYSTEM);

    for (var i = 0; i < commentsList.length; i++) {
      if (!commentsList[i].classList.contains('hidden')) {
        availableCommentsCount++;
      }
    }

    return availableCommentsCount;
  };


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */
  // *** Справочник методов комментариев ***
  var comment = {
    hide: function (commentElement) {
      commentElement.classList.add('hidden');
    },

    show: function (commentElement) {
      commentElement.classList.remove('hidden');
    }
  };


  // *** Функция для ограничения количества показываемых комментариев ***
  var availableCommentsList = function (listOfComments) {
    if (listOfComments.length >= FIVE_COMMENTS) {
      for (var i = FIVE_COMMENTS; i < listOfComments.length; i++) {
        comment.hide(listOfComments[i]);
      }

      COMMENTS_LOADER.classList.remove('hidden');
    } else {
      COMMENTS_LOADER.classList.add('hidden');
    }
  };


  // *** Функция обработки события клика по кнопке загрузки дополнительных комментариев ***
  var onCommentsLoaderClick = function () {
    var hiddenComments = []; // --- Пустой массив для скрытых комментариев


    // --- Наполнение массива скрытыми комментариями ---
    Array.from(commentsList).forEach(function (element) {
      if (element.classList.contains('hidden')) {
        hiddenComments.push(element);
      }
    });

    /*
    _______________________________________________________

      Условие: если длина массива скрытых комментариев
               превышает доступное количество комментариев
               к показу (пять),
               тогда наполнить массив 5-ю дополнительными
               комментариями.

      Иначе:   наполнить массив оставшимися комментариями
               и скрыть кнопку загрузки дополнительных
               комментариев.
    _______________________________________________________

    */
    if (hiddenComments.length > FIVE_COMMENTS) {
      for (var i = 0; i < FIVE_COMMENTS; i++) {
        comment.show(hiddenComments[i]);
      }
    } else {
      hiddenComments.forEach(function (element) {
        comment.show(element);
      });

      COMMENTS_LOADER.classList.add('hidden');
    }

    commentsCurrentCount.textContent = getAvailableCommentsCount();
  };


  // *** Функция для наполнения полноразмерного изображения ***
  var getFullsizePicture = function (smallPicture) {
    // --- Превью полноразмерной фотографии ---
    var fullsizePicture = BIG_PICTURE;

    // --- Заполнение полей превью данными из массива ---
    fullsizePicture.querySelector('.big-picture__img').querySelector('img').src = smallPicture.url;
    fullsizePicture.querySelector('.likes-count').textContent = smallPicture.likes;
    fullsizePicture.querySelector('.social__caption').textContent = smallPicture.description;
    fullsizePicture.querySelector('.comments-count').textContent = smallPicture.comments.length;

    // --- Очистка списка комментариев ---
    COMMENTS.innerHTML = '';

    // --- Заполнение полей комментариев данными ---
    for (var i = 0; i < smallPicture.comments.length; i++) {
      var commentElement = COMMENT_TEMPLATE.cloneNode(true);

      commentElement.querySelector('.social__picture').src = smallPicture.comments[i].avatar;
      commentElement.querySelector('.social__picture').alt = smallPicture.comments[i].name;
      commentElement.querySelector('.social__text').textContent = smallPicture.comments[i].message;

      COMMENTS.appendChild(commentElement);
    }

    // --- Сформированный список комментариев ---
    commentsList = COMMENTS.querySelectorAll('.social__comment');

    // --- Ограничение показываемых комментариев ---
    availableCommentsList(commentsList);


    // *** Обработчик события клика по кнопке загрузки дополнительных комментариев ***
    COMMENTS_LOADER.addEventListener('click', onCommentsLoaderClick);


    return fullsizePicture;
  };


  return {
    open: getFullsizePicture,
    getAvailableCommentsCount: getAvailableCommentsCount,
    onCommentsLoaderClick: onCommentsLoaderClick
  };

})();
