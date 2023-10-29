// const availableTime = [
// 	{
// 		year: 2023,
// 		month: 10,
// 		day: 22,
// 		weekend: true,
// 		time: [600, 615, 630, 645, 700, 1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 10,
// 		day: 23,
// 		weekend: false,
// 		time: [1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 10,
// 		day: 24,
// 		weekend: false,
// 		time: [600, 615, 630, 645, 700, 1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 10,
// 		day: 25,
// 		weekend: false,
// 		time: [1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 10,
// 		day: 26,
// 		weekend: false,
// 		time: [600, 615, 630, 645, 700, 1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 10,
// 		day: 27,
// 		weekend: false,
// 		time: [1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 10,
// 		day: 28,
// 		weekend: false,
// 		time: [600, 615, 630, 645, 700, 1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 10,
// 		day: 29,
// 		weekend: true,
// 		time: [1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 10,
// 		day: 30,
// 		weekend: false,
// 		time: [600, 615, 630, 645, 700, 1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 10,
// 		day: 31,
// 		weekend: false,
// 		time: [1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 11,
// 		day: 1,
// 		weekend: false,
// 		time: [600, 615, 630, 645, 700, 1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 11,
// 		day: 2,
// 		weekend: false,
// 		time: [1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 11,
// 		day: 3,
// 		weekend: false,
// 		time: [600, 615, 630, 645, 700, 1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 11,
// 		day: 4,
// 		weekend: false,
// 		time: [1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 11,
// 		day: 5,
// 		weekend: true,
// 		time: [600, 615, 630, 645, 700, 1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 11,
// 		day: 6,
// 		weekend: false,
// 		time: [1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 11,
// 		day: 7,
// 		weekend: false,
// 		time: [600, 615, 630, 645, 700, 1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 11,
// 		day: 8,
// 		weekend: false,
// 		time: [1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 11,
// 		day: 9,
// 		weekend: false,
// 		time: [600, 615, 630, 645, 700, 1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 11,
// 		day: 10,
// 		weekend: false,
// 		time: [1080, 1095, 1110, 1125]
// 	},
// 	{
// 		year: 2023,
// 		month: 11,
// 		day: 11,
// 		weekend: false,
// 		time: [600, 615, 630, 645, 700, 1080, 1095, 1110, 1125]
// 	}
// ]

/* Функция для генерации строки дней dayLine*/
function generateDayLine() {
	const daysLine = document.getElementById('daysLine');
	let weekBlock = null;
	let newWeekIndex = null;
	let selectedDayIndex = null; // Переменная для хранения индекса выбранного дня
	const currentMonth = document.getElementById('currentMonth');
	const prevDayBtn = document.getElementById('prevDay');
	const nextDayBtn = document.getElementById('nextDay');

	availableTime.forEach((date, index) => {
		// Создаем новый блок "week" каждые 7 дней
		if (index % 7 === 0) {
			weekBlock = document.createElement('div');
			weekBlock.classList.add('week');
			daysLine.appendChild(weekBlock);
		}

		// day
		const dayBlock = document.createElement('div');
		dayBlock.classList.add('day');

		dayBlock.setAttribute('data-weekend', `false`);
		dayBlock.setAttribute('data-selected', `false`);

		if (index === 0) {
			dayBlock.dataset.selected = 'true'; // Первый день выбран по умолчанию
			selectedDayIndex = index;
		}

		// day_off
		if (date.weekend) {
			dayBlock.setAttribute('data-weekend', `true`);
		}

		// data-selected
		dayBlock.addEventListener('click', () => {
			daySelected(index);
			setSelectedDayByIndex();
			generateTimeList(selectedDayIndex);
			sessionStorage.setItem('selectedDayIndex', selectedDayIndex);
			console.log(sessionStorage.getItem('selectedDayIndex'), sessionStorage.getItem('selectedTimeIndex'))
		});

		// day__name
		const dayName = document.createElement('div');
		dayName.classList.add('day__name');
		dayName.textContent = getDayName(date.year, date.month, date.day);
		dayBlock.appendChild(dayName);

		// day__num
		const dayNum = document.createElement('div');
		dayNum.classList.add('day__num');
		dayNum.textContent = date.day;
		dayBlock.appendChild(dayNum);

		// Добавляем блок "day" в текущий блок "week"
		weekBlock.appendChild(dayBlock);
	});

	/* Функция для изменения состояния кнопки дня */
	function daySelected(index) {
		if (selectedDayIndex !== null) {
			let oldWeekIndex = Math.floor(selectedDayIndex / 7);
			let oldDayIndexInWeek = selectedDayIndex % 7;
			daysLine.children[oldWeekIndex].children[oldDayIndexInWeek].dataset.selected = 'false';
		}

		selectedDayIndex = index;
		newWeekIndex = Math.floor(selectedDayIndex / 7);
		console.log(newWeekIndex)
		let newDayIndexInWeek = selectedDayIndex % 7;
		daysLine.children[newWeekIndex].children[newDayIndexInWeek].dataset.selected = 'true';
	}

	/* Фунция для именовани дня недели */
	function getDayName(year, month, day) {
		const date = new Date(year, month - 1, day);
		const formatter = new Intl.DateTimeFormat('en', { weekday: 'short' });
		return formatter.format(date);
	}

	/* Функция для обновления связей при выборе нового дня */
	function setSelectedDayByIndex() {
		setCurrentMonth(); // Обновляем название месяца
		generateTimeList(selectedDayIndex); // Обновляем timeList
	}

	/* Функция для именования текущего месяца */
	function setCurrentMonth() {
		if (selectedDayIndex !== null) {
			const year = availableTime[selectedDayIndex].year;
			const month = availableTime[selectedDayIndex].month - 1;
			const day = availableTime[selectedDayIndex].day;

			const selectedDate = new Date(year, month, day);
			const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
			const monthName = formatter.format(selectedDate);
			currentMonth.textContent = monthName;
		}
	}
	setCurrentMonth();

	/* < */
	function prevDayBtnActiveted() {
		if (Math.floor(selectedDayIndex / 7) == 0) {
			prevDayBtn.setAttribute('data-active', `false`);
		} else {
			prevDayBtn.setAttribute('data-active', `true`);
		}
	}
	prevDayBtnActiveted();

	prevDayBtn.addEventListener('click', () => {
		if (selectedDayIndex !== null) {
			const newIndex = selectedDayIndex - 7;

			if (newIndex >= 0) {
				daySelected(newIndex);
				setSelectedDayByIndex();
				prevDayBtnActiveted();
				nextDayBtnActiveted();

				const scrollAmount = daysLine.offsetWidth;// Ширина блока week
				daysLine.scrollBy({
					left: -scrollAmount,
					behavior: 'smooth'
				});
			}
		}
		sessionStorage.setItem('selectedDayIndex', selectedDayIndex);
		console.log(sessionStorage.getItem('selectedDayIndex'), sessionStorage.getItem('selectedTimeIndex'));
	});

	/* > */
	function nextDayBtnActiveted() {
		if (Math.floor(selectedDayIndex / 7) == (daysLine.childElementCount - 1)) {
			nextDayBtn.setAttribute('data-active', `false`);
		} else {
			nextDayBtn.setAttribute('data-active', `true`);
		}
	}
	nextDayBtnActiveted();

	nextDayBtn.addEventListener('click', () => {
		if (selectedDayIndex !== null) {
			const newIndex = selectedDayIndex + 7;
			const totalDays = availableTime.length;

			if (newIndex < totalDays) {
				daySelected(newIndex);
				setSelectedDayByIndex();
				prevDayBtnActiveted();
				nextDayBtnActiveted();

				const scrollAmount = daysLine.offsetWidth; // Ширина блока week
				daysLine.scrollBy({
					left: scrollAmount,
					behavior: 'smooth'
				});
			}
		}
		sessionStorage.setItem('selectedDayIndex', selectedDayIndex);
		console.log(sessionStorage.getItem('selectedDayIndex'), sessionStorage.getItem('selectedTimeIndex'));
	});

	generateTimeList(selectedDayIndex);
}
generateDayLine();

/* Функция для генерации списка доступного времени timeList*/
function generateTimeList(selectedDayIndex) {
	sessionStorage.setItem('selectedTimeIndex', 0);
	sessionStorage.setItem('selectedDayIndex', 0);

	const timeList = document.getElementById('timeList');
	let selectedTimeIndex = null; // Переменная для хранения индекса выбранного времени

	if (selectedDayIndex != null) {
		updateTimeList(availableTime[selectedDayIndex].time);
	}

	/* Функция для генерации ячейки времени */
	function updateTimeList(timeArray) {
		timeList.innerHTML = ''; // Очищаем блок "timeList"

		if (timeArray != null) {
			timeArray.forEach((time, index) => {
				// time
				const timeBlock = document.createElement('div'); // Создаем элемент div для блока времени
				timeBlock.classList.add('time'); // Добавляем класс "time" к блоку времени
				timeBlock.setAttribute('data-selected', `false`);

				if (index === 0) {
					timeBlock.dataset.selected = 'true'; // Первая ячейка времени выбрана по умолчанию
					selectedTimeIndex = index;
				}

				timeBlock.addEventListener('click', () => {
					timeSelected(index);
					sessionStorage.setItem('selectedDayIndex', selectedDayIndex);
					sessionStorage.setItem('selectedTimeIndex', selectedTimeIndex);
					console.log(sessionStorage.getItem('selectedDayIndex'), sessionStorage.getItem('selectedTimeIndex'))
				});

				// time__cont
				const timeCont = document.createElement('div');
				timeCont.classList.add('time__cont');
				timeBlock.appendChild(timeCont);

				// time__dot
				const timeDot = document.createElement('div');
				timeDot.classList.add('time__dot');
				timeCont.appendChild(timeDot);

				// time__clock
				const timeClock = document.createElement('div');
				timeClock.classList.add('time__clock');
				timeClock.textContent = convertMinutesToTime(time); // Устанавливаем время в цифровом формате
				timeCont.appendChild(timeClock);

				// time__price
				const timePrice = document.createElement('div');
				timePrice.classList.add('time__price');
				if (typeof cart !== 'undefined' && cart.hasOwnProperty('totalPrice')) {
					timePrice.textContent = '£' + cart.totalPrice; // Устанавливаем значение цены
				}
				timeBlock.appendChild(timePrice);

				timeList.appendChild(timeBlock);
			});
		}
	}

	/* Функция для изменения состояния ячейки времени */
	function timeSelected(index) {
		if (selectedTimeIndex !== null) {
			timeList.children[selectedTimeIndex].dataset.selected = 'false';
		}

		selectedTimeIndex = index;
		timeList.children[selectedTimeIndex].dataset.selected = 'true';
	}

	/* Функция для форматирования времени */
	function convertMinutesToTime(time) {
		const hours = Math.floor(time / 60);
		const mins = time % 60;

		const formattedHours = String(hours).padStart(2, '0'); // Добавляем ведущий ноль, если часы < 10
		const formattedMins = String(mins).padStart(2, '0'); // Добавляем ведущий ноль, если минуты < 10

		return formattedHours + ':' + formattedMins; // Возвращаем время в формате ЧЧ:ММ
	}
}

console.log(sessionStorage.getItem('selectedDayIndex'), sessionStorage.getItem('selectedTimeIndex'))