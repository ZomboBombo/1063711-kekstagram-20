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
var ESC = 'Escape'; // --- Ключ для клавишы "Escape"
var SEPARATOR = ' '; // --- Символ «пробел» — разделитель для метода "split()"
var BASE_NUMBER_SYSTEM = 10; // --- Основа системы счисления
var MIN_SCALE_VALUE = 25; // --- Минимальное значение масштаба изображения
var MAX_SCALE_VALUE = 100; // --- Максимальное значение масштаба изображения
var SCALE_STEP = 25; // --- Шаг масштабирования
var PERCENTAGE = '%'; // --- Процентный символ (для указания значения масштаба в процентах)
var TRANSFORMATION_RATIO = 100; // --- Коэффициент трансформации ( для "transform: scale()" )
var CLASS_LIST_MOD = 1; // --- Порядковый номер элемента с модификатором класса (в массиве классов эффектов для изображения)
var ATTRIBUTE_NULL_VALUE = ''; // --- Сброс значения атрибута элемента

// *** 1.2) Переменные для DOM-элементов ***
var BODY = document.querySelector('body'); // --- DOM-элемент для <body>

var PICTURE_TEMPLATE = document.querySelector('#picture') // --- Шаблон для вставки фотографий
                      .content
                      .querySelector('.picture');

var PICTURES_CONTAINER = document.querySelector('.pictures'); // --- Блок для отрисовки фотографий на страницу

var BIG_PICTURE_CONTAINER = document.querySelector('.big-picture'); // --- Контейнер для полноразмерной фотографии
var BIG_PICTURE = BIG_PICTURE_CONTAINER.querySelector('.big-picture__preview'); // --- Шаблон для полноразмерной фотографии
var BIG_PICTURE_CLOSE = BIG_PICTURE.querySelector('.big-picture__cancel'); // --- Кнопка закрытия полноразмерной фотографии

var COMMENTS = BIG_PICTURE.querySelector('.social__comments'); // --- Список комментариев
var COMMENTS_COUNT = BIG_PICTURE.querySelector('.social__comment-count'); // --- Блок, отображающий количество комментариев
var COMMENTS_LOADER = BIG_PICTURE.querySelector('.comments-loader'); // --- Кнопка загрузки дополнительных комментариев
var COMMENTS_ELEMENTS = COMMENTS.querySelectorAll('.social__comment'); // --- Элементы списка комментариев

var FORM_UPLOAD_IMAGE = document.querySelector('#upload-select-image'); // --- Форма загрузки и редактирования изображения
var UPLOAD_FILE = FORM_UPLOAD_IMAGE.querySelector('#upload-file'); // --- Контрол загрузки нового изображения
var IMAGE_EDITING_FORM = FORM_UPLOAD_IMAGE.querySelector('.img-upload__overlay'); // --- Окно редактирования изображения
var IMAGE_EDITING_FORM_EXIT = IMAGE_EDITING_FORM.querySelector('#upload-cancel'); // --- Кнопка закрытия окна редактирования изображения
var SLIDER_HANDLE = IMAGE_EDITING_FORM.querySelector('.effect-level__pin'); // --- Ручка слайдера
var FIELD_FOR_HASHTAGS = IMAGE_EDITING_FORM.querySelector('.text__hashtags'); // --- Поле для ввода Хештегов
var FIELD_FOR_DESCRIPTION = IMAGE_EDITING_FORM.querySelector('.text__description'); // --- Поле для описания фотографии

var IMAGE_EDITING_PREVIEW = IMAGE_EDITING_FORM.querySelector('.img-upload__preview img'); // --- Превью редактируемого изображения
var SCALE_CONTROL_SMALLER = IMAGE_EDITING_FORM.querySelector('.scale__control--smaller'); // --- Кнопка уменьшения масштаба изображения
var SCALE_CONTROL_BIGGER = IMAGE_EDITING_FORM.querySelector('.scale__control--bigger'); // --- Кнопка увеличения масштаба изображения
var SCALE_CONTROL_VALUE = IMAGE_EDITING_FORM.querySelector('.scale__control--value'); // --- Поле, отображающее масштаб (в процентах)

var IMAGE_EDITING_FIELDSET_OF_EFFECTS = IMAGE_EDITING_FORM.querySelector('.img-upload__effects'); // --- Группа полей с эффектами для изображения
var IMAGE_EDITING_EFFECTS = IMAGE_EDITING_FIELDSET_OF_EFFECTS.querySelectorAll('.effects__radio'); // --- Список эффектов для изображения
var IMAGE_EDITING_EFFECT_PREVIEWS = IMAGE_EDITING_FIELDSET_OF_EFFECTS.querySelectorAll('.effects__preview'); // --- Лейблы к эффектам


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

// *** 2.3) Генератор копий массивов ***
var getCopyOfArray = function (originalArray) {
  var copyOfArray = [];

  for (var i = 0; i < originalArray.length; i++) {
    copyOfArray[i] = originalArray[i];
  }

  return copyOfArray;
};


/* ********************
*** ОСНОВНАЯ ЛОГИКА ***
******************** */

// ===================== НАПОЛНЕНИЕ САЙТА ПОЛЬЗОВАТЕЛЬСКИМИ ФОТОГРАФИЯМИ =====================

// *** 1) Шаблон для Фотокарточки ***
var getPhotoCard = function (urlNumber, photoDescription, likesCount, commentsList) {
  var photoCard = {
    url: 'photos/' + urlNumber + '.jpg',
    description: photoDescription,
    likes: likesCount,
    comments: commentsList
  };

  return photoCard;
};


// *** 2) Генерация Объекта с комментарием ***
var getCommentObject = function () {
  // --- Копирование оригинальных массивов ---
  var copyOfMessages = getCopyOfArray(MESSAGES); // --- Копия массива Сообщений
  var copyOfNames = getCopyOfArray(NAMES); // --- Копия массива Имён комментаторов

  // --- Случайные элементы массивов ---
  var randomMessage = getRandomNumber(ZERO_ELEMENT, copyOfMessages.length); // --- Случайный номер элемента для массива комментариев
  var randomName = getRandomNumber(ZERO_ELEMENT, copyOfNames.length); // --- Случайный номер элемента для массива имён

  // --- Переменные для формирования объекта-комментария ---
  var avatarNumber = getRandomNumber(FIRST_AVATAR, LAST_AVATAR);
  var message = copyOfMessages[randomMessage];
  var name = copyOfNames[randomName];

  // --- Шаблон для объекта-комментария ---
  var commentObject = {
    commentatorAvatar: 'img/avatar-' + avatarNumber + '.svg',
    commentatorMessage: message,
    commentatorName: name
  };

  // --- Удаление использованных элементов из копий массивов ---
  copyOfMessages.splice(randomMessage, DELETE_COUNT);
  copyOfNames.splice(randomName, DELETE_COUNT);

  return commentObject;
};


// *** 3) Генерация массива с комментариями ***
var getCommentsArray = function () {
  var randomCommentsCount = getRandomNumber(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);
  var commentsArray = [];

  for (var i = 0; i < randomCommentsCount; i++) {
    commentsArray[i] = getCommentObject();
  }

  return commentsArray;
};


// *** 4) Генерация массива с Фотографиями ***
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


// *** 5) Наполнение DOM-элементов и отрисовка Фотографий на страницу ***

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


// ===================== ЛОГИКА ПОКАЗА ПОЛНОРАЗМЕРНОЙ ФОТОГРАФИИ =====================

// *** Функция для показа полноразмерного изображения ***
var getFullsizePicture = function (smallPicture) {
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

// --- Временное сокрытие блоков ---
COMMENTS_COUNT.classList.add('hidden');
COMMENTS_LOADER.classList.add('hidden');


/*
__________________________________________________________________________

------------------------ ПОЛНОРАЗМЕРНОЕ ИЗОБРАЖЕНИЕ ----------------------
__________________________________________________________________________

*/

// ============ ЛОГИКА ПОКАЗА ПОЛНОРАЗМЕРОГО ИЗОБРАЖЕНИЯ ============

// *** DOM-элементы пользовательских фотографий ***
var userImages = PICTURES_CONTAINER.querySelectorAll('.picture__img');


// *** Присвоение ID каждому DOM-элементу с фотографией ***
/*
  Данный цикл нужен для связи DOM-элементов пользовательских фотографий
  с JS-объектами, которые их описывают.
  Необходимо для применения способа делегирования.
*/
for (var l = 0; l < userImages.length; l++) {
  userImages[l].id = l; // --- Присвоение в качестве ID порядкового номера (от 0 до длины коллекции фотографий пользователей)
}

// *** Функция для обработчика события закрытия полноразмерного изображения с помощью "Escape" ***
var escPressInBigPictureHandler = function (evt) {
  if (evt.key === ESC) {
    evt.preventDefault();

    closeBigPictureHandler();
  }
};


// *** Функция для обработчика события ОТКРЫТИЯ полноразмерного изображения ***
var openBigPictureHandler = function (evt) {
  var numberOfJSObject; // --- Переменная для порядкового номера JS-объекта

  // --- Дерево условий для таргетированного нахождения нужного ID элемента ---
  if (evt.target.id) {
    numberOfJSObject = evt.target.id;
  } else if (evt.target.querySelector('img').id) {
    numberOfJSObject = evt.target.querySelector('img').id;
  }

  // --- Получение полноразмерного изображения ---
  getFullsizePicture(generatedArrayOfPhotos[numberOfJSObject]);

  // --- Открытие полноразмерного изображения ---
  BIG_PICTURE_CONTAINER.classList.remove('hidden');

  // --- Добавление <body> класса для отключения прокрутки страницы при открытом модальном окне ---
  BODY.classList.add('modal-open');

  // === ОБРАБОТЧИКИ СОБЫТИЙ ===
  BIG_PICTURE_CLOSE.addEventListener('click', closeBigPictureHandler);

  document.addEventListener('keydown', escPressInBigPictureHandler);
};

// *** Функция для обработчика события ЗАКРЫТИЯ полноразмерного изображения ***
var closeBigPictureHandler = function () {
  // --- Сокрытие полноразмерного изображения ---
  BIG_PICTURE_CONTAINER.classList.add('hidden');

  // --- Удаление <body> класса для отключения прокрутки страницы при открытом модальном окне ---
  BODY.classList.remove('modal-open');

  // === УДАЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ ===
  BIG_PICTURE_CLOSE.removeEventListener('click', closeBigPictureHandler);

  document.removeEventListener('keydown', escPressInBigPictureHandler);
};


// *** Добавление обработчика события для показа Полноразмерной фотографии ***
PICTURES_CONTAINER.addEventListener('click', openBigPictureHandler);


/*
________________________________________________________________________________

------------------------ ФОРМА РЕДАКТИРОВАНИЯ ИЗОБРАЖЕНИЯ ----------------------
________________________________________________________________________________

*/

// ============ ИЗМЕНЕНИЕ МАСШТАБА ИЗОБРАЖЕНИЯ ============

// *** 1) Функция для изменения значения в поле и масштаба изображения ***
var scaleChange = function (valueOfScale) {
  // --- Запись получившегося значения в атрибут "value" поля отображения масштаба ---
  SCALE_CONTROL_VALUE.value = valueOfScale + PERCENTAGE;

  // --- Коэффициент масштабирования для CSS-свойства "transform" ---
  var scaleFactor = valueOfScale / TRANSFORMATION_RATIO;

  // --- Добавление CSS-свойства "transform: scale()" редактируемому изображению ---
  IMAGE_EDITING_PREVIEW.style = 'transform: scale(' + scaleFactor + ')';
};

// *** 2) Функция для обработчика события УМЕНЬШЕНИЯ масштаба изображения ***
var scaleDecreaseHandler = function () {
  // --- Приведение значения масштаба к числовому типу ---
  var valueOfScaleForDecrease = parseInt(SCALE_CONTROL_VALUE.value, BASE_NUMBER_SYSTEM);

  /*
    Если значение масштаба больше либо равно МИНИМАЛЬНОМУ значению,
    тогда УМЕНЬШИТЬ значение на Шаг масштабирования (25).
  */
  if (valueOfScaleForDecrease >= MIN_SCALE_VALUE) {
    valueOfScaleForDecrease -= SCALE_STEP;

    /*
      Если получившееся значение меньше МИНИМАЛЬНОГО значения масштаба,
      тогда приравнять получившееся к МИНИМАЛЬНОМУ.
    */
    if (valueOfScaleForDecrease < MIN_SCALE_VALUE) {
      valueOfScaleForDecrease = MIN_SCALE_VALUE;
    }
  }

  // --- Изменение масштаба редактируемого изображения ---
  scaleChange(valueOfScaleForDecrease);
};

// *** 3) Функция для обработчика события УВЕЛИЧЕНИЯ масштаба изображения ***
var scaleIncreaseHandler = function () {
  // --- Приведение значения масштаба к числовому типу ---
  var valueOfScaleForIncrease = parseInt(SCALE_CONTROL_VALUE.value, BASE_NUMBER_SYSTEM);

  /*
    Если значение масштаба меньше либо равно МАКСИМАЛЬНОМУ значению,
    тогда УВЕЛИЧИТЬ значение на Шаг масштабирования (25).
  */
  if (valueOfScaleForIncrease <= MAX_SCALE_VALUE) {
    valueOfScaleForIncrease += SCALE_STEP;

    /*
      Если получившееся значение больше МАКСИМАЛЬНОГО значения масштаба,
      тогда приравнять получившееся к МАКСИМАЛЬНОМУ.
    */
    if (valueOfScaleForIncrease > MAX_SCALE_VALUE) {
      valueOfScaleForIncrease = MAX_SCALE_VALUE;
    }
  }

  // --- Изменение масштаба редактируемого изображения ---
  scaleChange(valueOfScaleForIncrease);
};


// ============ ВАЛИДАЦИЯ ХЕШТЕГОВ ============

// *** Функция для валидации хештегов ***
var hashtagValidationHandler = function () {
  // *** Регулярное выражение — паттерн для валидации Хештегов ***
  var regExpForHashtag = /^#[\wа-яА-я]*$/;

  // --- Массив — набор хештегов из поля ввода ---
  var HASHTAGS = FIELD_FOR_HASHTAGS.value.split(SEPARATOR);

  // *** Цикл для валидации Хештегов ***
  for (var i = 0; i < HASHTAGS.length; i++) {
    var matchCount = 0; // --- Количество повторяющихся хештегов

    // --- Проверка на повторяющиеся хештеги в массиве ---
    for (var j = i + 1; j < HASHTAGS.length; j++) {
      if (HASHTAGS[i].toLowerCase() === HASHTAGS[j].toLowerCase()) {
        matchCount++;
      }
    }

    // *** Переменные для ОШИБОК валидации ***
    var errPatternMismatch = !regExpForHashtag.test(HASHTAGS[i]);
    var errLoneHash = HASHTAGS[i] === '#';
    var errTooLongHashtag = HASHTAGS[i].length >= 20;
    var errTooManyHashtags = HASHTAGS.length > 5;
    var errDuplicateHashtags = matchCount > 0;

    // *** Переменные для СООБЩЕНИЙ об ошибках валидации ***
    var messageOfPatternMismatch = 'Ошибка! Хештег «' + HASHTAGS[i] + '» не соответствует паттерну ввода! Хештег не может содержать пробелы, специальные символы (типа «@, $, #»), символы пунктуации (тире, дефис, запятая и т.д.), а также эмодзи.';
    var messageOfLoneHash = 'Ошибка! Хештег «' + HASHTAGS[i] + '» не может состоять только из "решётки"!';
    var messageOfTooLongHashtag = 'Ошибка! Длина хештега «' + HASHTAGS[i] + '» превышает 20 символов!';
    var messageOfTooManyHashtags = 'Ошибка! Нельзя добавить больше 5-ти хештегов! Количество хештегов сейчас: ' + HASHTAGS.length;
    var messageOfDuplicateHashtags = 'Ошибка! Набор не может содержать несколько одинаковых хештегов!';


    // --- Правила валидации набора хештегов ---
    if (errPatternMismatch) { // --- 1) Несоответствие паттерну ввода (наличие спецсимволов, пнктуационных знаков и т.д.)
      FIELD_FOR_HASHTAGS.setCustomValidity(messageOfPatternMismatch);
      break;
    } else if (errTooManyHashtags) { // --- 2) Слишком много хештегов (не должно ыбть больше 5)
      FIELD_FOR_HASHTAGS.setCustomValidity(messageOfTooManyHashtags);
      break;
    } else if (errLoneHash) { // --- 3) "Одинокая решётка" — хештег не может состоять только из "решётки"
      FIELD_FOR_HASHTAGS.setCustomValidity(messageOfLoneHash);
      break;
    } else if (errTooLongHashtag) { // --- 4) Слишком много символов в хештеге (не должно быть больше 20)
      FIELD_FOR_HASHTAGS.setCustomValidity(messageOfTooLongHashtag);
      break;
    } else if (errDuplicateHashtags) { // --- 5) Повторяющиеся хештеги
      FIELD_FOR_HASHTAGS.setCustomValidity(messageOfDuplicateHashtags);
      break;
    } else {
      FIELD_FOR_HASHTAGS.setCustomValidity('');
    }
  }

  /*
    ______________________________________

    Набор хештегов для проверки валидации:
    ______________________________________

    # ## #1unogrande$ #h@sh #ter #more #TER #neksus #Ter #good #bad #EVIL #этот_хештег_должен_быть_короче_20_символов
  */
};


// ============ НАЛОЖЕНИЕ ЭФФЕКТОВ НА ИЗОБРАЖЕНИЕ ============

// *** Функция для обработчика события наложения эффекта на изображение ***
var imageEffectChangeHandler = function () {
  // --- Сброс списка классов изображения ***
  IMAGE_EDITING_PREVIEW.classList = ATTRIBUTE_NULL_VALUE;

  // --- Цикл для реализации наложения эффектов на изображение ***
  for (var i = 0; i < IMAGE_EDITING_EFFECTS.length; i++) {
    if (IMAGE_EDITING_EFFECTS[i].checked) {
      IMAGE_EDITING_PREVIEW.classList.add(IMAGE_EDITING_EFFECT_PREVIEWS[i].classList[CLASS_LIST_MOD]);
    }
  }
};


// ============ ЛОГИКА ОТКРЫТИЯ И ЗАКРЫТИЯ ОКНА РЕДАКТИРОВАНИЯ ============

// *** 1) Функция для обработчика события закрытия окна редактирования изображения с помощью "Escape" ***
var escPressInImageFormHandler = function (evt) {
  if (evt.key === ESC) {
    evt.preventDefault();

    /*
      Дополнительная проверка ("... !== document.activeElement")
      гарантирует, что окно редактирования изображения не будет закрыто при нажатии
      на клавишу «Escape» в момент, когда фокус находится в поле ввода хештегов
      или описания к фотографии.
    */
    if (FIELD_FOR_HASHTAGS !== document.activeElement && FIELD_FOR_DESCRIPTION !== document.activeElement) {
      closeImageEditingForm();
    }
  }
};


// *** 2) Функция для ОТКРЫТИЯ окна редактирования изображения ***
var openImageEditingForm = function () {
  IMAGE_EDITING_FORM.classList.remove('hidden');

  // --- Добавление <body> класса для отключения прокрутки страницы при открытом модальном окне ---
  BODY.classList.add('modal-open');

  // ======= ОБРАБОТЧИКИ СОБЫТИЙ =======
  FIELD_FOR_HASHTAGS.addEventListener('input', hashtagValidationHandler); // --- Валидация хештегов

  SCALE_CONTROL_SMALLER.addEventListener('click', scaleDecreaseHandler); // --- Обработчик события УМЕНЬШЕНИЯ масштаба
  SCALE_CONTROL_BIGGER.addEventListener('click', scaleIncreaseHandler); // --- Обработчик события УВЕЛИЧЕНИЯ масштаба

  IMAGE_EDITING_FIELDSET_OF_EFFECTS.addEventListener('change', imageEffectChangeHandler); // --- Обработчик события Наложения эффекта на изображение

  document.addEventListener('keydown', escPressInImageFormHandler); // --- Закрытие модального окна с помощью "Escape"
};


// *** 3) Функция для ЗАКРЫТИЯ окна редактирования изображения ***
var closeImageEditingForm = function () {
  IMAGE_EDITING_FORM.classList.add('hidden');
  FORM_UPLOAD_IMAGE.reset(); // --- Сброс полей Формы в исходное состояние
  IMAGE_EDITING_PREVIEW.style = ATTRIBUTE_NULL_VALUE;
  IMAGE_EDITING_PREVIEW.classList = ATTRIBUTE_NULL_VALUE;

  // --- Добавление <body> класса для отключения прокрутки страницы при открытом модальном окне ---
  BODY.classList.remove('modal-open');

  // ======= УДАЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ =======
  FIELD_FOR_HASHTAGS.removeEventListener('input', hashtagValidationHandler); // --- Валидация хештегов

  SCALE_CONTROL_SMALLER.removeEventListener('click', scaleDecreaseHandler); // --- Обработчик события УМЕНЬШЕНИЯ масштаба
  SCALE_CONTROL_BIGGER.removeEventListener('click', scaleIncreaseHandler); // --- Обработчик события УВЕЛИЧЕНИЯ масштаба

  IMAGE_EDITING_FIELDSET_OF_EFFECTS.removeEventListener('change', imageEffectChangeHandler); // --- Обработчик события Наложения эффекта на изображение

  document.removeEventListener('keydown', escPressInImageFormHandler); // --- Закрытие модального окна с помощью "Escape"
};


/* *****************************************
*** ОСНОВНАЯ ЛОГИКА: ОБРАБОТЧИКИ СОБЫТИЙ ***
***************************************** */

// *** Обработчик события — Загрузка изображения на сайт ***
UPLOAD_FILE.addEventListener('change', function () {
  openImageEditingForm();
});

// *** Обработчик события — Закрытие Формы редактирования изображения ***
IMAGE_EDITING_FORM_EXIT.addEventListener('click', function () {
  closeImageEditingForm();
});

// *** Обработчик события перетаскивания ползунка для изменения насыщенности изображения ***
SLIDER_HANDLE.addEventListener('mouseup', function () {});
