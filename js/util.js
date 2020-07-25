'use strict';

/*
__________________________

--- УТИЛИТАРНЫЙ МОДУЛЬ ---
__________________________

*/
window.util = (function () {

  return {
    // ********* КОНСТАНТЫ *********
    ESC: 'Escape', // --- Ключ для клавишы "Escape"

    ZERO_ELEMENT: 0, // --- Нулевой элемент
    DELETE_COUNT: 1, // --- Количество удаляемых элементов ( необходимо для метода ".splice()" )
    NUMBER_SYSTEM: 10, // --- Основа системы счисления


    // ********* ФУНКЦИИ *********
    // --- Рандомайзер значений ---
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * max);
    }
  };

})();
