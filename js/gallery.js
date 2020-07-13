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

  // ********* КОНСТАНТЫ *********
  var PHOTOS_COUNT = 25; // --- Количество Фотографий для отрисовки на страницу
  var MIN_LIKES_COUNT = 15; // --- Минимальное количество лайков
  var MAX_LIKES_COUNT = 200; // --- Максимальное количество лайков
  var MIN_COMMENTS_COUNT = 1; // --- Минимальное количество комментариев к фотографии
  var MAX_COMMENTS_COUNT = 5; // --- Максимальное количество комментариев к фотографии ( может быть любым, я выбрал 5 )
  var FIRST_AVATAR = 1; // ---  Номер первого аватара
  var LAST_AVATAR = 6; // ---  Номер последнего аватара


  // ********* DOM-элементы *********
  var PICTURE_TEMPLATE = document.querySelector('#picture') // --- Шаблон для вставки фотографий
                      .content
                      .querySelector('.picture');

  var PICTURES_CONTAINER = document.querySelector('.pictures'); // --- Блок для отрисовки фотографий на страницу


  /* ************************************
  ********* ФУНКЦИИ-ИНСТРУМЕНТЫ *********
  ************************************ */

  // --- Наполнитель адресного массива по порядку (от 1 до n-го элемента) ---
  var getArrayOfNumbers = function (emptyArray, arrayLength) {
    var arrayOfNumbers = [];

    for (var i = 0; i < arrayLength; i++) {
      arrayOfNumbers[i] = i + 1;
    }

    return arrayOfNumbers;
  };


  // --- Генератор копий массивов ---
  var getCopyOfArray = function (originalArray) {
    var copyOfArray = [];

    for (var i = 0; i < originalArray.length; i++) {
      copyOfArray[i] = originalArray[i];
    }

    return copyOfArray;
  };


  // --- Шаблон для Фотокарточки ---
  var getPhotoCard = function (urlNumber, photoDescription, likesCount, commentsList) {
    return {
      url: 'photos/' + urlNumber + '.jpg',
      description: photoDescription,
      likes: likesCount,
      comments: commentsList
    };
  };


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */

  // *** Генерация Объекта с комментарием ***
  var getCommentObject = function () {
    // --- Копирование оригинальных массивов ---
    var copyOfMessages = getCopyOfArray(window.mock.MESSAGES); // --- Копия массива Сообщений
    var copyOfNames = getCopyOfArray(window.mock.NAMES); // --- Копия массива Имён комментаторов

    // --- Случайные элементы массивов ---
    var randomMessage = window.util.getRandomNumber(window.util.ZERO_ELEMENT, copyOfMessages.length); // --- Случайный номер элемента для массива комментариев
    var randomName = window.util.getRandomNumber(window.util.ZERO_ELEMENT, copyOfNames.length); // --- Случайный номер элемента для массива имён

    // --- Переменные для формирования объекта-комментария ---
    var avatarNumber = window.util.getRandomNumber(FIRST_AVATAR, LAST_AVATAR);
    var message = copyOfMessages[randomMessage];
    var name = copyOfNames[randomName];

    // --- Шаблон для объекта-комментария ---
    var commentObject = {
      commentatorAvatar: 'img/avatar-' + avatarNumber + '.svg',
      commentatorMessage: message,
      commentatorName: name
    };

    // --- Удаление использованных элементов из копий массивов ---
    copyOfMessages.splice(randomMessage, window.util.DELETE_COUNT);
    copyOfNames.splice(randomName, window.util.DELETE_COUNT);

    return commentObject;
  };


  // *** Генерация массива с комментариями ***
  var getCommentsArray = function () {
    var randomCommentsCount = window.util.getRandomNumber(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
    var commentsArray = [];

    for (var i = 0; i < randomCommentsCount; i++) {
      commentsArray[i] = getCommentObject();
    }

    return commentsArray;
  };


  // *** Генерация массива с Фотографиями ***
  var getArrayOfPhotos = function () {
    // --- Заполнение адресного массива элементами ---
    var addressArray = getArrayOfNumbers(addressArray, PHOTOS_COUNT);

    // --- Пустой массив для фотографий ---
    var arrayOfPhotos = [];

    for (var i = 0; i < PHOTOS_COUNT; i++) {
      // --- Переменные для формирования Фотокарточки ---
      var randomPhotoNumber = window.util.getRandomNumber(window.util.ZERO_ELEMENT, addressArray.length); // --- Случайный номер фото
      var photoUrl = addressArray[randomPhotoNumber]; // --- Адрес фотографии
      var photoDescription = window.mock.DESCRIPTIONS[randomPhotoNumber]; // --- Описание фотографии
      var randomLikesCount = window.util.getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT); // --- Количество лайков
      var commentsList = getCommentsArray(); // --- Список комментариев

      // --- Заполнение массива Фотографий ---
      arrayOfPhotos[i] = getPhotoCard(photoUrl, photoDescription, randomLikesCount, commentsList);

      // --- Удаление использованных элементов массива ---
      addressArray.splice(randomPhotoNumber, window.util.DELETE_COUNT);
      window.mock.DESCRIPTIONS.splice(randomPhotoNumber, window.util.DELETE_COUNT);
    }

    return arrayOfPhotos;
  };


  /*
  -------------------------------------------------------------------
  --- Наполнение DOM-элементов и отрисовка Фотографий на страницу ---
  -------------------------------------------------------------------
  */

  // --- Функция для наполнения шаблона для Фото данными из массива ---
  var getARenderedPicture = function (photoCard) {
    var renderedPicture = PICTURE_TEMPLATE.cloneNode(true); // --- Клонирование шаблона для фотографий

    // --- Заполнение шаблона данными от элементов массива ---
    renderedPicture.querySelector('.picture__img').src = photoCard.url;
    renderedPicture.querySelector('.picture__likes').textContent = photoCard.likes;
    renderedPicture.querySelector('.picture__comments').textContent = photoCard.comments.length;

    return renderedPicture;
  };

  // --- Генерация массива с Фотографиями ---
  var generatedArrayOfPhotos = getArrayOfPhotos();

  // --- Создание фрагмента в DOM ---
  var fragment = document.createDocumentFragment();

  for (var k = 0; k < generatedArrayOfPhotos.length; k++) {
    fragment.appendChild(getARenderedPicture(generatedArrayOfPhotos[k]));
  }

  // --- Отрисовка фотографий на страницу ---
  PICTURES_CONTAINER.appendChild(fragment);


  return {
    // --- Сгенерированный массив с Фотографиями ---
    generatedArrayOfPhotos: generatedArrayOfPhotos
  };

})();
