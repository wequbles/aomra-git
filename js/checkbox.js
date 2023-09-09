"use strict";

document.addEventListener('DOMContentLoaded', function() {
	var checkboxes = document.querySelectorAll('.checkbox');

	checkboxes.forEach(function(checkbox) {
		if (checkbox.querySelector('input').checked == true) {
			checkbox.classList.add('active');
		}
	});

	document.addEventListener('click', function(event) {
		var target = event.target;

		if (target.classList.contains('checkbox')) {
			var input = target.querySelector('input');
			input.checked = !input.checked;
			target.classList.toggle('active');
			event.preventDefault();
		}
	});
});