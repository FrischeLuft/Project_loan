/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/difference.js":
/*!**************************************!*\
  !*** ./src/js/modules/difference.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Difference)
/* harmony export */ });
class Difference {
  constructor(oldOfficer, newOfficer, items) {
    try {
      this.oldOfficer = document.querySelector(oldOfficer);
      this.newOfficer = document.querySelector(newOfficer);
      this.oldItems = this.oldOfficer.querySelectorAll(items);
      this.newItems = this.newOfficer.querySelectorAll(items);
      this.oldCounter = 0;
      this.newCounter = 0;
    } catch (e) {}
  }
  bindTriggers(container, items, counter) {
    container.querySelector('.plus').addEventListener('click', () => {
      if (counter !== items.length - 2) {
        items[counter].style.display = 'flex';
        counter++;
      } else {
        items[counter].style.display = 'flex';
        items[items.length - 1].remove();
      }
    });
  }
  hideItems(items) {
    items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = 'none';
      }
    });
  }
  init() {
    try {
      this.hideItems(this.oldItems);
      this.hideItems(this.newItems);
      this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
      this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
    } catch (e) {}
  }
}

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
class Form {
  constructor(forms) {
    // Инициализируем класс с формами, которые соответствуют селектору `forms`
    this.forms = document.querySelectorAll(forms);
    // Инициализируем массив всех элементов input на странице
    this.inputs = document.querySelectorAll('input');
    // Сообщения, которые будут отображаться пользователю
    this.message = {
      loading: 'Loading...',
      success: 'Success',
      failure: 'Error'
    };
    // Путь для отправки данных формы
    this.path = 'assets/question.php';
  }

  // Метод для очистки всех полей ввода
  clearInputs() {
    this.inputs.forEach(item => {
      item.value = ''; // Устанавливаем пустое значение для каждого input
    });
  }

  // Метод для проверки корректности ввода электронной почты
  checkMailInputs() {
    // Выбираем все input элементы с типом "email"
    const mailInputs = document.querySelectorAll('[type="email"]');

    // Добавляем обработчик события keypress для каждого email input
    mailInputs.forEach(input => {
      input.addEventListener('keypress', function (e) {
        // Разрешаем только буквы латинского алфавита, цифры, пробелы, @ и .
        if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
          e.preventDefault(); // Отклоняем любые другие символы
        }
      });
    });
  }

  // Метод для установки маски ввода телефонного номера
  initMask() {
    // Функция для установки позиции курсора в заданную позицию
    let setCursorPosition = (pos, elem) => {
      elem.focus(); // Устанавливаем фокус на элемент

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos); // Современные браузеры: установка позиции курсора
      } else if (elem.createTextRange) {
        let range = elem.createTextRange(); // Старые браузеры

        range.collapse(true); // Сжимаем диапазон до одной позиции
        range.moveEnd('character', pos); // Перемещаем конец диапазона на указанное количество символов
        range.moveStart('character', pos); // Перемещаем начало диапазона на указанное количество символов
        range.select(); // Выбираем диапазон
      }
    };

    // Функция для создания маски ввода
    function createMask(event) {
      let matrix = '+1 (___) ___-____',
        // Шаблон маски для телефона
        i = 0,
        // Индекс текущего символа маски
        def = matrix.replace(/\D/g, ''),
        // Удаляем все нецифровые символы из маски (получаем '1')
        val = this.value.replace(/\D/g, ''); // Удаляем все нецифровые символы из введенного значения

      // Если длина дефолтной маски больше или равна длине введенного значения, заполняем маску
      if (def.length >= val.length) {
        val = def;
      }

      // Обновляем значение элемента, заменяя его на маску
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });

      // Если событие blur (потеря фокуса)
      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = ''; // Если в поле осталось только префикс, очищаем его
        }
      } else {
        setCursorPosition(this.value.length, this); // Устанавливаем курсор на последнюю позицию
      }
    }

    // Выбираем все input элементы с именем "phone"
    let inputs = document.querySelectorAll('[name="phone"]');

    // Добавляем обработчики событий для создания маски
    inputs.forEach(input => {
      input.addEventListener('input', createMask); // При каждом изменении значения
      input.addEventListener('focus', createMask); // При фокусировке на поле
      input.addEventListener('blur', createMask); // При потере фокуса
    });
  }

  // Выполняет асинхронный POST-запрос к указанному URL и возвращает текстовый ответ сервера
  async postData(url, data) {
    // Ожидаем завершения выполнения fetch, который выполняет запрос к серверу
    let res = await fetch(url, {
      method: "POST",
      // Метод HTTP-запроса. В данном случае это POST-запрос, который отправляет данные на сервер
      body: data // Тело запроса, содержащие данные, которые мы отправляем на сервер. Это может быть FormData, JSON или другой формат
    });

    // Ожидаем завершения получения текста из ответа и возвращаем его
    return await res.text(); // Преобразуем тело ответа в текст и возвращаем его
  }
  init() {
    // Метод инициализации, вызывающий другие методы и настраивающий обработку формы

    // Проверяет корректность ввода электронной почты
    this.checkMailInputs();

    // Инициализирует маску для ввода телефонного номера
    this.initMask();

    // Для каждой формы, переданной в конструкторе
    this.forms.forEach(item => {
      // Добавляем обработчик события submit на каждую форму
      item.addEventListener('submit', e => {
        e.preventDefault(); // Отменяем стандартное поведение формы (перезагрузку страницы)

        // Создаем элемент для отображения статуса отправки формы
        let statusMessage = document.createElement('div');
        statusMessage.style.cssText = `
					margin-top: 15px; 
					font-size: 18px; 
					color: grey; 
				`;
        // Добавляем элемент для статуса в родительский элемент формы
        item.parentNode.appendChild(statusMessage);

        // Устанавливаем начальный текст сообщения о загрузке
        statusMessage.textContent = this.message.loading;

        // Создаем объект FormData из формы, чтобы собрать данные для отправки
        const formData = new FormData(item);

        // Отправляем данные на сервер с помощью метода postData
        this.postData(this.path, formData).then(res => {
          // Если запрос выполнен успешно
          console.log(res); // Выводим ответ сервера в консоль
          statusMessage.textContent = this.message.success; // Отображаем сообщение об успешной отправке
        }).catch(() => {
          // Если произошла ошибка при выполнении запроса
          statusMessage.textContent = this.message.failure; // Отображаем сообщение об ошибке
        }).finally(() => {
          // Этот блок выполнится в любом случае, независимо от результата запроса
          this.clearInputs(); // Очищаем все поля ввода в форме
          setTimeout(() => {
            statusMessage.remove(); // Удаляем сообщение о статусе после 6 секунд
          }, 6000);
        });
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/playVideo.js":
/*!*************************************!*\
  !*** ./src/js/modules/playVideo.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VideoPlayer)
/* harmony export */ });
class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }
  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blockedElem = btn.closest('.module__video-item').nextElementSibling;
        if (i % 2 == 0) {
          blockedElem.setAttribute('data-disabled', 'true');
        }
      } catch (e) {}
      btn.addEventListener('click', () => {
        if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
          this.activeBtn = btn;
          if (document.querySelector('iframe#frame')) {
            this.overlay.style.display = 'flex';
            if (this.path !== btn.getAttribute('data-url')) {
              this.path = btn.getAttribute('data-url');
              this.player.loadVideoById({
                videoId: this.path
              });
            }
          } else {
            this.path = btn.getAttribute('data-url');
            this.createPlayer(this.path);
          }
        }
      });
    });
  }
  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }
  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`,
      events: {
        'onStateChange': this.onPlayerStateChange
      }
    });
    this.overlay.style.display = 'flex';
  }
  onPlayerStateChange(state) {
    try {
      const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
      const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
      if (state.data === 0) {
        if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
          blockedElem.querySelector('.play__circle').classList.remove('closed');
          blockedElem.querySelector('svg').remove();
          blockedElem.querySelector('.play__circle').appendChild(playBtn);
          blockedElem.querySelector('.play__text').textContent = 'play video';
          blockedElem.querySelector('.play__text').classList.remove('attention');
          blockedElem.style.opacity = 1;
          blockedElem.style.filter = 'none';
          blockedElem.setAttribute('data-disabled', 'false');
        }
      }
    } catch (e) {}
  }
  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      this.bindTriggers();
      this.bindCloseBtn();
    }
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-main.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(btns) {
    super(btns);
  }
  showSlides(n) {
    //Проверка, не превышает ли текущий индекс количество слайдов. 
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    //Проверка установки индекса на последний слайд. 
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    //Pop-up (TЗ 8). 
    try {
      this.hanson.style.opacity = '0';
      if (n === 3) {
        this.hanson.classList.add('animated');
        setTimeout(() => {
          this.hanson.style.opacity = '1';
          this.hanson.classList.add('slideInUp');
        }, 3000);
      } else {
        this.hanson.classList.remove('slideInUp');
      }
    } catch (e) {}

    //Все слайды скрываются. 
    this.slides.forEach(slide => {
      slide.style.display = 'none';
    });

    //Показывается слайд соответствующий текущему индексу. 
    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  //Вызывает showSlides => передает ему новый индекс слайда при нажатии кнопки. 
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  bindTriggers() {
    // 1) Уст. обработчик события на каждую кнопку ('btns');
    // 2) Кнопка нажимается => вызывается метод plusSlides(1) => переключает слайд вперед;
    this.btns.forEach(item => {
      item.addEventListener('click', () => {
        this.plusSlides(1);
      });

      //Уст. обр. события. на эл. расположенный перед кнопкой;
      // 1) Сбрасывает индекс слайда на 1 и показыввает первый слайд;
      item.parentNode.previousElementSibling.addEventListener('click', e => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    //Обработка стрелок для работы с модулем:
    document.querySelectorAll('.prevmodule').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(-1);
      });
    });

    //Обработка стрелок для работы с модулем:
    document.querySelectorAll('.nextmodule').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(1);
      });
    });
  }

  //Инициализация слайдера. 
  render() {
    if (this.container) {
      //Pop-up (TЗ 8). 
      try {
        this.hanson = document.querySelector('.hanson');
      } catch (e) {}

      //Вызывается метод showSlides => чтобы отобразить текущий слайд при инициализации;
      this.showSlides(this.slideIndex);

      //Подвязка нового метода
      this.bindTriggers();
    }
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-mini.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-mini.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(container, next, prev, activeClass, animate) {
    super(container, next, prev, animate, activeClass);
  }
  decorizeSlides() {
    this.slides.forEach(slide => {
      if (slide.classList.contains('slick-prev') || slide.classList.contains('slick-next')) {
        return;
      }
      if (this.activeClass) {
        slide.classList.remove(this.activeClass);
      }
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });
    if (this.activeClass && !this.slides[0].classList.contains('slick-prev') && !this.slides[0].classList.contains('slick-next')) {
      this.slides[0].classList.add(this.activeClass);
    }
    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }
  updateSlides() {
    this.slides = Array.from(this.container.children).filter(slide => !slide.classList.contains('slick-prev') && !slide.classList.contains('slick-next'));
  }
  bindTriggers() {
    this.next.addEventListener('click', () => this.nextSlide());
    this.prev.addEventListener('click', () => {
      let active = this.slides[this.slides.length - 1];
      this.container.insertBefore(active, this.slides[0]);
      this.updateSlides();
      this.decorizeSlides();
    });
  }
  nextSlide() {
    this.container.appendChild(this.slides[0]);
    this.updateSlides();
    this.decorizeSlides();
  }
  init() {
    try {
      this.container.style.cssText = `
			display: flex;
			flex-wrap: wrap;
			overflow: hidden;
			align-items: flex-start;
			`;
      this.bindTriggers();
      this.decorizeSlides();
      if (this.autoplay) {
        setInterval(() => this.nextSlide(), 5000);
      }
    } catch (e) {}
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor({
    container = null,
    btns = null,
    next = null,
    prev = null,
    activeClass = '',
    animate,
    autoplay
  } = {}) {
    this.container = document.querySelector(container);
    try {
      this.slides = Array.from(this.container.children);
    } catch (e) {}
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.slideIndex = 1;
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider/slider-main */ "./src/js/modules/slider/slider-main.js");
/* harmony import */ var _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/playVideo */ "./src/js/modules/playVideo.js");
/* harmony import */ var _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider/slider-mini */ "./src/js/modules/slider/slider-mini.js");
/* harmony import */ var _modules_difference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/difference */ "./src/js/modules/difference.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");





window.addEventListener('DOMContentLoaded', () => {
  const slider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    btns: '.next',
    container: '.page'
  });
  slider.render();
  const modulePageSlider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.moduleapp',
    btns: '.next'
  });
  modulePageSlider.render();
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__["default"]('.showup .play', '.overlay').init();
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__["default"]('.module__video-item .play', '.overlay').init();
  const showUpSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active',
    animate: true,
    autoplay: false
  });
  showUpSlider.init();
  const modulesSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    animate: true,
    autoplay: true
  });
  modulesSlider.init();
  const feedSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active'
  });
  feedSlider.init();
  new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"]('.officerold', '.officernew', '.officer__card-item').init();
  new _modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"]('form').init();
});
/******/ })()
;
//# sourceMappingURL=script.js.map