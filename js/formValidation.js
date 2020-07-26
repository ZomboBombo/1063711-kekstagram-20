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
  var SEPARATOR = ' '; // --- Символ «пробел» — разделитель для метода "split()"
  var MAX_HASHTAG_LENGTH = 20; // --- Максимальная длина хештега
  var MAX_HASHTAG_COUNT = 5; // --- Максимальное количество хештегов
  var MAX_DESCRIPTION_LENGTH = 140; // --- Максимальная длина описания фотографии (в символах)

  // ********* DOM-элементы *********
  var FORM_UPLOAD_IMAGE = document.querySelector('#upload-select-image'); // --- Форма загрузки и редактирования изображения
  var IMAGE_EDITING_FORM = FORM_UPLOAD_IMAGE.querySelector('.img-upload__overlay'); // --- Окно редактирования изображения
  var FIELD_FOR_HASHTAGS = IMAGE_EDITING_FORM.querySelector('.text__hashtags'); // --- Поле для ввода Хештегов
  var FIELD_FOR_DESCRIPTION = IMAGE_EDITING_FORM.querySelector('.text__description'); // --- Поле для описания фотографии


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


  return {
    checkHashtagField: function () {
      var regExpForHashtag = /^#[\wа-яА-Я]*$/; // --- Паттерн для валидации Хештегов
      var notEmptyHashtagField = FIELD_FOR_HASHTAGS.value !== window.util.ATTRIBUTE_EMPTY_VALUE; // --- НЕ пустое поле для хештегов

      // --- Массив — набор хештегов из поля ввода ---
      var hashtags = FIELD_FOR_HASHTAGS.value.split(SEPARATOR);

      // *** Цикл для валидации Хештегов ***
      for (var i = 0; i < hashtags.length; i++) {
        var matchCount = 0; // --- Количество повторяющихся хештегов

        // --- Проверка на повторяющиеся хештеги в массиве ---
        for (var j = i + 1; j < hashtags.length; j++) {
          if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
            matchCount++;
          }
        }


        // *** Справочник ОШИБОК валидации ***
        var error = {
          patternMismatch: !regExpForHashtag.test(hashtags[i]),
          loneHash: hashtags[i] === '#',
          tooLongHashtag: hashtags[i].length >= MAX_HASHTAG_LENGTH,
          tooManyHashtags: hashtags.length > MAX_HASHTAG_COUNT,
          duplicateHashtags: matchCount > 0
        };

        // *** Справочник СООБЩЕНИЙ об ошибках валидации ***
        var message = {
          patternMismatch: 'Ошибка! Хештег «' + hashtags[i] + '» не соответствует паттерну ввода! Хештег не может содержать пробелы, специальные символы (типа «@, $, #»), символы пунктуации (тире, дефис, запятая и т.д.), а также эмодзи.',
          loneHash: 'Ошибка! Хештег «' + hashtags[i] + '» не может состоять только из "решётки"!',
          tooLongHashtag: 'Ошибка! Длина хештега «' + hashtags[i] + '» превышает 20 символов!',
          tooManyHashtags: 'Ошибка! Нельзя добавить больше 5-ти хештегов! Количество хештегов сейчас: ' + hashtags.length,
          duplicateHashtags: 'Ошибка! Набор не может содержать несколько одинаковых хештегов!'
        };


        // --- Правила валидации набора хештегов ---
        if (error.patternMismatch && notEmptyHashtagField) {
          validationError.add(FIELD_FOR_HASHTAGS, message.patternMismatch);
          break;
        } else if (error.tooManyHashtags) {
          validationError.add(FIELD_FOR_HASHTAGS, message.tooManyHashtags);
          break;
        } else if (error.loneHash) {
          validationError.add(FIELD_FOR_HASHTAGS, message.loneHash);
          break;
        } else if (error.tooLongHashtag) {
          validationError.add(FIELD_FOR_HASHTAGS, message.tooLongHashtag);
          break;
        } else if (error.duplicateHashtags) {
          validationError.add(FIELD_FOR_HASHTAGS, message.duplicateHashtags);
          break;
        } else {
          validationError.remove(FIELD_FOR_HASHTAGS);
        }
      }

      /*
        ______________________________________

        Набор хештегов для проверки валидации:
        ______________________________________

        # ## #1unogrande$ #h@sh #ter #more #TER #neksus #Ter #good #bad #EVIL #этот_хештег_должен_быть_короче_20_символов
      */
    },

    checkTextArea: function () {
      var descriptionError = {
        tooManySymbols: FIELD_FOR_DESCRIPTION.value.length > MAX_DESCRIPTION_LENGTH
      };

      var descriptionErrorMessage = {
        tooManySymbols: 'Количество символов описания фотографии не должно превышать ' + MAX_DESCRIPTION_LENGTH + ' символов! Количество символов сейчас: ' + FIELD_FOR_DESCRIPTION.value.length
      };


      // --- Правила валидации описания к фотографии ---
      switch (true) {
        // --- Слишком длинное описание (количество символов не должно превышать 140) ---
        case descriptionError.tooManySymbols:
          return validationError.add(FIELD_FOR_DESCRIPTION, descriptionErrorMessage.tooManySymbols);

        default:
          return validationError.remove(FIELD_FOR_DESCRIPTION);
      }
    },

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


    errorReport: validationError
  };

})();
