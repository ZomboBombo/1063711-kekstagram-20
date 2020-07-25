'use strict';

/*
____________________________________

--- МОДУЛЬ УСТРАНЕНИЯ «ДРЕБЕЗГА» ---
____________________________________

*/
window.debounce = (function () {
  /*
  ----------------------------------------------------------------------------------
  ---------------------- ВСПОМОГАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ И ФУНКЦИИ ----------------------
  ----------------------------------------------------------------------------------
  */
  var DEBOUNCE_INTERVAL = 500; // --- Частота обновления списка фотографий, подходящих под фильтры ( 500 мс )
  var NULL_POINTER = null; // --- Значение «null»


  /*
    Модуль возвращает функцию, которая, в свою очередь,
    возвращает другую функцию, контролирующую своё выполнение самостоятельно.

    Это сделано для предотвращения колизий, когда функция будет отменять действие
    чужой функции вместо своего.
  */
  return function (cb) {
    // --- Значение задержки выполнения функции по умолчанию ---
    var lastTimeout = NULL_POINTER;

    return function () {
      var parameters = arguments;

      /*
        Если значение "lastTimeout" не «null»,
        тогда отменить последнюю задержку.
      */
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      // --- Присвоить "задержке" новое значение ---
      lastTimeout = window.setTimeout(function () {
        cb.apply(NULL_POINTER, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

})();
