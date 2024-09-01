/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  }
  //метод предназначен для привязки обработчиков событий 'click' ко всем кнопкам, которые запускают видео
  bindtriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (document.querySelector('iframe#frame')) {
          this.overlay.style.display = 'flex';
        } else {
          const path = btn.getAttribute('data-url');
          this.createPlayer(path);
        }
      });
    });
  }

  //скрывает overlay и останавливает воспроизведение видео
  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }

  //метод создает новый YouTube плеер и встраивает его в элемент c ID 'frame'
  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`
    });
    this.overlay.style.display = 'flex';
  }

  //инициализация
  init() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.bindtriggers();
    this.bindCloseBtn();
  }
}

// 1) Конструктор класса:
// this.btns = это все кнопки и элементы, которые будут запускать видео;
// this.overlay = будет использваться для показа модального окна с видео;
// this.close = элементы, которые будут использваться для закрытия модального окна;

//2)для замены видео меняем: номер из URL -> вставляем в data-url:
// (fPO76Jlnz6c)from: https://www.youtube.com/watch?v=fPO76Jlnz6c;
//пример:

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor(page, btns) {
    this.page = document.querySelector(page);
    this.slides = Array.from(this.page.children);
    this.btns = document.querySelectorAll(btns);
    this.slideIndex = 1;
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

  //Инициализация слайдера. 
  render() {
    //Pop-up (TЗ 8). 
    try {
      this.hanson = document.querySelector('.hanson');
    } catch (e) {}

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

    //Вызывается метод showSlides => чтобы отобразить текущий слайд при инициализации;
    this.showSlides(this.slideIndex);
  }
}

//Readme для конструктора:
// 1) доступ к стр. => где находятся все слайды;
// 2) слайды сохр. в массивно подобный объект;
// 3) btns => кнопка для упр. слайдами;
// 4) кнопка слайд индекс => отслеживает текущий активный слайд => изн. установлен на 1;

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
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/playVideo */ "./src/js/modules/playVideo.js");


window.addEventListener('DOMContentLoaded', () => {
  const slider = new _modules_slider__WEBPACK_IMPORTED_MODULE_0__["default"]('.page', '.next');
  slider.render();
  const player = new _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__["default"]('.showup .play', '.overlay');
  player.init();
});
/******/ })()
;
//# sourceMappingURL=script.js.map