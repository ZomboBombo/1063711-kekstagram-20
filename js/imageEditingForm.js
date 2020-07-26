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
  var HUNDRED_PERCENT_VALUE = '100%';
  var FILTER_ORIGINAL = 'effect-none';
  var DISPLAY_NONE = 'none';
  var DISPLAY_BLOCK = 'block';
  var CLASS_LIST_MOD = 1; // --- Порядковый номер элемента с модификатором класса (в массиве классов эффектов для изображения)

  // ********* DOM-элементы *********
  var body = document.querySelector('body'); // --- DOM-элемент для <body>

  var imageUploadForm = document.querySelector('#upload-select-image'); // --- Форма загрузки и редактирования изображения

  var imageEditingForm = imageUploadForm.querySelector('.img-upload__overlay'); // --- Окно редактирования изображения
  var imageEditingPreview = imageEditingForm.querySelector('.img-upload__preview img'); // --- Превью редактируемого изображения
  var imageEffectLevel = imageEditingForm.querySelector('.img-upload__effect-level'); // --- Группа полей слайдера
  var imageEditingFormExit = imageEditingForm.querySelector('#upload-cancel'); // --- Кнопка закрытия окна редактирования изображения
  var imageEditingFieldsetOfEffects = imageEditingForm.querySelector('.img-upload__effects'); // --- Группа полей с эффектами для изображения
  var imageEditingEffects = imageEditingFieldsetOfEffects.querySelectorAll('.effects__radio'); // --- Список эффектов для изображения
  var imageEditingEffectPreviews = imageEditingFieldsetOfEffects.querySelectorAll('.effects__preview'); // --- Лейблы к эффектам

  var scaleControlSmaller = imageEditingForm.querySelector('.scale__control--smaller'); // --- Кнопка уменьшения масштаба изображения
  var scaleControlBigger = imageEditingForm.querySelector('.scale__control--bigger'); // --- Кнопка увеличения масштаба изображения

  var fieldForHashtags = imageEditingForm.querySelector('.text__hashtags'); // --- Поле для ввода Хештегов
  var fieldForDescription = imageEditingForm.querySelector('.text__description'); // --- Поле для описания фотографии


  //  *** Функции обработки событий изменения масштаба изображения ***
  var onScaleDecrease = window.pictureScale.zoomOut;
  var onScaleIncrease = window.pictureScale.zoomIn;

  //  *** Функции обработки событий валидации полей Формы ***
  var onHashtagsValidation = window.formValidation.checkHashtagField;
  var onDescriptionValidation = window.formValidation.checkTextArea;


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */
  // *** Функция для обработчика события наложения эффекта на изображение ***
  var onEffectChange = function () {
    // --- Сброс списка классов и стилей наложенного фильтра изображения ***
    imageEditingPreview.classList = window.util.ATTRIBUTE_EMPTY_VALUE;
    imageEditingPreview.style.filter = window.util.ATTRIBUTE_EMPTY_VALUE;

    // --- Сброс положения ползунка при переключении фильтров ---
    window.slider.effectLevelPin.style.left = HUNDRED_PERCENT_VALUE;
    window.slider.effectLevelDepth.style.width = HUNDRED_PERCENT_VALUE;

    // --- Цикл для реализации наложения эффектов на изображение ***
    for (var i = 0; i < imageEditingEffects.length; i++) {
      if (imageEditingEffects[i].checked) {
        imageEditingPreview.classList.add(imageEditingEffectPreviews[i].classList[CLASS_LIST_MOD]);

        // --- Условие для включения фильтра «Оригинал» ---
        if (imageEditingEffects[i].id === FILTER_ORIGINAL) {
          imageEffectLevel.style.display = DISPLAY_NONE;
        } else {
          imageEffectLevel.style.display = DISPLAY_BLOCK;
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
      if (fieldForHashtags !== document.activeElement && fieldForDescription !== document.activeElement) {
        onClose();
      }
    }
  };


  // *** Функция для ОТКРЫТИЯ окна редактирования изображения ***
  var onOpen = function () {
    imageEditingForm.classList.remove('hidden');
    imageEffectLevel.style.display = DISPLAY_NONE;

    fieldForHashtags.focus();

    body.classList.add('modal-open');

    // ======= ОБРАБОТЧИКИ СОБЫТИЙ =======
    fieldForHashtags.addEventListener('input', onHashtagsValidation); // --- Валидация хештегов
    fieldForDescription.addEventListener('input', onDescriptionValidation); // --- Валидация поля для описания фотографии

    scaleControlSmaller.addEventListener('click', onScaleDecrease); // --- Обработчик события УМЕНЬШЕНИЯ масштаба
    scaleControlBigger.addEventListener('click', onScaleIncrease); // --- Обработчик события УВЕЛИЧЕНИЯ масштаба

    imageEditingFieldsetOfEffects.addEventListener('change', onEffectChange); // --- Обработчик события Наложения эффекта на изображение

    document.addEventListener('keydown', onEscPress); // --- Закрытие модального окна с помощью "Escape"
  };


  // *** Функция для ЗАКРЫТИЯ окна редактирования изображения ***
  var onClose = function () {
    imageEditingForm.classList.add('hidden');
    imageUploadForm.reset(); // --- Сброс полей Формы в исходное состояние
    imageEditingPreview.style = window.util.ATTRIBUTE_EMPTY_VALUE;
    imageEditingPreview.classList = window.util.ATTRIBUTE_EMPTY_VALUE;

    window.formValidation.errorReport.remove(fieldForHashtags);
    window.formValidation.errorReport.remove(fieldForDescription);

    body.classList.remove('modal-open');

    // ======= УДАЛЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ =======
    fieldForHashtags.removeEventListener('input', onHashtagsValidation); // --- Валидация хештегов
    fieldForDescription.removeEventListener('input', onDescriptionValidation); // --- Валидация поля для описания фотографии

    scaleControlSmaller.removeEventListener('click', onScaleDecrease); // --- Обработчик события УМЕНЬШЕНИЯ масштаба
    scaleControlBigger.removeEventListener('click', onScaleIncrease); // --- Обработчик события УВЕЛИЧЕНИЯ масштаба

    imageEditingFieldsetOfEffects.removeEventListener('change', onEffectChange); // --- Обработчик события Наложения эффекта на изображение

    document.removeEventListener('keydown', onEscPress); // --- Закрытие модального окна с помощью "Escape"
  };


  // *** Обработчик события — Закрытие Формы редактирования изображения ***
  imageEditingFormExit.addEventListener('click', onClose);


  // ************ СБОР ДАННЫХ ФОРМЫ И ОТПРАВКА НА СЕРВЕР ************
  var form = imageUploadForm;

  // *** Функция обработки соыбтия отправки формы ***
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.sendData(new FormData(form), window.formDataSubmit.success, window.formDataSubmit.error);
  };

  form.addEventListener('submit', onFormSubmit);

  return {
    // --- Ссылки на DOM-элементы ---
    exit: imageEditingFormExit,

    // --- Обработчики событий ---
    open: onOpen,
    close: onClose
  };

})();
