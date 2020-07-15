'use strict';

/*
________________________________

--- МОДУЛЬ РАБОТЫ С СЕРВЕРОМ ---
________________________________

*/
window.backend = (function () {
  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */

  // ********* КОНСТАНТЫ *********
  var STATUS_OK = 200; // --- Статус "ОК"
  var STATUS_BAD = 400; // --- Статус "Неверный запрос"
  var STATUS_UNAUTHORIZED = 401; // --- Статус "Неавторизованный пользователь"
  var STATUS_NOT_FOUND = 404; // --- Статус "Сервер не найден"

  var TIMEOUT_IN_MS = 10000; // --- Ограничение времени выполнения запроса

  var URL_FOR_GET = 'https://javascript.pages.academy/kekstagram/data'; // --- Адрес для получения данных с сервера


  // --- Функция обработки статуса запроса и предупреждения о возможных ошибках ---
  var requestStatus = function (request, success, err, url) {
    var errorMessage;

    switch (request.status) {
      case STATUS_OK:
        success(request.response);
        break;

      case STATUS_BAD:
        errorMessage = 'Invalid request to server! Please do not repeat the request and make sure it is correct.';
        break;
      case STATUS_UNAUTHORIZED:
        errorMessage = 'Unauthorized user! Please authorize and repeat the request.';
        break;
      case STATUS_NOT_FOUND:
        errorMessage = 'Server not found at: ' + url;
        break;

      default:
        errorMessage = 'Response status: ' + request.status + ' ' + request.statusText;
    }

    /*
      Если "errorMessage" содержит значение,
      то функция "вернёт" ошибку.
    */
    if (errorMessage) {
      err(errorMessage);
    }
  };


  // --- Пустой массив для хранения элементов из объекта данных с сервера ---
  var xhrResponseArray = [];


  return {
    /*
    ------------------------------------------------------
    --- Функция обработки запроса серверу и его ответа ---
    ------------------------------------------------------
    */
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest(); // --- Специальный объект XHR для "общения" с сервером
      xhr.responseType = 'json'; // --- Указание браузеру, в каком формате представить полученные с сервера данные

      // *** ОБРАБОТКА СОБЫТИЙ ***
      // --- Обработчик события полуения ответа от сервера ---
      xhr.addEventListener('load', function () {
        requestStatus(xhr, onLoad, onError, URL_FOR_GET);


        // --- Заполнение массива элементами из объекта данных с сервера ---
        for (var i = 0; i < xhr.response.length; i++) {
          xhrResponseArray[i] = xhr.response[i];
        }
      });


      // --- Обработчик ошибки при неудавшемся соединении с сервером ---
      xhr.addEventListener('error', function () {
        onError('Connection error!');
      });


      // --- Обработчик ошибки, когда запрос не успел выполниться ---
      xhr.addEventListener('timeout', function () {
        onError('Request timed out! The request was not completed within ' + xhr.timeout + ' ms.');
      });


      // --- Установленное время для выполнения запроса ---
      xhr.timeout = TIMEOUT_IN_MS;


      // *** ВЗАИМОДЕЙСТВИЕ С СЕРВЕРОМ ***
      xhr.open('GET', URL_FOR_GET); // --- Открытие запорса к серверу
      xhr.send(); // --- Отправка запроса
    },


    /*
    -------------------------------------------
    --- Массив данных, полученных с сервера ---
    -------------------------------------------
    */
    dataArray: xhrResponseArray
  };

})();
