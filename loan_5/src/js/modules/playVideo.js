export default class VideoPlayer {
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