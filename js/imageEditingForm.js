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
  var ATTRIBUTE_NULL_VALUE = ''; // --- Сброс значения атрибута элемента
  var CLASS_LIST_MOD = 1; // --- Порядковый номер элемента с модификатором класса (в массиве классов эффектов для изображения)

  // ********* DOM-элементы *********
  var BODY = document.querySelector('body'); // --- DOM-элемент для <body>

  var FORM_UPLOAD_IMAGE = document.querySelector('#upload-select-image'); // --- Форма загрузки и редактирования изображения

  var IMAGE_EDITING_FORM = FORM_UPLOAD_IMAGE.querySelector('.img-upload__overlay'); // --- Окно редактирования изображения
  var IMAGE_EDITING_PREVIEW = IMAGE_EDITING_FORM.querySelector('.img-upload__preview img'); // --- Превью редактируемого изображения
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
    // --- Сброс списка классов изображения ***
    IMAGE_EDITING_PREVIEW.classList = ATTRIBUTE_NULL_VALUE;

    // --- Цикл для реализации наложения эффектов на изображение ***
    for (var i = 0; i < IMAGE_EDITING_EFFECTS.length; i++) {
      if (IMAGE_EDITING_EFFECTS[i].checked) {
        IMAGE_EDITING_PREVIEW.classList.add(IMAGE_EDITING_EFFECT_PREVIEWS[i].classList[CLASS_LIST_MOD]);
      }
    }
  };


  // ============ ОТКРЫТИЕ И ЗАКРЫТИЕ ОКНА РЕДАКТИРОВАНИЯ ============

  // *** 1) Функция для обработчика события закрытия окна редактирования изображения с помощью "Escape" ***
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


  // *** 2) Функция для ОТКРЫТИЯ окна редактирования изображения ***
  var onOpen = function () {
    IMAGE_EDITING_FORM.classList.remove('hidden');

    // --- Добавление <body> класса для отключения прокрутки страницы при открытом модальном окне ---
    BODY.classList.add('modal-open');

    // ======= ОБРАБОТЧИКИ СОБЫТИЙ =======
    FIELD_FOR_HASHTAGS.addEventListener('input', window.hashtagField.onValidation); // --- Валидация хештегов
    // FIELD_FOR_HASHTAGS.addEventListener('input', onValidation); // --- Валидация хештегов

    SCALE_CONTROL_SMALLER.addEventListener('click', window.pictureScale.onDecrease); // --- Обработчик события УМЕНЬШЕНИЯ масштаба
    SCALE_CONTROL_BIGGER.addEventListener('click', window.pictureScale.onIncrease); // --- Обработчик события УВЕЛИЧЕНИЯ масштаба

    IMAGE_EDITING_FIELDSET_OF_EFFECTS.addEventListener('change', onEffectChange); // --- Обработчик события Наложения эффекта на изображение

    document.addEventListener('keydown', onEscPress); // --- Закрытие модального окна с помощью "Escape"
  };


  // *** 3) Функция для ЗАКРЫТИЯ окна редактирования изображения ***
  var onClose = function () {
    IMAGE_EDITING_FORM.classList.add('hidden');
    FORM_UPLOAD_IMAGE.reset(); // --- Сброс полей Формы в исходное состояние
    IMAGE_EDITING_PREVIEW.style = ATTRIBUTE_NULL_VALUE;
    IMAGE_EDITING_PREVIEW.classList = ATTRIBUTE_NULL_VALUE;

    // --- Добавление <body> класса для отключения прокрутки страницы при открытом модальном окне ---
    BODY.classList.remove('modal-open');

    // ======= УДАЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ =======
    FIELD_FOR_HASHTAGS.removeEventListener('input', window.hashtagField.onValidation); // --- Валидация хештегов
    // FIELD_FOR_HASHTAGS.removeEventListener('input', onValidation); // --- Валидация хештегов

    SCALE_CONTROL_SMALLER.removeEventListener('click', window.pictureScale.onDecrease); // --- Обработчик события УМЕНЬШЕНИЯ масштаба
    SCALE_CONTROL_BIGGER.removeEventListener('click', window.pictureScale.onIncrease); // --- Обработчик события УВЕЛИЧЕНИЯ масштаба

    IMAGE_EDITING_FIELDSET_OF_EFFECTS.removeEventListener('change', onEffectChange); // --- Обработчик события Наложения эффекта на изображение

    document.removeEventListener('keydown', onEscPress); // --- Закрытие модального окна с помощью "Escape"
  };


  return {
    // --- Ссылки на DOM-элементы ---
    FORM_UPLOAD_IMAGE: FORM_UPLOAD_IMAGE,
    IMAGE_EDITING_FORM: IMAGE_EDITING_FORM,
    IMAGE_EDITING_PREVIEW: IMAGE_EDITING_PREVIEW,
    IMAGE_EDITING_FORM_EXIT: IMAGE_EDITING_FORM_EXIT,
    IMAGE_EDITING_FIELDSET_OF_EFFECTS: IMAGE_EDITING_FIELDSET_OF_EFFECTS,
    IMAGE_EDITING_EFFECTS: IMAGE_EDITING_EFFECTS,
    IMAGE_EDITING_EFFECT_PREVIEWS: IMAGE_EDITING_EFFECT_PREVIEWS,

    // --- Обработчики событий ---
    onOpen: onOpen,
    onClose: onClose
  };

})();
