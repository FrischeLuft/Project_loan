import Slider from './slider';

export default class MiniSlider extends Slider {
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
		this.slides = Array.from(this.container.children).filter(slide =>
			!slide.classList.contains('slick-prev') &&
			!slide.classList.contains('slick-next')
		);
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
	};

	init() {
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
	}

}



