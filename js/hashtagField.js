'use strict';

/*
_________________________________

--- МОДУЛЬ ВАЛИДАЦИИ ХЕШТЕГОВ ---
_________________________________

*/
window.hashtagField = (function () {

  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */

  // ********* КОНСТАНТЫ *********
  var SEPARATOR = ' '; // --- Символ «пробел» — разделитель для метода "split()"

  // ********* DOM-элементы *********
  var FORM_UPLOAD_IMAGE = document.querySelector('#upload-select-image'); // --- Форма загрузки и редактирования изображения
  var IMAGE_EDITING_FORM = FORM_UPLOAD_IMAGE.querySelector('.img-upload__overlay'); // --- Окно редактирования изображения
  var FIELD_FOR_HASHTAGS = IMAGE_EDITING_FORM.querySelector('.text__hashtags'); // --- Поле для ввода Хештегов


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */

  return {
    // *** Функция для валидации хештегов ***
    onValidation: function () {
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
    }
  };

})();
