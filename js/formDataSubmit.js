'use strict';

/*
____________________________________

--- МОДУЛЬ ОТПРАВКИ ДАННЫХ ФОРМЫ ---
____________________________________

*/
window.formDataSubmit = (function () {
  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */
  // ********* DOM-элементы *********
  var MAIN = document.querySelector('main');
  var SUCCESS_WINDOW = document.querySelector('#success').content.querySelector('.success');
  var ERROR_WINDOW = document.querySelector('#error').content.querySelector('.error');


  // *** Переменные, содержащие элементы модальных окон ***
  var successModal = SUCCESS_WINDOW.cloneNode(true);
  var successModalInner = successModal.querySelector('.success__inner');
  var successCloseButton = successModalInner.querySelector('.success__button');

  var errorModal = ERROR_WINDOW.cloneNode(true);
  var errorModalInner = errorModal.querySelector('.error__inner');
  var errorCloseButton = errorModalInner.querySelector('.error__button');


  /*
  ----------------------------------------------------------------------------------
  --------------------------------- ОСНОВНАЯ ЛОГИКА --------------------------------
  ----------------------------------------------------------------------------------
  */
  // *** Справочники методов работы с модальными окнами ***
  var successDialog = {
    open: function () {
      window.imageEditingForm.close();
      MAIN.appendChild(successModal);

      // === ДОБАВЛЕНИЕ обработчиков событий закрытия окна ===
      successCloseButton.addEventListener('click', onSuccessModalClose);
      document.addEventListener('click', onClickOutSuccess);
      document.addEventListener('keydown', onSuccessEscPress);
    },

    close: function () {
      MAIN.removeChild(successModal);

      // === УДАЛЕНИЕ обработчиков событий закрытия окна ===
      successCloseButton.removeEventListener('click', onSuccessModalClose);
      document.removeEventListener('click', onClickOutSuccess);
      document.removeEventListener('keydown', onSuccessEscPress);
    },
  };

  var errorDialog = {
    open: function () {
      window.imageEditingForm.close();
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


  // *** Функции обработки событий закрытия модальных окон с помощью клавиши "Escape" ***
  var onSuccessEscPress = function (evt) {
    if (evt.key === window.util.ESC) {
      evt.preventDefault();
      successDialog.close();
    }
  };

  var onErrorEscPress = function (evt) {
    if (evt.key === window.util.ESC) {
      evt.preventDefault();
      errorDialog.close();
    }
  };


  // *** Функции обработки событий закрытия модальных окон при клике на произвольную оласть экрана ***
  var onClickOutSuccess = function (evt) {
    if (evt.target !== successModalInner) {
      successDialog.close();
    }
  };

  var onClickOutError = function (evt) {
    if (evt.target !== errorModalInner) {
      errorDialog.close();
    }
  };


  // *** Функции обработки событий закрытия модальных окон по клику на кнопку закрытия ***
  var onSuccessModalClose = function (evt) {
    evt.preventDefault();
    successDialog.close();
  };

  var onErrorModalClose = function (evt) {
    evt.preventDefault();
    errorDialog.close();
  };


  // *** Открытие модальных окон ***
  var openSuccessWindow = function () {
    successDialog.open();
  };

  var openErrorWindow = function () {
    errorDialog.open();
  };


  return {
    success: openSuccessWindow,
    error: openErrorWindow
  };

})();
