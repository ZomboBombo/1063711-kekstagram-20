'use strict';

/*
____________________________________

--- МОДУЛЬ ВАЛИДАЦИИ ПОЛЕЙ ФОРМЫ ---
____________________________________

*/
window.formValidation = (function () {
  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */
  // ********* КОНСТАНТЫ *********
  var REG_EXP_FOR_HASHTAG = /^#[\wа-яА-Я]*$/; // --- Паттерн для валидации Хештегов
  var SEPARATOR = ' '; // --- Символ «пробел» — разделитель для метода "split()"
  var MAX_HASHTAG_LENGTH = 20; // --- Максимальная длина хештега
  var MAX_HASHTAG_COUNT = 5; // --- Максимальное количество хештегов
  var MAX_DESCRIPTION_LENGTH = 140; // --- Максимальная длина описания фотографии (в символах)

  // ********* DOM-элементы *********
  var formUploadImage = document.querySelector('#upload-select-image'); // --- Форма загрузки и редактирования изображения
  var imageEditingForm = formUploadImage.querySelector('.img-upload__overlay'); // --- Окно редактирования изображения
  var fieldForHashtags = imageEditingForm.querySelector('.text__hashtags'); // --- Поле для ввода Хештегов
  var fieldForDescription = imageEditingForm.querySelector('.text__description'); // --- Поле для описания фотографии


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */
  // *** Справочник методов для валидации ***
  var validationError = {
    add: function (erroredField, message) {
      erroredField.setCustomValidity(message);
      erroredField.style = 'outline: 3px solid rgb(220, 20, 60)';
    },

    remove: function (erroredField) {
      erroredField.setCustomValidity('');
      erroredField.style = '';
    }
  };


  // *** Функция показа валидационного сообщения для поля хештегов ***
  var showHashtagValidationMessage = function (arrayOfHashtags, notEmptyField) {
    // *** Цикл для валидации Хештегов ***
    for (var i = 0; i < arrayOfHashtags.length; i++) {
      var matchCount = window.util.ZERO; // --- Количество повторяющихся хештегов

      // --- Проверка на повторяющиеся хештеги в массиве ---
      for (var j = i + 1; j < arrayOfHashtags.length; j++) {
        if (arrayOfHashtags[i].toLowerCase() === arrayOfHashtags[j].toLowerCase()) {
          matchCount++;
        }
      }

      // *** Справочник ОШИБОК валидации ***
      var error = {
        patternMismatch: !REG_EXP_FOR_HASHTAG.test(arrayOfHashtags[i]),
        loneHash: arrayOfHashtags[i] === '#',
        tooLongHashtag: arrayOfHashtags[i].length >= MAX_HASHTAG_LENGTH,
        tooManyHashtags: arrayOfHashtags.length > MAX_HASHTAG_COUNT,
        duplicateHashtags: matchCount > window.util.ZERO
      };

      // *** Справочник СООБЩЕНИЙ об ошибках валидации ***
      var message = {
        patternMismatch: 'Ошибка! Хештег «' + arrayOfHashtags[i] + '» не соответствует паттерну ввода! Хештег не может содержать пробелы, специальные символы (типа «@, $, #»), символы пунктуации (тире, дефис, запятая и т.д.), а также эмодзи.',
        loneHash: 'Ошибка! Хештег «' + arrayOfHashtags[i] + '» не может состоять только из "решётки"!',
        tooLongHashtag: 'Ошибка! Длина хештега «' + arrayOfHashtags[i] + '» превышает 20 символов!',
        tooManyHashtags: 'Ошибка! Нельзя добавить больше 5-ти хештегов! Количество хештегов сейчас: ' + arrayOfHashtags.length,
        duplicateHashtags: 'Ошибка! Набор не может содержать несколько одинаковых хештегов!'
      };


      // --- Правила валидации набора хештегов ---
      if (error.patternMismatch && notEmptyField) {
        validationError.add(fieldForHashtags, message.patternMismatch);
        break;
      } else if (error.tooManyHashtags) {
        validationError.add(fieldForHashtags, message.tooManyHashtags);
        break;
      } else if (error.loneHash) {
        validationError.add(fieldForHashtags, message.loneHash);
        break;
      } else if (error.tooLongHashtag) {
        validationError.add(fieldForHashtags, message.tooLongHashtag);
        break;
      } else if (error.duplicateHashtags) {
        validationError.add(fieldForHashtags, message.duplicateHashtags);
        break;
      } else {
        validationError.remove(fieldForHashtags);
      }
    }
  };


  // *** Функция показа валидационного сообщения для описания фотографии ***
  var showDescriptionValidationMessage = function () {
    var descriptionError = {
      tooManySymbols: fieldForDescription.value.length > MAX_DESCRIPTION_LENGTH
    };

    var descriptionErrorMessage = {
      tooManySymbols: 'Количество символов описания фотографии не должно превышать ' + MAX_DESCRIPTION_LENGTH + ' символов! Количество символов сейчас: ' + fieldForDescription.value.length
    };


    // --- Правила валидации описания к фотографии ---
    switch (true) {
      // --- Слишком длинное описание (количество символов не должно превышать 140) ---
      case descriptionError.tooManySymbols:
        return validationError.add(fieldForDescription, descriptionErrorMessage.tooManySymbols);

      default:
        return validationError.remove(fieldForDescription);
    }
  };


  return {
    checkHashtagField: function () {
      var notEmptyHashtagField = fieldForHashtags.value !== window.util.ATTRIBUTE_EMPTY_VALUE; // --- НЕ пустое поле для хештегов
      var hashtags = fieldForHashtags.value.split(SEPARATOR); // --- Массив — набор хештегов из поля ввода

      // *** Уведомление о проверке ***
      showHashtagValidationMessage(hashtags, notEmptyHashtagField);


      /*
        ______________________________________

        Набор хештегов для проверки валидации:
        ______________________________________

        # ## #1unogrande$ #h@sh #ter #more #TER #neksus #Ter #good #bad #EVIL #этот_хештег_должен_быть_короче_20_символов
      */
    },

    checkTextArea: function () {
      // *** Уведомление о проверке ***
      showDescriptionValidationMessage();


      /*
      ___________________________________________________________________

        Текст, который должен быть больше одной сотни и четырёх десятков
        да ни одной единицы, чтобы я смог проверить, как работает
        ( и работает ли вообще ) моя кастомная валидация.

        --- ---

        This is the text that i have been modified to do something
        and it is wron and incorrect multiple words system,
        but i don't have so many time to learn my English.
      ___________________________________________________________________

      */
    },

    errorReport: validationError
  };

})();
