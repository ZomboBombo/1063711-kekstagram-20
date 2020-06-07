'use strict';

/* *****************
*** 1. КОНСТАНТЫ ***
***************** */

// *** 1.1) Вспомогательные константы ***
var PHOTOS_COUNT = 25; // --- Количество Фотографий для отрисовки на страницу
var ZERO_ELEMENT = 0; // --- Нулевой элемент
var FIRST_AVATAR = 1; // ---  Номер первого аватара
var LAST_AVATAR = 6; // ---  Номер последнего аватара
var MIN_LIKES_COUNT = 15; // --- Минимальное количество лайков
var MAX_LIKES_COUNT = 200; // --- Максимальное количество лайков
var MIN_COMMENTS_COUNT = 1; // --- Минимальное количество комментариев к фотографии
var MAX_COMMENTS_COUNT = 5; // --- Максимальное количество комментариев к фотографии ( может быть любым, я выбрал 5 )
var DELETE_COUNT = 1; // --- Количество удаляемых элементов ( необходимо для метода ".splice()" )


// *** 1.2) Переменные для DOM-элементов ***
var PICTURE_TEMPLATE = document.querySelector('#picture') // --- Шаблон для вставки фотографий
                      .content
                      .querySelector('.picture');

var PICTURES_CONTAINER = document.querySelector('.pictures'); // --- Блок для отрисовки фотографий на страницу


// *** 1.3) Массивы с данными (моки) ***
var MESSAGES = [
  'Всё отлично!',
  'В целом, всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов, это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках, и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота, и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?! '
];

var NAMES = [
  'Мистер Великолепный',
  'Чудастер',
  '$erёЖ@',
  'Megaman',
  'Саня Гордый',
  'Mil@shka',
  'Ольга Павловна',
  'Виктор',
  'Мальвина'
];

var DESCRIPTIONS = [
  'Бюджетный «Майами Бич»',
  'Путь к морю',
  'Райское наслаждение',
  'Я в купальнике :ь',
  'Купание рисовых малышат',
  'Ауфф',
  'Азиатская диета',
  'М-м-м-морсик!',
  'Привет пилотам!',
  'Моя обувная полка',
  'Дорога к счастью',
  'Белая «Audi»',
  'ПП-завтрак',
  'Местный деликатес',
  'Космические башмачки B)',
  'А внизу горы...',
  'Национальный хор',
  'Американская классика',
  'Тапочки с фонариками',
  'Лакшери и Пальмы',
  'ПП-обед',
  'Романтическое купание',
  'Мистер Крабс :D:D:D',
  'Рок-эн-Ролл!',
  'Опасное сафари!'
];


/* *******************************
*** 2. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ***
******************************* */

// *** 2.1) Рандомайзер значений ***
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * max);

  return randomNumber;
};

// *** 2.2) Наполнитель адресного массива по порядку (от 1 до n-го элемента) ***
var getArrayOfNumbers = function (emptyArray, arrayLength) {
  var arrayOfNumbers = [];

  for (var i = 0; i < arrayLength; i++) {
    arrayOfNumbers[i] = i + 1;
  }

  return arrayOfNumbers;
};


/* ***********************
*** 3. ОСНОВНАЯ ЛОГИКА ***
*********************** */

// *** 3.1) Шаблон для Фотокарточки ***
var getPhotoCard = function (urlNumber, photoDescription, likesCount, commentsList) {
  var photoCard = {
    url: 'photos/' + urlNumber + '.jpg',
    description: photoDescription,
    likes: likesCount,
    comments: commentsList
  };

  return photoCard;
};


// *** 3.2) Генерация Объекта с комментарием ***
var getCommentObject = function () {
  // --- Случайные элементы массивов ---
  var randomMessage = getRandomNumber(ZERO_ELEMENT, MESSAGES.length); // --- Случайный номер элемента для массива комментариев
  var randomName = getRandomNumber(ZERO_ELEMENT, NAMES.length); // --- Случайный номер элемента для массива имён

  // --- Переменные для формирования объекта-комментария ---
  var avatarNumber = getRandomNumber(FIRST_AVATAR, LAST_AVATAR);
  var message = MESSAGES[randomMessage];
  var name = NAMES[randomName];

  // --- Шаблон для объекта-комментария ---
  var commentObject = {
    commentatorAvatar: 'img/avatar-' + avatarNumber + '.svg',
    commentatorMessage: message,
    commentatorName: name
  };

  // --- Удаление использованных элементов из массивов ---
  MESSAGES.splice(randomMessage, DELETE_COUNT);
  NAMES.splice(randomName, DELETE_COUNT);

  return commentObject;
};


// *** 3.3) Генерация массива с комментариями ***
var getCommentsArray = function () {
  var randomCommentsCount = getRandomNumber(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
  var commentsArray = [];

  for (var i = 0; i < randomCommentsCount; i++) {
    commentsArray[i] = getCommentObject();
  }

  return commentsArray;
};


// *** 3.4) Генерация массива с Фотографиями ***
var getArrayOfPhotos = function () {
  // --- Заполнение адресного массива элементами ---
  var addressArray = getArrayOfNumbers(addressArray, PHOTOS_COUNT);

  // --- Пустой массив для фотографий ---
  var arrayOfPhotos = [];

  for (var i = 0; i < PHOTOS_COUNT; i++) {
    // --- Переменные для формирования Фотокарточки ---
    var randomPhotoNumber = getRandomNumber(ZERO_ELEMENT, addressArray.length); // --- Случайный номер фото
    var photoUrl = addressArray[randomPhotoNumber]; // --- Адрес фотографии
    var photoDescription = DESCRIPTIONS[randomPhotoNumber]; // --- Описание фотографии
    var randomLikesCount = getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT); // --- Количество лайков
    var commentsList = getCommentsArray(); // --- Список комментариев

    // --- Заполнение массива Фотографий ---
    arrayOfPhotos[i] = getPhotoCard(photoUrl, photoDescription, randomLikesCount, commentsList);

    // --- Удаление использованных элементов массива ---
    addressArray.splice(randomPhotoNumber, DELETE_COUNT);
    DESCRIPTIONS.splice(randomPhotoNumber, DELETE_COUNT);
  }

  return arrayOfPhotos;
};


// *** 3.4) Наполнение DOM-элементов и отрисовка Фотографий на страницу ***

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
var arrayOfPhotos = getArrayOfPhotos();

// --- Создание фрагмента в DOM ---
var fragment = document.createDocumentFragment();

for (var j = 0; j < arrayOfPhotos.length; j++) {
  fragment.appendChild(getARenderedPicture(arrayOfPhotos[j]));
}

// --- Отрисовка фотографий на страницу ---
PICTURES_CONTAINER.appendChild(fragment);
