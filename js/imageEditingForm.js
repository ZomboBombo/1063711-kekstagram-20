'use strict';

/*
________________________________________

--- ФОРМА РЕДАКТИРОВАНИЯ ИЗОБРАЖЕНИЙ ---
________________________________________

*/
window.imageEditingForm = (function () {
  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */
  // ********* КОНСТАНТЫ *********
  var ATTRIBUTE_EMPTY_VALUE = ''; // --- Сброс значения атрибута элемента
  var HUNDRED_PERCENT_VALUE = '100%';
  var CLASS_LIST_MOD = 1; // --- Порядковый номер элемента с модификатором класса (в массиве классов эффектов для изображения)
  var FILTER_ORIGINAL = 'effect-none';
  var DISPLAY_NONE = 'none';
  var DISPLAY_BLOCK = 'block';

  // ********* DOM-элементы *********
  var BODY = document.querySelector('body'); // --- DOM-элемент для <body>

  var IMAGE_UPLOAD_FORM = document.querySelector('#upload-select-image'); // --- Форма загрузки и редактирования изображения

  var IMAGE_EDITING_FORM = IMAGE_UPLOAD_FORM.querySelector('.img-upload__overlay'); // --- Окно редактирования изображения
  var IMAGE_EDITING_PREVIEW = IMAGE_EDITING_FORM.querySelector('.img-upload__preview img'); // --- Превью редактируемого изображения
  var IMAGE_EFFECT_LEVEL = IMAGE_EDITING_FORM.querySelector('.img-upload__effect-level'); // --- Группа полей слайдера
  var IMAGE_EDITING_FORM_EXIT = IMAGE_EDITING_FORM.querySelector('#upload-cancel'); // --- Кнопка закрытия окна редактирования изображения
  var IMAGE_EDITING_FIELDSET_OF_EFFECTS = IMAGE_EDITING_FORM.querySelector('.img-upload__effects'); // --- Группа полей с эффектами для изображения
  var IMAGE_EDITING_EFFECTS = IMAGE_EDITING_FIELDSET_OF_EFFECTS.querySelectorAll('.effects__radio'); // --- Список эффектов для изображения
  var IMAGE_EDITING_EFFECT_PREVIEWS = IMAGE_EDITING_FIELDSET_OF_EFFECTS.querySelectorAll('.effects__preview'); // --- Лейблы к эффектам

  var SCALE_CONTROL_SMALLER = IMAGE_EDITING_FORM.querySelector('.scale__control--smaller'); // --- Кнопка уменьшения масштаба изображения
  var SCALE_CONTROL_BIGGER = IMAGE_EDITING_FORM.querySelector('.scale__control--bigger'); // --- Кнопка увеличения масштаба изображения

  var FIELD_FOR_HASHTAGS = IMAGE_EDITING_FORM.querySelector('.text__hashtags'); // --- Поле для ввода Хештегов
  var FIELD_FOR_DESCRIPTION = IMAGE_EDITING_FORM.querySelector('.text__description'); // --- Поле для описания фотографии


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */
  // *** Функция для обработчика события наложения эффекта на изображение ***
  var onEffectChange = function () {
    // --- Сброс списка классов и стилей наложенного фильтра изображения ***
    IMAGE_EDITING_PREVIEW.classList = ATTRIBUTE_EMPTY_VALUE;
    IMAGE_EDITING_PREVIEW.style.filter = ATTRIBUTE_EMPTY_VALUE;

    // --- Сброс положения ползунка при переключении фильтров ---
    window.slider.EFFECT_LEVEL_PIN.style.left = HUNDRED_PERCENT_VALUE;
    window.slider.EFFECT_LEVEL_DEPTH.style.width = HUNDRED_PERCENT_VALUE;

    // --- Цикл для реализации наложения эффектов на изображение ***
    for (var i = 0; i < IMAGE_EDITING_EFFECTS.length; i++) {
      if (IMAGE_EDITING_EFFECTS[i].checked) {
        IMAGE_EDITING_PREVIEW.classList.add(IMAGE_EDITING_EFFECT_PREVIEWS[i].classList[CLASS_LIST_MOD]);

        // --- Условие для включения фильтра «Оригинал» ---
        if (IMAGE_EDITING_EFFECTS[i].id === FILTER_ORIGINAL) {
          IMAGE_EFFECT_LEVEL.style.display = DISPLAY_NONE;
        } else {
          IMAGE_EFFECT_LEVEL.style.display = DISPLAY_BLOCK;
        }

        break;
      }
    }
  };


  // ============ ОТКРЫТИЕ И ЗАКРЫТИЕ ОКНА РЕДАКТИРОВАНИЯ ============
  // *** Функция для обработчика события закрытия окна редактирования изображения с помощью "Escape" ***
  var onEscPress = function (evt) {
    if (evt.key === window.util.ESC) {
      evt.preventDefault();

      /*
        Дополнительная проверка ("... !== document.activeElement")
        гарантирует, что окно редактирования изображения не будет закрыто при нажатии
        на клавишу «Escape» в момент, когда фокус находится в поле ввода хештегов
        или описания к фотографии.
      */
      if (FIELD_FOR_HASHTAGS !== document.activeElement && FIELD_FOR_DESCRIPTION !== document.activeElement) {
        onClose();
      }
    }
  };


  // *** Функция для ОТКРЫТИЯ окна редактирования изображения ***
  var onOpen = function () {
    IMAGE_EDITING_FORM.classList.remove('hidden');
    IMAGE_EFFECT_LEVEL.style.display = DISPLAY_NONE;

    // --- Добавление <body> класса для отключения прокрутки страницы при открытом модальном окне ---
    BODY.classList.add('modal-open');

    // ======= ОБРАБОТЧИКИ СОБЫТИЙ =======
    FIELD_FOR_HASHTAGS.addEventListener('input', window.formValidation.hashtagField); // --- Валидация хештегов
    FIELD_FOR_DESCRIPTION.addEventListener('input', window.formValidation.textArea); // --- Валидация поля для описания фотографии

    SCALE_CONTROL_SMALLER.addEventListener('click', window.pictureScale.onDecrease); // --- Обработчик события УМЕНЬШЕНИЯ масштаба
    SCALE_CONTROL_BIGGER.addEventListener('click', window.pictureScale.onIncrease); // --- Обработчик события УВЕЛИЧЕНИЯ масштаба

    IMAGE_EDITING_FIELDSET_OF_EFFECTS.addEventListener('change', onEffectChange); // --- Обработчик события Наложения эффекта на изображение

    document.addEventListener('keydown', onEscPress); // --- Закрытие модального окна с помощью "Escape"
  };


  // *** Функция для ЗАКРЫТИЯ окна редактирования изображения ***
  var onClose = function () {
    IMAGE_EDITING_FORM.classList.add('hidden');
    IMAGE_UPLOAD_FORM.reset(); // --- Сброс полей Формы в исходное состояние
    IMAGE_EDITING_PREVIEW.style = ATTRIBUTE_EMPTY_VALUE;
    IMAGE_EDITING_PREVIEW.classList = ATTRIBUTE_EMPTY_VALUE;

    // --- Добавление <body> класса для отключения прокрутки страницы при открытом модальном окне ---
    BODY.classList.remove('modal-open');

    // ======= УДАЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ =======
    FIELD_FOR_HASHTAGS.removeEventListener('input', window.formValidation.hashtagField); // --- Валидация хештегов
    FIELD_FOR_DESCRIPTION.removeEventListener('input', window.formValidation.textArea); // --- Валидация поля для описания фотографии

    SCALE_CONTROL_SMALLER.removeEventListener('click', window.pictureScale.onDecrease); // --- Обработчик события УМЕНЬШЕНИЯ масштаба
    SCALE_CONTROL_BIGGER.removeEventListener('click', window.pictureScale.onIncrease); // --- Обработчик события УВЕЛИЧЕНИЯ масштаба

    IMAGE_EDITING_FIELDSET_OF_EFFECTS.removeEventListener('change', onEffectChange); // --- Обработчик события Наложения эффекта на изображение

    document.removeEventListener('keydown', onEscPress); // --- Закрытие модального окна с помощью "Escape"
  };


  // *** Обработчик события — Закрытие Формы редактирования изображения ***
  IMAGE_EDITING_FORM_EXIT.addEventListener('click', onClose);


  // ************ СБОР ДАННЫХ ФОРМЫ И ОТПРАВКА НА СЕРВЕР ************
  var form = IMAGE_UPLOAD_FORM;

  // *** Функция обработки соыбтия отправки формы ***
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.sendData(new FormData(form), window.formDataSubmit.success, window.formDataSubmit.error);
  };

  form.addEventListener('submit', onFormSubmit);

  return {
    // --- Ссылки на DOM-элементы ---
    exit: IMAGE_EDITING_FORM_EXIT,

    // --- Обработчики событий ---
    open: onOpen,
    close: onClose
  };

})();
