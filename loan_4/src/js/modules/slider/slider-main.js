import Slider from './slider';

export default class MainSlider extends Slider {
	constructor(page, btns) {
		super(page, btns);
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
		} catch (e) { }


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
		} catch (e) { }


		// 1) Уст. обработчик события на каждую кнопку ('btns');
		// 2) Кнопка нажимается => вызывается метод plusSlides(1) => переключает слайд вперед;
		this.btns.forEach(item => {
			item.addEventListener('click', () => {
				this.plusSlides(1);
			});

			//Уст. обр. события. на эл. расположенный перед кнопкой;
			// 1) Сбрасывает индекс слайда на 1 и показыввает первый слайд;
			item.parentNode.previousElementSibling.addEventListener('click', (e) => {
				e.preventDefault();
				this.slideIndex = 1;
				this.showSlides(this.slideIndex);
			});
		});

		//Вызывается метод showSlides => чтобы отобразить текущий слайд при инициализации;
		this.showSlides(this.slideIndex);
	}
}