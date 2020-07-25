'use strict';

/*
________________________________________________

--- МОДУЛЬ ЗАГРУЗКИ ИЗОБРАЖЕНИЯ ПОЛЬЗОВАТЕЛЯ ---
________________________________________________

*/
window.userImageLoad = (function () {
  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */
  // ********* КОНСТАНТЫ *********
  var FIRST_FILE = 0;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // ********* DOM-элементы *********
  var MAIN = document.querySelector('main');
  var ERROR_WINDOW = document.querySelector('#error').content.querySelector('.error');

  var UPLOAD_SECTION = document.querySelector('.img-upload');
  var FILE_CHOOSER = UPLOAD_SECTION.querySelector('#upload-file');
  var IMAGE_PREVIEW = UPLOAD_SECTION.querySelector('.img-upload__preview img');


  // *** Переменные, содержащие элементы модального окна Ошибки ***
  var errorModal = ERROR_WINDOW.cloneNode(true);
  var errorModalInner = errorModal.querySelector('.error__inner');
  var errorModalTitle = errorModal.querySelector('.error__title');
  var errorCloseButton = errorModalInner.querySelector('.error__button');


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */
  // ************* Функции обработки событий закрытия модального окна *************
  var onErrorEscPress = function (evt) {
    if (evt.key === window.util.ESC) {
      evt.preventDefault();
      errorDialog.close();
    }
  };

  var onClickOutError = function (evt) {
    if (evt.target !== errorModalInner) {
      errorDialog.close();
    }
  };

  var onErrorModalClose = function (evt) {
    evt.preventDefault();
    errorDialog.close();
  };


  // *** Модальное окно ОШИБКИ ***
  var errorDialog = {
    open: function () {
      errorModalTitle.textContent = 'Неверный тип файла! Пожалуйста, выберите другой файл в формате GIF, JPG, JPEG или PNG.';
      errorModalTitle.style.lineHeight = '45px';
      MAIN.appendChild(errorModal);

      // === ДОБАВЛЕНИЕ обработчиков событий закрытия окна ===
      errorCloseButton.addEventListener('click', onErrorModalClose);
      document.addEventListener('click', onClickOutError);
      document.addEventListener('keydown', onErrorEscPress);
    },

    close: function () {
      MAIN.removeChild(errorModal);

      // === УДАЛЕНИЕ обработчиков событий закрытия окна ===
      errorCloseButton.removeEventListener('click', onErrorModalClose);
      document.removeEventListener('click', onClickOutError);
      document.removeEventListener('keydown', onErrorEscPress);
    }
  };


  // *** Функция для обработки события выбора файла ***
  var onChoosingFile = function () {
    var file = FILE_CHOOSER.files[FIRST_FILE]; // --- Первый элемент из массива файлов
    var fileName = file.name.toLowerCase(); // --- Имя выбранного файла

    // --- Флаг соответствия типа выбранного файла ---
    var matches = FILE_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });

    /*
      Условие: если тип выбранного файла совпадает
               с каким-либо элементов массива FILE_TYPES,
               то выполнится блок кода.
    */
    if (matches) {
      // --- Экземпляр объекта "FileReader" ---
      var reader = new FileReader();

      // --- Обработчик события завершения чтения файла ---
      reader.addEventListener('load', function () {
        IMAGE_PREVIEW.src = reader.result;
        window.imageEditingForm.open();
      });

      // --- Чтение выбранного файла ---
      reader.readAsDataURL(file);
    } else {
      errorDialog.open();
    }
  };


  // *** Обработчик события изменения состояния поля загрузки файла ***
  FILE_CHOOSER.addEventListener('change', onChoosingFile);

})();
