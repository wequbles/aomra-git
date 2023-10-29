"use strict";

// Задаем текст, который будет напечатан
const text = 'Coming soon...';

// Инициализируем переменную chr для отслеживания текущего символа текста
let chr = -1;

// Задаем задержку (в миллисекундах) между печатью каждого символа
const delay = 100;

// Функция для печати текста по одному символу
function printText() {
	// Увеличиваем значение переменной chr, чтобы перейти к следующему символу
	chr++;

	// Получаем текущий текст до текущего символа
	const currentText = text.substring(0, chr);
	
	// Получаем текущий символ, который будет напечатан
	const char = text.charAt(chr);

	// Если текущий символ не является "<", то добавляем его к тексту внутри элемента с id "text"
	if (char !== "<") {
		document.getElementById("text").innerHTML = currentText;
	} else {
		// Если текущий символ "<", значит, это может быть тег, и тогда
		// мы добавляем следующие 4 символа к тексту, чтобы вывести тег полностью
		const nextChars = text.substring(chr, chr + 4);
		document.getElementById("text").innerHTML = currentText + nextChars;
		chr += 3; // Увеличиваем chr на 3, чтобы пропустить тег
	}

	// Если мы не достигли конца текста, то вызываем функцию printText() снова через указанную задержку
	if (chr < text.length) {
		setTimeout(printText, delay);
	}
}

// Функция, которая возвращает строку с заданным количеством пробелов
function str(num) {
	return " ".repeat(num);
}

// Начинаем печать текста, вызывая функцию printText()
printText();
