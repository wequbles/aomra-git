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

	// Получаем данные о выбранных товарах из localStorage
	let savedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || [];

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
	}
	cartCalculation(savedOptions);

	function localstorageInspect() {
		// Выводим данные из LocalStorage в консоль
		console.log(localStorage.getItem('selectedOptions'));
		console.log('Total Price:', cart.totalPrice.toFixed(2));
		console.log(cart);
	}
	localstorageInspect();

/* Time List */
	//бронь
	const bookedTime = [
		{
			year: 2023,
			month: 8,
			date: 29,
			time: 840,
			duration: 60
		},
		{
			year: 2023,
			month: 8,
			date: 29,
			time: 930,
			duration: 30
		}
	]
	//рабочие перерывы
	const workBreaks = [
		//один раз
		{
			year: 2023,
			month: 8,
			date: 30,
			time: 900,
			duration: 240,
			repeat: "no"
		},
		//несколько дней подряд
		// {
		// 	year: 2023,
		// 	month: 8,
		// 	date: 27,
		// 	time: 720,
		// 	duration: 60,
		// 	repeat: "no"
		// },
		// {
		// 	year: 2023,
		// 	month: 8,
		// 	date: 28,
		// 	time: 720,
		// 	duration: 60,
		// 	repeat: "no"
		// },
		// {
		// 	year: 2023,
		// 	month: 8,
		// 	date: 29,
		// 	time: 720,
		// 	duration: 60,
		// 	repeat: "no"
		// },
		//каждый день
		{
			day: 0,
			time: 720,
			duration: 60,
			repeat: "daily"
		},
		// {
		// 	day: 1,
		// 	time: 720,
		// 	duration: 60,
		// 	repeat: "week"
		// },
		// {
		// 	date: 28,
		// 	time: 720,
		// 	duration: 60,
		// 	repeat: "month"
		// }
	]
	//выходные
	const weekendDays = [
		//один раз
		// {
		// 	year: 2023,
		// 	month: 8,
		// 	date: 29,
		// 	repeat: "no"
		// },
		//несколько дней подряд
		// {
		// 	year: 2023,
		// 	month: 8,
		// 	date: 29,
		// 	repeat: "no"
		// },
		// {
		// 	year: 2023,
		// 	month: 8,
		// 	date: 30,
		// 	repeat: "no"
		// },
		// {
		// 	year: 2023,
		// 	month: 8,
		// 	date: 31,
		// 	repeat: "no"
		// },
		//каждый день
		{
			day: 0,
			repeat: "week"
		},
		{
			date: 5,
			repeat: "month"
		},
		{
			date: 6,
			repeat: "month"
		},
		// {
		// 	month: 8,
		// 	date: 29,
		// 	repeat: "year"
		// }
	]

	const currentMonthElement = document.getElementById('currentMonth');
	const appointmentsContainer = document.querySelector('.appointments ol');
	const prevDayBtn = document.getElementById('prevDay');
	const nextDayBtn = document.getElementById('nextDay');
	const timeListElement = document.querySelector('.time-list');

	let currentIndex = 0;
	const daysToAdd = 7;

	prevDayBtn.addEventListener('click', () => {
		if( (selectedDate - 1) >= new Date() ){
			selectedDate.setDate(selectedDate.getDate() - 1);
		}
		// Удаление класса "selected" с предыдущего элемента
		if (prevSelectedElement) {
			prevSelectedElement.classList.remove('selected');
		}
		// Добавление класса "selected" к новому элементу
		if (currentIndex - daysToAdd < 0) {
			currentIndex = 0;
			prevSelectedElement = dayNumberArray[currentIndex];
		} else {
			prevSelectedElement = dayNumberArray[currentIndex - daysToAdd];
			currentIndex -= daysToAdd;
		}
		prevSelectedElement.classList.add('selected');
		updateAppointments();
		updateMonth(selectedDate);
	});

	nextDayBtn.addEventListener('click', () => {
		selectedDate.setDate(selectedDate.getDate() + 1);
		// Удаление класса "selected" с предыдущего элемента
		if (prevSelectedElement) {
			prevSelectedElement.classList.remove('selected');
		}
		// Добавление класса "selected" к новому элементу
		if (currentIndex + daysToAdd > dayNumberArray.length - 1) {
			currentIndex = dayNumberArray.length - 1;
			prevSelectedElement = dayNumberArray[currentIndex];
		} else {
			prevSelectedElement = dayNumberArray[currentIndex + daysToAdd];
			currentIndex += daysToAdd;
		}
		prevSelectedElement.classList.add('selected');
		updateAppointments();
		updateMonth(selectedDate);
	});

	function updateMonth(selectedDate) {
		const monthName = new Intl.DateTimeFormat('en', { month: 'long' }).format(selectedDate);
		currentMonthElement.textContent = monthName;
	}

	function getDayName(date) {
		const formatter = new Intl.DateTimeFormat('en', { weekday: 'short' });
		const dayName = formatter.format(date);
		return dayName;
	}

	let selectedDate = new Date();
	let prevSelectedElement = null;
	let isWeekend = false;

	function generateDayLine() {
		const now = new Date();
		const startDay = new Date(now);
		const recordPeriod = 61;
		const endDay = new Date();
		endDay.setDate(endDay.getDate() + recordPeriod);
		let currentDate = new Date(startDay);

		const daysRow = document.querySelector('#days-row');

		while (currentDate <= endDay) {
			const day = new Date(currentDate);

			const dayElement = document.createElement('div');
			dayElement.classList.add('day');

				const dayNameElement = document.createElement('div');
				dayNameElement.classList.add('day-name');
				dayNameElement.textContent = getDayName(currentDate);
				dayElement.appendChild(dayNameElement);

				const dayNumberElement = document.createElement('div');
				dayNumberElement.classList.add('day-number');
				dayNumberElement.textContent = day.getDate();
				dayElement.appendChild(dayNumberElement);

				if (day.getDate() === selectedDate.getDate() && day.getMonth() === selectedDate.getMonth()) {
					prevSelectedElement = dayNumberElement;
					dayNumberElement.classList.add('selected');
				}

				function addClassPast() {
					dayElement.classList.add('past');
				}

				addWeekendCheck(day, addClassPast);

				dayElement.addEventListener('click', () => {
					isWeekend = false;
					selectedDate = day;

					addWeekendCheck(selectedDate, addIsWeekend);

					// Удаление класса "selected" с предыдущего элемента
					if (prevSelectedElement) {
						prevSelectedElement.classList.remove('selected');
					}
					// Добавление класса "selected" к новому элементу
					dayNumberElement.classList.add('selected');
					prevSelectedElement = dayNumberElement;
					currentIndex = dayNumberArray.findIndex(element => element.classList.contains('selected'));
					updateAppointments();
					updateMonth(selectedDate);
				});

			daysRow.appendChild(dayElement);
			currentDate.setDate(currentDate.getDate() + 1);
		}

		updateAppointments();
		updateMonth(selectedDate);
	}
	generateDayLine();
	const dayNumberArray = Array.from(document.querySelectorAll('.day-number'));

	function addIsWeekend() {
		isWeekend = true;
	}

	function addWeekendCheck(dayCheck, placeFunction) {
		for (const weekend of weekendDays) {
			if (dayCheck.getDate() === weekend.date || dayCheck.getDay() === weekend.day) {
				if (weekend.repeat === "no") {
					if (
						dayCheck.getFullYear() === weekend.year &&
						dayCheck.getMonth() + 1 === weekend.month &&
						dayCheck.getDate() === weekend.date)
					{
						placeFunction();
					}
				}
				else if (weekend.repeat === "week") {
					if (dayCheck.getDay() === weekend.day) {
						placeFunction();
					}
				}
				else if (weekend.repeat === "month") {
					if (dayCheck.getDate() === weekend.date) {
						placeFunction();
					}
				}
				else if (weekend.repeat === "year") {
					if (dayCheck.getMonth() + 1 === weekend.month && dayCheck.getDate() === weekend.date) {
						placeFunction();
					}
				}
			}
		}
	}

	function generateTimeList() {
		const timeList = [];// time array
		const startTime = 600;// start time in hour
		let endTime;// end time in hour
		const interval = 15;// minutes interval
		const gap = 5;//gap between clients
		let gapAdded = false;
		//let timeFormat = ['AM', 'PM']; // AM-PM

		const dateSelected = {
			year: selectedDate.getFullYear(),
			month: selectedDate.getMonth() + 1,
			date: selectedDate.getDate(),
			day: selectedDate.getDay()
		};

		let currentTime = startTime;

		if (cart.totalTime === 0) {
			endTime = 1125;
		} else {
			endTime = 1140;
		}

		while (currentTime <= endTime - cart.totalTime) {
			const hours = Math.floor(currentTime / 60);
			const minutes = (currentTime % 60);

			let isBooked = false;// Флаг забронированного времени
			let previousEndTime = null;

			if (isWeekend === true) {
				break;
			}

			for (const workBreak of workBreaks) {
				const workBreakEndTime = workBreak.time + workBreak.duration;

				if (currentTime === workBreak.time) {
					if (workBreak.repeat === "no") {
						if (
							dateSelected.year === workBreak.year &&
							dateSelected.month === workBreak.month &&
							dateSelected.date === workBreak.date)
						{
							isBooked = true;
							currentTime += workBreak.duration;
							break;
						}
					}
					else if (workBreak.repeat === "daily") {
						isBooked = true;
						currentTime += workBreak.duration;
						break;
					}
					else if (workBreak.repeat === "week") {
						if (dateSelected.day === workBreak.day) {
							isBooked = true;
							currentTime += workBreak.duration;
							break;
						}
					}
					else if (workBreak.repeat === "month") {
						if (dateSelected.date === workBreak.date) {
							isBooked = true;
							currentTime += workBreak.duration;
							break;
						}
					}
				}
			}

			for (const booking of bookedTime) {
				const bookingEndTime = booking.time + booking.duration;

				if (
					dateSelected.year === booking.year &&
					dateSelected.month === booking.month &&
					dateSelected.date === booking.date)
				{
					if (currentTime >= booking.time && currentTime < bookingEndTime) {
						isBooked = true;
						gapAdded = true;
						currentTime = bookingEndTime + gap;
						break;
					}
					else if (currentTime + cart.totalTime + interval === booking.time) {
						isBooked = true;
						gapAdded = true;
						currentTime = currentTime + interval - gap;
						break;
					}
					else if (currentTime - gap === previousEndTime && currentTime - gap + cart.totalTime === booking.time) {
						isBooked = true;
						currentTime = currentTime - gap;
						break;
					}
					else if (currentTime < bookingEndTime && currentTime + cart.totalTime > booking.time) {
						isBooked = true;
						gapAdded = true;
						currentTime = bookingEndTime + gap;
						break;
					}
					else if (currentTime < booking.time && currentTime + cart.totalTime > bookingEndTime) {
						isBooked = true;
						currentTime += cart.totalTime;
					}
					previousEndTime = bookingEndTime;
				}
			}

			if (!isBooked) {
				currentTime += gapAdded ? -gap + interval : interval;
				gapAdded = false;
				timeList.push(('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2));
			}
		}
		return timeList;
	}

	function updateAppointments() {
		appointmentsContainer.innerHTML = '';

		const availableTimes = generateTimeList();

		availableTimes.forEach(time => {
			const timeSlot = document.createElement('li');
			timeSlot.classList.add('time-slot');
			appointmentsContainer.appendChild(timeSlot);

			const slotTime = document.createElement('div');
			slotTime.classList.add('slot-time');
			slotTime.textContent = time;
			timeSlot.appendChild(slotTime);

			const slotPrice = document.createElement('div');
			slotPrice.classList.add('slot-price');
			slotPrice.textContent = '£' + cart.totalPrice.toFixed(2);
			timeSlot.appendChild(slotPrice);

			timeSlot.addEventListener('click', () => {
				const selectedTime = slotTime.textContent;
				console.log((selectedDate.getMonth() + 1), selectedDate.getDate(), selectedTime);
				//bookingData(selectedTime);
				alert(`Вы выбрали время приема: ${selectedDate.toLocaleDateString()} ${selectedTime}`);
			});
		});
	}

/* Appointment Logic */
	// function bookingData(selectedTime) {
	// 	const selectedTimeCell = [];
	// 	selectedTimeCell[selectedTimeCell.length] = [(selectedDate.getMonth() + 1), selectedDate.getDate(), selectedTime];
	// }

/* Basket */
	/* Преобразования формата времени */
	function getTimeFromMins(mins) {
		let hours = Math.trunc(mins/60);
		let minutes = mins % 60;
		if (minutes == 0) {
			return hours + 'h';
		} else if (hours == 0) {
			return minutes + ' mins';
		} else{
			return hours + ' hr ' + minutes + ' mins';
		}
	};

	/* Обновление корзины basket */
	const basketContainer = document.getElementById('basket__container');
	function generateBasketContainer(savedOptions) {
		const serviceElements = savedOptions.map(option => {
			const product = products.find(prod => prod.id === parseInt(option.productId));
			if (product) {
				// basket__service
				const serviceElement = document.createElement('div');
				serviceElement.classList.add('basket__service');

				// service__title
				const serviceTitle = document.createElement('div');
				serviceTitle.classList.add('service__title');
				serviceTitle.textContent = product.title;
				serviceElement.appendChild(serviceTitle);

				const selectedOption = product.option.find(opt => opt.id === option.optionId);
				if (selectedOption) {
					// service__subtitle
					const serviceSubtitle = document.createElement('div');
					serviceSubtitle.classList.add('service__subtitle');
					serviceSubtitle.textContent = `${product.title} (For ${selectedOption.time} Minutes)`;
					serviceElement.appendChild(serviceSubtitle);

					// service__time
					const serviceTime = document.createElement('div');
					serviceTime.classList.add('service__time');
					serviceTime.textContent = getTimeFromMins(selectedOption.time);
					serviceElement.appendChild(serviceTime);
				}
				return serviceElement;
			}
		});
		return serviceElements;
	}

	if (savedOptions && savedOptions.length > 0) {
		// Очищаем контейнер
		basketContainer.innerHTML = '';
		const serviceElements = generateBasketContainer(savedOptions);
		serviceElements.forEach(serviceElement => {
			basketContainer.appendChild(serviceElement);
		});
	}

	/* Обновление totalPrice для корзины */
	function updateBasketTotalPrice() {
		const totalPriceElement = document.getElementById('total__price');
		totalPriceElement.textContent = '£' + cart.totalPrice.toFixed(2);
	}
	updateBasketTotalPrice();

/* Calendar */
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth();

	const day = document.querySelector(".calendar-dates");
	const currdate = document.querySelector(".calendar-current-date");
	const prenexIcons = document.querySelectorAll(".calendar-navigation span");

	// Array of month names
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	// Function to generate the calendar
	const manipulate = () => {

		// Get the first day of the month
		let dayone = new Date(year, month, 1).getDay();

		// Get the last date of the month
		let lastdate = new Date(year, month + 1, 0).getDate();

		// Get the day of the last date of the month
		let dayend = new Date(year, month, lastdate).getDay();

		// Get the last date of the previous month
		let monthlastdate = new Date(year, month, 0).getDate();

		// Variable to store the generated calendar HTML
		let lit = "";

		// Loop to add the last dates of the previous month
		for (let i = dayone; i > 0; i--) {
			lit +=
				`<li class="inactive">${monthlastdate - i + 1}</li>`;
		}
		// Loop to add the dates of the current month
		for (let i = 1; i <= lastdate; i++) {

			// Check if the current date is today
			let isToday = i === date.getDate()
				&& month === new Date().getMonth()
				&& year === new Date().getFullYear()
				? "active"
				: "";
			lit += `<li class="${isToday}">${i}</li>`;
		}
		// Loop to add the first dates of the next month
		for (let i = dayend; i < 6; i++) {
			lit += `<li class="inactive">${i - dayend + 1}</li>`
		}
		// Update the text of the current date element
		// with the formatted current month and year
		currdate.innerText = `${months[month]} ${year}`;

		// update the HTML of the dates element
		// with the generated calendar
		day.innerHTML = lit;
	}
	manipulate();

	// Attach a click event listener to each icon
	prenexIcons.forEach(icon => {
		// When an icon is clicked
		icon.addEventListener("click", () => {

			// Check if the icon is "calendar-prev"
			// or "calendar-next"
			month = icon.id === "calendar-prev" ? month - 1 : month + 1;

			// Check if the month is out of range
			if (month < 0 || month > 11) {

				// Set the date to the first day of the
				// month with the new year
				date = new Date(year, month, new Date().getDate());

				// Set the year to the new year
				year = date.getFullYear();

				// Set the month to the new month
				month = date.getMonth();
			}
			else{
				// Set the date to the current date
				date = new Date();
			}
			// Call the manipulate function to
			// update the calendar display
			manipulate();
		});
	});

	/* toggle_calendar */
	// Получаем ссылки на кнопку и блок, который нужно открывать/закрывать
	const toggleButton = document.getElementById('toggle_calendar');
	const blockToToggle = document.getElementById('calendar-container');
	blockToToggle.style.display = 'none';

	// Добавляем обработчик события клика на кнопку
	toggleButton.addEventListener('click', function() {
		// Проверяем текущее состояние блока
		if (blockToToggle.style.display === 'none') {
			// Если блок скрыт, отображаем его
			blockToToggle.style.display = 'block';
		} else{
			// Если блок отображается, скрываем его
			blockToToggle.style.display = 'none';
		}
	});

});

