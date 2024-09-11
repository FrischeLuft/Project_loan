export default class Form {
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
			let matrix = '+1 (___) ___-____', // Шаблон маски для телефона
				i = 0, // Индекс текущего символа маски
				def = matrix.replace(/\D/g, ''), // Удаляем все нецифровые символы из маски (получаем '1')
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
			method: "POST", // Метод HTTP-запроса. В данном случае это POST-запрос, который отправляет данные на сервер
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
			item.addEventListener('submit', (e) => {
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
				this.postData(this.path, formData)
					.then(res => {
						// Если запрос выполнен успешно
						console.log(res); // Выводим ответ сервера в консоль
						statusMessage.textContent = this.message.success; // Отображаем сообщение об успешной отправке
					})
					.catch(() => {
						// Если произошла ошибка при выполнении запроса
						statusMessage.textContent = this.message.failure; // Отображаем сообщение об ошибке
					})
					.finally(() => {
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