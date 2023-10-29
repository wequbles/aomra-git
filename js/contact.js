"use strict";

const phoneNumberBlock = document.getElementById('phone_number');

// Получаем номер телефона из атрибута data-phone-number
const phoneNumber = phoneNumberBlock.getAttribute('data-phone-number');

// Добавляем обработчик события при нажатии на элемент
phoneNumberBlock.addEventListener('click', function() {
	// Копируем номер телефона в буфер обмена
	navigator.clipboard.writeText(phoneNumber)
		.then(() => {
			alert('The phone number is copied ');
			// При необходимости вставьте здесь код для отображения сообщения об успешном копировании
		})
		.catch(error => {
			console.error('Error in copying a phone number ' + error);
		});

	// Если устройство мобильное, открываем приложение мобильного телефона
	if (isMobileDevice) {
		window.location.href = `tel:${phoneNumber}`;
	}
});