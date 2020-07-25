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
  var UPLOAD_SECTION = document.querySelector('.img-upload');
  var FILE_CHOOSER = UPLOAD_SECTION.querySelector('#upload-file');
  var IMAGE_PREVIEW = UPLOAD_SECTION.querySelector('.img-upload__preview img');


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */
  // *** Обработчик события изменения состояния поля загрузки файла ***
  FILE_CHOOSER.addEventListener('change', function () {
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
      });

      // --- Чтение выбранного файла ---
      reader.readAsDataURL(file);
    }
  });

})();
