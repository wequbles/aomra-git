"use strict";

// Адаптив модальной формы
function modalAdaptive() {
	const reg = document.querySelector('.modal_content_reg');
	const auth = document.querySelector('.modal_content_auth');
	let regHeight = reg.offsetHeight;
	let authHeight = auth.offsetHeight;

	let cssStylesReg = '@media(max-height: ' + regHeight + 'px){ .modal_content_reg{top: 0; transform: translate(-50%, 0);} }';
	let cssStylesAuth = '@media(max-height: ' + authHeight + 'px){ .modal_content_auth{top: 0; transform: translate(-50%, 0);} }';

	let styleElement = document.createElement('style');
	styleElement.type = 'text/css';
	styleElement.appendChild(document.createTextNode(cssStylesReg));
	styleElement.appendChild(document.createTextNode(cssStylesAuth));

	document.body.appendChild(styleElement);
}
modalAdaptive();