"use strict";

document.addEventListener('DOMContentLoaded', async function() {
	/*let products = await fetchProducts(); // Дожидаемся пока функция выполниться и вернет результат, прежде чем присвоить этот результат переменной products

	// Функция для получения данных о товарах с сервера
	async function fetchProducts() {
		try {
			const response = await fetch('/php/products.php'); // Отправляем запрос на сервер, чтобы получить данные о товарах
			const products = await response.json();
			console.log(products); // Выводим массив товаров в консоль
			return products; // Возвращаем массив товаров
		} catch (error) {
			console.error('Ошибка при получении данных о товарах:', error);
		}
	}*/

	let products = [
		{
			id: 1,
			title: 'Массаж банками',
			description: 'Описание банок',
			options: [{ time: 30, price: 19.99 }]
		},
		{
			id: 2,
			title: 'Массаж палками',
			description: 'Описание палок',
			options: [
				{ time: 15, price: 19.99 },
				{ time: 30, price: 24.44 }
			]
		},
		{
			id: 3,
			title: 'Массаж руками',
			description: 'Описание рук',
			options: [
				{ time: 45, price: 19.99 },
				{ time: 60, price: 31.50 },
				{ time: 90, price: 49.99 }
			]
		}
	];

	let cart = {
		size: 0,
		totalPrice: 0,
		totalTime: 0
	};

	let productContainer = document.getElementById('product_container');
	let totalPriceElement = document.getElementById('total__price');
	let cartSizeElement = document.getElementById('cart__size');

/* Функция для генерации блока с товаром */
	function getTimeFromMins(mins) {
		let hours = Math.trunc(mins/60);
		let minutes = mins % 60;
		if(minutes == 0) {
			return hours + 'h';
		} else if(hours == 0){
			return minutes + ' mins';
		} else{
			return hours + ' hr ' + minutes + ' mins';
		}
	};

	function generateProductBlock(product) {
		// product
		let productBlock = document.createElement('div');
		productBlock.classList.add('product');

		//product__title
		let titleElement = document.createElement('div');
		titleElement.classList.add('product__title');
		titleElement.textContent = product.title;
		productBlock.appendChild(titleElement);

		// product__description
		let descriptionElement = document.createElement('div');
		descriptionElement.classList.add('product__description');
		descriptionElement.textContent = product.description;
		productBlock.appendChild(descriptionElement);

		// product__options
		let optionsContainer = document.createElement('div');
		optionsContainer.classList.add('product__options');

		product.options.forEach(function (option) {
			// product__option
			let optionBlock = document.createElement('div');
			optionBlock.classList.add('product__option');

			// option__title
			let optionTitle = document.createElement('div');
			optionTitle.classList.add('option__title');
			optionTitle.textContent = product.title + ' (For ' + option.time + ' Minutes)';
			optionBlock.appendChild(optionTitle);

			// option__time
			let timeElement = document.createElement('div');
			timeElement.classList.add('option__time');
			timeElement.textContent = getTimeFromMins(option.time);
			optionBlock.appendChild(timeElement);

			// option__price
			let priceElement = document.createElement('div');
			priceElement.classList.add('option__price');
			priceElement.textContent = '£' + option.price.toFixed(2);
			optionBlock.appendChild(priceElement);

			// option__selection
			let productCheckbox = document.createElement('input');
			productCheckbox.type = 'checkbox';
			productCheckbox.classList.add('option__selection');
			productCheckbox.name = product.id;
			productCheckbox.dataset.productId = product.id;
			productCheckbox.dataset.optionTime = option.time;
			productCheckbox.dataset.optionPrice = option.price;
			optionBlock.appendChild(productCheckbox);

			optionsContainer.appendChild(optionBlock);
		});

		productBlock.appendChild(optionsContainer);
		return productBlock;
	};

/* Функция для обновления блоков с товарами на странице */
	function updateProductBlocks(products) {
		productContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых товаров

		// Генерация блоков с товарами и добавление на страницу
		products.forEach(function (product) {
			let productBlock = generateProductBlock(product);
			productContainer.appendChild(productBlock);
		});
	};
	updateProductBlocks(products);

/* Обратка выбора товара */
	productContainer.addEventListener('change', function (event) {
		let productCheckbox = event.target;
		if (productCheckbox.classList.contains('option__selection')) {
			let productId = Number(productCheckbox.dataset.productId);
			let product = products.find(function (product) {
				return product.id === productId;
			});

			let optionTime = Number(productCheckbox.dataset.optionTime);
			let optionPrice = Number(productCheckbox.dataset.optionPrice);

			if (productCheckbox.checked) {
				// Добавляем выбранную опцию к корзине
				cart.size += 1;
				cart.totalPrice += optionPrice;
				cart.totalTime += optionTime;
			} else {
				// Убираем выбранную опцию из корзины
				cart.size -= 1;
				cart.totalPrice -= optionPrice;
				cart.totalTime -= optionTime;
			}

			// Перебираем все опции этой услуги и обновляем их состояние
			if (product.options) {
				product.options.forEach(function (option) {
					let optionCheckbox = document.querySelector(
						`.option__selection[data-product-id="${productId}"][data-option-time="${option.time}"]`
					);

					// Если опция не совпадает с текущей выбранной, обновляем состояние
					if (option.time !== optionTime) {
						optionCheckbox.checked = false;
						optionCheckbox.disabled = productCheckbox.checked;
					}
				});
			}

			// Обновляем состояние текущей выбранной опции
			productCheckbox.disabled = false;

			// Если totalPrice отрицательное, то становится равно нулю
			cart.totalPrice = Math.max(cart.totalPrice, 0);

			updateCart();
		}
	});

/* Восстановление сохраненных данных при загрузке страницы */

/* Функция для обновления корзины */
	function updateCart() {
		// Обновление отображения корзины на странице
		cartSizeElement.textContent = cart.size + (cart.size === 1 ? ' услуга' : ' услуги');
		totalPriceElement.textContent = '£' + cart.totalPrice.toFixed(2);
		console.log(cart.totalTime + ' мин');

		// Скрываем блок cart, если количество выбранных услуг равно нулю
		let cartBlock = document.getElementById('cart');
		cartBlock.style.display = cart.size === 0 ? 'none' : 'block';
	};

/* Функция для открытия страницы календаря с выбранными услугами */
	function openCalendarWithSelectedServices() {
		// Получение выбранных услуг и их опций
		const selectedServices = [];
		const checkboxes = document.querySelectorAll('.option__selection');
		checkboxes.forEach(function (checkbox) {
			if (checkbox.checked) {
				const productId = Number(checkbox.dataset.productId);
				const product = products.find(function (product) {
					return product.id === productId;
				});
			const selectedOptions = product.options.filter(option => {
				const optionCheckbox = document.querySelector(`.option__selection[data-product-id="${product.id}"][data-option-time="${option.time}"]`);
				return optionCheckbox.checked;
			});
				if (selectedOptions.length > 0) {
					selectedServices.push({
						id: product.id,
						title: product.title,
						description: product.description,
						options: selectedOptions
					});
				}
			}
		});

		// Создание URL с параметрами запроса, содержащими данные выбранных услуг и опций
		const urlParams = new URLSearchParams();
		urlParams.append('services', JSON.stringify(selectedServices));

		// Добавление параметра 'totalPrice' с значением cart.totalPrice
		urlParams.append('totalPrice', cart.totalPrice.toFixed(2));

		// Добавление параметра 'totalTime' с значением cart.totalTime
		urlParams.append('totalTime', cart.totalTime);

		// Перенаправление пользователя на страницу calendar.html с передачей данных выбранных услуг и опций
		window.location.href = 'calendar.html?' + urlParams.toString();
	};

/* Добавление обработчика событий для кнопки "Выбрать время в корзине" */
	const calendarBtn = document.getElementById('calendar_btn');
	calendarBtn.addEventListener('click', openCalendarWithSelectedServices);

/* Функция для очистки корзины */
	// Добавление обработчика событий для кнопки "Очистить корзину"
	const clearCartBtn = document.getElementById('clear_cart_btn');
	clearCartBtn.addEventListener('click', clearCart);

	function clearCart() {
		const checkboxes = document.querySelectorAll('.option__selection:checked');
		checkboxes.forEach(function (checkbox) {
			const productId = Number(checkbox.dataset.productId);
			const product = products.find(function (product) {
				return product.id === productId;
			});

			const selectedOptions = product.options.filter(option => {
				const optionCheckbox = document.querySelector(`.option__selection[data-product-id="${productId}"][data-option-time="${option.time}"]`);
				return optionCheckbox.checked;
			});

			if (selectedOptions.length > 0) {
				selectedOptions.forEach(function (option) {
					const optionCheckbox = document.querySelector(`.option__selection[data-product-id="${productId}"][data-option-time="${option.time}"]`);
					optionCheckbox.checked = false;
					optionCheckbox.disabled = false;

					cart.size -= 1;
					cart.totalPrice -= option.price;
					cart.totalTime -= option.time;
				});
			}
		});

		// Сбрасываем состояние disabled для всех чекбоксов опций
		const optionCheckboxes = document.querySelectorAll('.option__selection');
		optionCheckboxes.forEach(function (optionCheckbox) {
			optionCheckbox.disabled = false;
		});

		// Удаляем данные из localStorage
		localStorage.removeItem('userData');

		// Обновляем отображение корзины
		updateCart();
	};

});