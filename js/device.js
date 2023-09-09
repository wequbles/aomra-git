"use strict";

let myMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (myMobile.Android() || 
						myMobile.BlackBerry() || 
						myMobile.iOS() || 
						myMobile.Opera() || 
						myMobile.Windows());
	}
};

if (myMobile.any()){
	document.body.classList.add('_touch');

	// Выпадающий список открытие|закрытие
	let menuArrows = document.querySelectorAll('.header__select');
	if (menuArrows.length > 0){
		for(let index = 0; index < menuArrows.length; index++){
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function(e){
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}

} else{
	document.body.classList.add('_pc');
}

// Меню бургер
const iconMenu = document.querySelector('.burger_menu_icon');
if (iconMenu){
	const menuBody = document.querySelector('.header__menu__row');
	iconMenu.addEventListener("click", function(e){
		//document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

document.addEventListener('DOMContentLoaded', function() {
	invisibleBlock();
	// Модальная форма для малых экранов
	let reg = document.querySelector('.modal_content_reg');
	let auth = document.querySelector('.modal_content_auth');
	let regHeight = reg.offsetHeight;
	let authHeight = auth.offsetHeight;

	let cssStylesReg = '@media(max-height: ' + regHeight + 'px){ .modal_content_reg{top: 0; transform: translate(-50%, 0);} }';
	let cssStylesAuth = '@media(max-height: ' + authHeight + 'px){ .modal_content_auth{top: 0; transform: translate(-50%, 0);} }';

	let styleElement = document.createElement('style');
	styleElement.type = 'text/css';
	styleElement.appendChild(document.createTextNode(cssStylesReg));
	styleElement.appendChild(document.createTextNode(cssStylesAuth));

	document.body.appendChild(styleElement);
});

window.addEventListener('resize', invisibleBlock);

function invisibleBlock() {
	//Copyright
	const copyrightElement = document.getElementById('copyright');
	const copyrightElementHeight = getComputedStyle(copyrightElement).height;
	document.documentElement.style.setProperty('--copyright-height', copyrightElementHeight);
}
