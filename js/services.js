"use strict";

/* Элементы */
const productContainer = document.getElementById('productContainer');
const totalPriceElement = document.getElementById('totalPrice');
const cartSizeElement = document.getElementById('cartSize');

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
		productCheckbox.addEventListener('click', handleOptionSelection); // Добавляем обработчик события для каждого чекбокса опции
		optionBlock.appendChild(productCheckbox);

		optionsContainer.appendChild(optionBlock);
	});

	productBlock.appendChild(optionsContainer);
	return productBlock;
}

/* Сохранение данных в LocalStorage */
function handleOptionSelection(event) {
	const productId = parseInt(event.target.getAttribute('data-product-id'));
	const optionId = parseInt(event.target.getAttribute('data-option-id'));

	let savedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || [];

	const isOptionSelected = event.target.classList.contains('selected'); // Проверяем, выбрана ли кнопка опции

	if (isOptionSelected) { // Если кнопка опции уже выбрана, удаляем данный товар из выбранных и убираем selected
		savedOptions = savedOptions.filter(option => option.productId !== productId);
		document.querySelectorAll(`.option__selection[data-product-id="${productId}"]`).forEach(button => {
			button.classList.remove('selected');
		});
	} else if (!isOptionSelected) {
		savedOptions = savedOptions.filter(option => option.productId !== productId); // Удаляем все выбранные опции этого товара

		savedOptions.push({ productId, optionId }); // Добавляем выбранную опцию в массив сохраненных опций

		document.querySelectorAll(`.option__selection[data-product-id="${productId}"]`).forEach(button => { // Устанавливаем класс 'selected' для выбранного элемента
			button.classList.remove('selected');
		});
		event.target.classList.add('selected');
	}

	localStorage.setItem('selectedOptions', JSON.stringify(savedOptions)); // Сохраняем обновленные опции в LocalStorage

	cartCalculation(savedOptions);

	localstorageInspect();
}

/* Функция для обновления блоков с товарами на странице */
function updateProductBlocks(products) {
	productContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых товаров

	products.forEach(function (product) { // Генерация блоков с товарами и добавление на страницу
		let productBlock = generateProductBlock(product);
		productContainer.appendChild(productBlock);
	});
}
updateProductBlocks(products);

/* Функция для обновления корзины */
function updateCart() {
	cartSizeElement.textContent = cart.size + (cart.size === 1 ? ' услуга' : ' услуги');
	totalPriceElement.textContent = '£' + cart.totalPrice.toFixed(2);

	const cartBlock = document.getElementById('cart'); 
	cartBlock.style.display = cart.size > 0 ? 'block' : 'none'; // Показывать корзину если количестов выбранных товаров больше 0
}

/* Восстановление сохраненных данных при загрузке страницы */
const optionButtons = document.querySelectorAll('.option__selection');

savedOptions.forEach(option => { // Проходимся по сохраненным опциям и устанавливаем соответствующие значения кнопок
	const button = document.querySelector(`.option__selection[data-product-id="${option.productId}"][data-option-id="${option.optionId}"]`);
	if (button) {
		button.classList.add('selected');
	}
});

/* Кнопка "Очистить корзину" */
const clearCartButton = document.getElementById('clearCart');
clearCartButton.addEventListener('click', function() {
	savedOptions.length = 0; // Очистить массив с выбранными товарами

	localStorage.setItem('selectedOptions', JSON.stringify(savedOptions)); // Сохранить обновленные опции в LocalStorage
	cartCalculation(savedOptions);
	updateCart();
	document.querySelectorAll('.product__option .selected').forEach(button => {
		button.classList.remove('selected');
	});

	localstorageInspect();
});

updateCart();