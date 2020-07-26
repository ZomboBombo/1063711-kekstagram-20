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
  var main = document.querySelector('main');
  var errorWindow = document.querySelector('#error').content.querySelector('.error');

  var uploadSection = document.querySelector('.img-upload');
  var fileChooser = uploadSection.querySelector('#upload-file');
  var imagePreview = uploadSection.querySelector('.img-upload__preview img');


  // *** Переменные, содержащие элементы модального окна Ошибки ***
  var errorModal = errorWindow.cloneNode(true);
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
      main.appendChild(errorModal);

      // === ДОБАВЛЕНИЕ обработчиков событий закрытия окна ===
      errorCloseButton.addEventListener('click', onErrorModalClose);
      document.addEventListener('click', onClickOutError);
      document.addEventListener('keydown', onErrorEscPress);
    },

    close: function () {
      main.removeChild(errorModal);

      // === УДАЛЕНИЕ обработчиков событий закрытия окна ===
      errorCloseButton.removeEventListener('click', onErrorModalClose);
      document.removeEventListener('click', onClickOutError);
      document.removeEventListener('keydown', onErrorEscPress);
    }
  };


  // *** Функция для обработки события выбора файла ***
  var onChoosingFile = function () {
    var file = fileChooser.files[FIRST_FILE]; // --- Первый элемент из массива файлов
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
        imagePreview.src = reader.result;
        window.imageEditingForm.open();
      });

      // --- Чтение выбранного файла ---
      reader.readAsDataURL(file);
    } else {
      errorDialog.open();
      fileChooser.value = window.util.ATTRIBUTE_EMPTY_VALUE;
    }
  };


  // *** Обработчик события изменения состояния поля загрузки файла ***
  fileChooser.addEventListener('change', onChoosingFile);

})();
