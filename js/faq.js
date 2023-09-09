"use strict";

// Получение кнопок табов
const tabButtons = document.querySelectorAll('.tab_button');

// Получение контента табов
const tabContents = document.querySelectorAll('.tab_content');

// Активация первого таба при загрузке страницы
tabButtons[0].classList.add('tab_button_active');
tabContents[0].style.display = 'block';

// Добавление обработчика события для каждой кнопки таба
tabButtons.forEach(button => {
	button.addEventListener('click', () => {
		// Получение значения атрибута data-tab
		const tabId = button.getAttribute('data-tab');

		// Удаление класса 'active' для всех кнопок и контента табов
		tabButtons.forEach(btn => btn.classList.remove('tab_button_active'));
		tabContents.forEach(content => content.style.display = 'none');

		// Добавление класса 'active' для выбранной кнопки и отображение соответствующего контента таба
		button.classList.add('tab_button_active');
		document.getElementById(tabId).style.display = 'block';
	});
});