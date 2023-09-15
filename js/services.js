"use strict";

document.addEventListener('DOMContentLoaded', function() {

/* БД */
	let products = [
		{
			id: 1,
			title: 'Массаж банками',
			description: 'Описание банок',
			option: [{id: 1, time: 30, price: 19.99 }]
		},
		{
			id: 2,
			title: 'Массаж палками',
			description: 'Описание палок',
			option: [
				{id: 1, time: 15, price: 19.99 },
				{id: 2, time: 30, price: 24.44 }
			]
		},
		{
			id: 3,
			title: 'Массаж руками',
			description: 'Описание рук',
			option: [
				{id: 1, time: 45, price: 19.99 },
				{id: 2, time: 60, price: 31.50 },
				{id: 3, time: 90, price: 49.99 }
			]
		}
	];

/* Корзина */
	let cart = {
		size: 0,
		totalPrice: 0,
		totalTime: 0
	};

/* Элементы */
	const productContainer = document.getElementById('product_container');
	const totalPriceElement = document.getElementById('total__price');
	const cartSizeElement = document.getElementById('cart__size');

/* Функция преобразования формата времени */
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
	}

/* Функция для генерации блока с товаром */
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

		product.option.forEach(function (option) {
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
			productCheckbox.type = 'button';
			productCheckbox.classList.add('option__selection');
			productCheckbox.classList.add('empty_btn');
			productCheckbox.value = 'Select';
			productCheckbox.name = product.id;
			productCheckbox.dataset.productId = product.id;
			productCheckbox.dataset.optionId = option.id;
			// Добавляем обработчик события для каждого чекбокса опции
			productCheckbox.addEventListener('click', handleOptionSelection);
			optionBlock.appendChild(productCheckbox);

			optionsContainer.appendChild(optionBlock);
		});
		productBlock.appendChild(optionsContainer);
		return productBlock;
	}

/* Функция для обновления блоков с товарами на странице */
	function updateProductBlocks(products) {
		// Очищаем контейнер перед добавлением новых товаров
		productContainer.innerHTML = '';

		// Генерация блоков с товарами и добавление на страницу
		products.forEach(function (product) {
			let productBlock = generateProductBlock(product);
			productContainer.appendChild(productBlock);
		});
	}
	updateProductBlocks(products);

/* Функция для обновления корзины */
	function updateCart() {
		// Обновление отображения корзины на странице
		cartSizeElement.textContent = cart.size + (cart.size === 1 ? ' услуга' : ' услуги');
		totalPriceElement.textContent = '£' + cart.totalPrice.toFixed(2);

		// Показывать корзину если количестов выбранных товаров больше 0
		const cartBlock = document.getElementById('cart');
		cartBlock.style.display = cart.size > 0 ? 'block' : 'none';
	}

/* Восстановление сохраненных данных при загрузке страницы */
	// Получаем все кнопки опций
	const optionButtons = document.querySelectorAll('.option__selection');

	// Получаем сохраненные опции из LocalStorage при загрузке страницы
	let savedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || [];

	// Пройдитесь по сохраненным опциям и установите соответствующие значения кнопок
	savedOptions.forEach(option => {
		const button = document.querySelector(`.option__selection[data-product-id="${option.productId}"][data-option-id="${option.optionId}"]`);
		if (button) {
			button.classList.add('selected');
		}
	});

/* Сохранение данных в LocalStorage */
	// Обработчик события для кнопок опций
	function handleOptionSelection(event) {
		const productId = event.target.getAttribute('data-product-id');
		const optionId = parseInt(event.target.getAttribute('data-option-id'));

		// Получаем сохраненные опции из LocalStorage
		let savedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || [];

		// Проверяем, выбрана ли кнопка опции
		const isOptionSelected = event.target.classList.contains('selected');

		// Если кнопка опции уже выбрана, удаляем данный товар из выбранных и убираем selected
		if (isOptionSelected) {
			savedOptions = savedOptions.filter(option => option.productId !== productId);
			document.querySelectorAll(`.option__selection[data-product-id="${productId}"]`).forEach(button => {
				button.classList.remove('selected');
			});
		} else if (!isOptionSelected) {
			// Удаляем все выбранные опции этого товара
			savedOptions = savedOptions.filter(option => option.productId !== productId);

			// Добавляем выбранную опцию в массив сохраненных опций
			savedOptions.push({ productId, optionId });

			// Устанавливаем класс 'selected' для выбранного элемента
			document.querySelectorAll(`.option__selection[data-product-id="${productId}"]`).forEach(button => {
				button.classList.remove('selected');
			});
			event.target.classList.add('selected');
		}

		// Сохраняем обновленные опции в LocalStorage
		localStorage.setItem('selectedOptions', JSON.stringify(savedOptions));

		cartCalculation(savedOptions);

		localstorageInspect();
	}

	function cartCalculation(savedOptions) {
	/* Вычисляем общую сумму цен выбранных опций totalPrice */
		// Обнуляем totalPrice перед пересчетом
		cart.totalPrice = 0;
		savedOptions.forEach(option => {
			const product = products.find(prod => prod.id === parseInt(option.productId));
			if (product) {
				const selectedOption = product.option.find(opt => opt.id === option.optionId);
				if (selectedOption) {
					cart.totalPrice += selectedOption.price;
				}
			}
		});

	/* Вычисляем общее время приема totalTime */
		// Обнуляем totalPrice перед пересчетом
		cart.totalTime = 0;
		savedOptions.forEach(option => {
			const product = products.find(prod => prod.id === parseInt(option.productId));
			if (product) {
				const selectedOption = product.option.find(opt => opt.id === option.optionId);
				if (selectedOption) {
					cart.totalTime += selectedOption.time;
				}
			}
		});

	/* Вычисляем размер корзины cart.size */
		cart.size = savedOptions.length;
		updateCart();
	}

/* Кнопка "Очистить корзину" */
	// Добавление обработчика событий для кнопки "Очистить корзину"
	const clearCartButton = document.getElementById('clear_cart_btn');
	clearCartButton.addEventListener('click', function() {
		// Очистить массив с выбранными товарами
		savedOptions.length = 0;

		// Сохранить обновленные опции в LocalStorage
		localStorage.setItem('selectedOptions', JSON.stringify(savedOptions));
		cartCalculation(savedOptions);
		document.querySelectorAll('.product__option .selected').forEach(button => {
			button.classList.remove('selected');
		});

		localstorageInspect();
	});

	// Получаем все данные из LocalStorage
	const localStorageData = { ...localStorage };
	// Выводим данные из LocalStorage в консоль
	cartCalculation(savedOptions);
	localstorageInspect();
	function localstorageInspect() {
		// Выводим данные из LocalStorage в консоль
		console.log(localStorage.getItem('selectedOptions'));
		console.log('Total Price:', cart.totalPrice.toFixed(2));
		console.log(cart);
	}
})