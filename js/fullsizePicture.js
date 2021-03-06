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
  var bigPictureContainer = document.querySelector('.big-picture'); // --- Контейнер для полноразмерной фотографии
  var bigPicture = bigPictureContainer.querySelector('.big-picture__preview'); // --- Шаблон для полноразмерной фотографии

  var comments = bigPicture.querySelector('.social__comments'); // --- Список комментариев
  var commentsCount = bigPicture.querySelector('.social__comment-count'); // --- Блок, отображающий количество комментариев
  var commentsCurrentCount = commentsCount.querySelector('.comments-current-count'); // --- Блок, отображающий количество комментариев
  var commentsLoader = bigPicture.querySelector('.comments-loader'); // --- Кнопка загрузки дополнительных комментариев
  var commentTemplate = comments.querySelector('.social__comment'); // --- Шаблон комментария


  // --- Пустая переменная для списка комментариев к каждой фотографии ---
  var commentsList;

  // *** Функция получения числа доступных к просмотру комментариев ***
  var getAvailableCommentsCount = function () {
    commentsCurrentCount.textContent = window.util.ZERO; // --- Обнуление числа доступных комментариев
    var availableCommentsCount = parseInt(commentsCurrentCount.textContent, window.util.NUMBER_SYSTEM);

    commentsList.forEach(function (element) {
      if (!element.classList.contains('hidden')) {
        availableCommentsCount++;
      }
    });

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
  var showAvailableComments = function (listOfComments) {
    if (listOfComments.length >= FIVE_COMMENTS) {
      // --- Сокрытие комментариев ---
      listOfComments.forEach(function (element, i) {
        if (i >= FIVE_COMMENTS) {
          comment.hide(element);
        }
      });

      commentsLoader.classList.remove('hidden');
    } else {
      commentsLoader.classList.add('hidden');
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

      commentsLoader.classList.add('hidden');
    }

    commentsCurrentCount.textContent = getAvailableCommentsCount();
  };


  // *** Функция для наполнения полноразмерного изображения ***
  var getFullsizePicture = function (smallPicture) {
    // --- Превью полноразмерной фотографии ---
    var fullsizePicture = bigPicture;

    // --- Заполнение полей превью данными из массива ---
    fullsizePicture.querySelector('.big-picture__img').querySelector('img').src = smallPicture.url;
    fullsizePicture.querySelector('.likes-count').textContent = smallPicture.likes;
    fullsizePicture.querySelector('.social__caption').textContent = smallPicture.description;
    fullsizePicture.querySelector('.comments-count').textContent = smallPicture.comments.length;

    // --- Очистка списка комментариев ---
    comments.innerHTML = '';

    // --- Заполнение полей комментариев данными ---
    smallPicture.comments.forEach(function (element) {
      var commentElement = commentTemplate.cloneNode(true);

      commentElement.querySelector('.social__picture').src = element.avatar;
      commentElement.querySelector('.social__picture').alt = element.name;
      commentElement.querySelector('.social__text').textContent = element.message;

      comments.appendChild(commentElement);
    });


    // --- Сформированный список комментариев ---
    commentsList = comments.querySelectorAll('.social__comment');

    // --- Ограничение показываемых комментариев ---
    showAvailableComments(commentsList);


    // *** Обработчик события клика по кнопке загрузки дополнительных комментариев ***
    commentsLoader.addEventListener('click', onCommentsLoaderClick);


    return fullsizePicture;
  };


  return {
    open: getFullsizePicture,
    getAvailableCommentsCount: getAvailableCommentsCount,
    onCommentsLoaderClick: onCommentsLoaderClick
  };

})();
