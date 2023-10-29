"use strict";

const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); // Определяем платформу устройства

if (isMobileDevice) { // Для мобильных устройств
	document.body.classList.add('_touch');

	/* Выпадающий список открытие|закрытие */
	const menuArrows = document.querySelectorAll('.header__select');
	if (menuArrows.length > 0){
		for(let index = 0; index < menuArrows.length; index++){
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function(e){
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}

} else{ // Для прочих устройств
	document.body.classList.add('_pc');
}

/* Кнопка меню бургер */
const iconMenu = document.querySelector('.burger_menu_icon');
if (iconMenu){
	const menuBody = document.querySelector('.header__menu__row');
	iconMenu.addEventListener("click", function(e){
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

/* Copyright вне поля зрения */
window.addEventListener('load', setWrapperHeight);
window.addEventListener('resize', setWrapperHeight);
function setWrapperHeight() {
	const wrapperElement = document.querySelector('.wrapper');
	const wrapperMinHeight = window.innerHeight + document.getElementById('copyright').offsetHeight;
	wrapperElement.style.minHeight = `${wrapperMinHeight}px`;
}
