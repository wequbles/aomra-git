"use strict";

/* Scheduler */
/* Выходные дни */
const weekendDays = [
	// {
	// 	repeat: "not",
	// 	year: 2023,
	// 	month: 10,
	// 	day: 30
	// },
	// {
	// 	repeat: "weekly",
	// 	weekday: 0
	// },
	// {
	// 	repeat: "monthly",
	// 	day: 31
	// },
	// {
	// 	repeat: "annually",
	// 	month: 11,
	// 	day: 1
	// }
]

/* Забронированное время */
const bookedTime = [
	{
		year: 2023,
		month: 10,
		day: 29,
		time: 780,
		duration: 60
	},
	// {
	// 	year: 2023,
	// 	month: 10,
	// 	day: 29,
	// 	time: 840,
	// 	duration: 30
	// }
]

/* Список не рабочих часов */
const workBreaks = [
	{
		repeat: "not",
		year: 2023,
		month: 10,
		day: 29,
		time: 720,
		duration: 60
	},
	// {
	// 	repeat: "not",
	// 	year: 2023,
	// 	month: 10,
	// 	day: 29,
	// 	time: 660,
	// 	duration: 120
	// },
	// {
	// 	repeat: "daily",
	// 	time: 720,
	// 	duration: 60
	// },
	// {
	// 	repeat: "weekly",
	// 	weekday: 1,
	// 	time: 720,
	// 	duration: 60
	// },
	// {
	// 	repeat: "monthly",
	// 	day: 28,
	// 	time: 720,
	// 	duration: 60
	// }
]

let availableTime = [];

/* Day */
function getAvailableDays() {
	let currentDate = new Date();

	for (let i = 0; i < 14; i++) {
		let year = currentDate.getFullYear();
		let month = currentDate.getMonth() + 1;
		let day = currentDate.getDate();
		let weekday = currentDate.getDay();

		let isWeekend = false;
		for (const weekend of weekendDays) {
			if (weekend.repeat === "not") {         // Если событие не повторяется
				if (year === weekend.year && month === weekend.month && day === weekend.day) {
					isWeekend = true;
					break;
				}
			}
			else if (weekend.repeat === "weekly") { // Если событие повторяется каждую неделю
				if (weekday === weekend.weekday) {
					isWeekend = true;
					break;
				}
			}
			else if (weekend.repeat === "monthly") { // Если событие повторяется каждый месяц
				if (day === weekend.day) {
					isWeekend = true;
					break;
				}
			}
			else if (weekend.repeat === "annually") { // Если событие повторяется каждый год
				if (month === weekend.month && day === weekend.day) {
					isWeekend = true;
					break;
				}
			}
		}

		let availableTimeObject = {
			year: year,
			month: month,
			day: day,
			weekend: isWeekend,
			time: isWeekend ? null : getAvailableTime(year, month, day, weekday)
		};
		availableTime.push(availableTimeObject); // добавляем объект в массив

		currentDate.setDate(currentDate.getDate() + 1);
	}
}
getAvailableDays();

/* Time */
function getAvailableTime(year, month, day, weekday) {
	let time = [];

	const startTime = 600;
	const endTime = 1140;
	const interval = 15;

	for (let i = startTime; i <= endTime - cart.totalTime;) {

		let isAvailableTime = false;

		for (const workBreak of workBreaks) {
			if (i === workBreak.time) {
				if (workBreak.repeat === "not") { // Если событие не повторяется
					if (year === workBreak.year && month === workBreak.month && day === workBreak.day) {
						isAvailableTime = true;
						i += workBreak.duration;
						break;
					}
				}
				else if (workBreak.repeat === "daily") { // Если событие повторяется каждый день
					isAvailableTime = true;
					i += workBreak.duration;
					break;
				}
				else if (workBreak.repeat === "weekly") { // Если событие повторяется каждую неделю
					if (dateSelected.day === workBreak.day) {
						isAvailableTime = true;
						i += workBreak.duration;
						break;
					}
				}
				else if (workBreak.repeat === "monthly") { // Если событие повторяется каждый месяц
					if (dateSelected.date === workBreak.date) {
						isAvailableTime = true;
						i += workBreak.duration;
						break;
					}
				}
			}
		}

		for (const booking of bookedTime) {
			if (year === booking.year && month === booking.month && day === booking.day) {
				if (i === booking.time) {
					isAvailableTime = true;
					i += booking.duration;
					break;
				}
			}
		}

		if (!isAvailableTime) {
			time.push(i);
			i += interval;
		}

//
		// let previousEndTime = null;
		// const gap = 5;
		// let gapAdded = false;
		// for (const booking of bookedTime) {
		// 	const bookingEndTime = booking.time + booking.duration;
		// 	if (year === booking.year && month === booking.month && day === booking.day) {
		// 		if (i >= booking.time && i < bookingEndTime) {
		// 			isAvailableTime = true;
		// 			gapAdded = true;
		// 			i = bookingEndTime + gap;
		// 			break;
		// 		}
		// 		else if (i + cart.totalTime + interval === booking.time) {
		// 			isAvailableTime = true;
		// 			gapAdded = true;
		// 			i = i + interval - gap;
		// 			break;
		// 		}
		// 		else if (i - gap === previousEndTime && i - gap + cart.totalTime === booking.time) {
		// 			isAvailableTime = true;
		// 			i = i - gap;
		// 			break;
		// 		}
		// 		else if (i < bookingEndTime && i + cart.totalTime > booking.time) {
		// 			isAvailableTime = true;
		// 			gapAdded = true;
		// 			i = bookingEndTime + gap;
		// 			break;
		// 		}
		// 		else if (i < booking.time && i + cart.totalTime > bookingEndTime) {
		// 			isAvailableTime = true;
		// 			i += cart.totalTime;
		// 		}
		// 		previousEndTime = bookingEndTime;
		// 	}
		// }
		// if (!isAvailableTime) {
		// 	time.push(i);
		// 	i += gapAdded ? -gap + interval : interval;
		// 	gapAdded = false;
		// }
//

	}

	// проверка на забронированное время

	return time;
}

// function generateAndCheckTimes(day, compareArray) {
// 	// Преобразование второго массива в Set для быстрой проверки наличия
// 	const compareArraySet = new Set(compareArray);

// 	// Сравнение каждого элемента с Set
// 	for (const time of timesArray) {
// 		if (otherTimesSet.has(time)) {
// 			// Действие, если время присутствует в обоих массивах
// 		}
// 	}
// }

	// let filterArray = [];

	// for (const workBreak of workBreaks) {
	// 	if (workBreak.repeat === "not") {      // Если событие не повторяется
	// 		if (year === workBreak.year && month === workBreak.month && day === workBreak.day) {
	// 			filterArray.push(workBreak.time);
	// 			break;
	// 		}
	// 	}
	// 	else if (workBreak.repeat === "daily") { // Если событие повторяется каждый день
	// 		filterArray.push(workBreak.time);
	// 		break;
	// 	}
	// 	else if (workBreak.repeat === "weekly") { // Если событие повторяется каждую неделю
	// 		if (weekday === workBreak.weekday) {
	// 			filterArray.push(workBreak.time);
	// 			break;
	// 		}
	// 	}
	// 	else if (workBreak.repeat === "monthly") { // Если событие повторяется каждый месяц
	// 		if (day === workBreak.day) {
	// 			filterArray.push(workBreak.time);
	// 			break;
	// 		}
	// 	}
	// }

	// filterArray = new Set(filterArray);
	// console.log(filterArray)

	// time = time.filter(item => !filterArray.has(item));



// /* Функция для генерации строки дней */
// 	let selectedDate = new Date();
// 	let prevSelectedElement = null;
// 	let isWeekend = false;

// 	/* Функция для проверки является ли день выходным */
// 	function addWeekendCheck(dayCheck, dayElement) {
// 		for (const weekend of weekendDays) {
// 			if (dayCheck.getDate() === weekend.date || dayCheck.getDay() === weekend.day) {
// 				if (weekend.repeat === "no") {
// 					if (
// 						dayCheck.getFullYear() === weekend.year &&
// 						dayCheck.getMonth() + 1 === weekend.month &&
// 						dayCheck.getDate() === weekend.date)
// 					{
// 						isWeekend = true;
// 						dayElement.classList.add('past');
// 					}
// 				}
// 				else if (weekend.repeat === "week") {
// 					if (dayCheck.getDay() === weekend.day) {
// 						isWeekend = true;
// 						dayElement.classList.add('past');
// 					}
// 				}
// 				else if (weekend.repeat === "month") {
// 					if (dayCheck.getDate() === weekend.date) {
// 						isWeekend = true;
// 						dayElement.classList.add('past');
// 					}
// 				}
// 				else if (weekend.repeat === "year") {
// 					if (dayCheck.getMonth() + 1 === weekend.month && dayCheck.getDate() === weekend.date) {
// 						isWeekend = true;
// 						dayElement.classList.add('past');
// 					}
// 				}
// 			}
// 		}
// 	}

// /* Функция для генерации списка доступного времени */
// 	function generateTimeList() {
// 		const timeList = [];// time array
// 		const startTime = 600;// start time in hour
// 		let endTime;// end time in hour
// 		const interval = 15;// minutes interval
// 		const gap = 5;//gap between clients
// 		let gapAdded = false;

// 		const dateSelected = {
// 			year: selectedDate.getFullYear(),
// 			month: selectedDate.getMonth() + 1,
// 			date: selectedDate.getDate(),
// 			day: selectedDate.getDay()
// 		};

// 		let currentTime = startTime;

// 		// Определение конечного времени endTime
// 		if (cart.totalTime === 0) {
// 			endTime = 1125;
// 		} else {
// 			endTime = 1140;
// 		}

// 		// Цикл по рабочему времени
// 		while (currentTime <= endTime - cart.totalTime) {
// 			const hours = Math.floor(currentTime / 60);
// 			const minutes = (currentTime % 60);

// 			let isBooked = false;// Флаг забронированного времени
// 			let previousEndTime = null;

// 			if (isWeekend === true) {
// 				break;
// 			}

// 			// Проверка наличия обеденного времени
// 			for (const workBreak of workBreaks) {
// 				const workBreakEndTime = workBreak.time + workBreak.duration;

// 				if (currentTime === workBreak.time) {
// 					if (workBreak.repeat === "no") {
// 						if (
// 							dateSelected.year === workBreak.year &&
// 							dateSelected.month === workBreak.month &&
// 							dateSelected.date === workBreak.date)
// 						{
// 							isBooked = true;
// 							currentTime += workBreak.duration;
// 							break;
// 						}
// 					}
// 					else if (workBreak.repeat === "daily") {
// 						isBooked = true;
// 						currentTime += workBreak.duration;
// 						break;
// 					}
// 					else if (workBreak.repeat === "week") {
// 						if (dateSelected.day === workBreak.day) {
// 							isBooked = true;
// 							currentTime += workBreak.duration;
// 							break;
// 						}
// 					}
// 					else if (workBreak.repeat === "month") {
// 						if (dateSelected.date === workBreak.date) {
// 							isBooked = true;
// 							currentTime += workBreak.duration;
// 							break;
// 						}
// 					}
// 				}
// 			}

// 			// Проверка наличия забронированного времени
// 			for (const booking of bookedTime) {
// 				const bookingEndTime = booking.time + booking.duration;

// 				if (
// 					dateSelected.year === booking.year &&
// 					dateSelected.month === booking.month &&
// 					dateSelected.date === booking.date)
// 				{
// 					if (currentTime >= booking.time && currentTime < bookingEndTime) {
// 						isBooked = true;
// 						gapAdded = true;
// 						currentTime = bookingEndTime + gap;
// 						break;
// 					}
// 					else if (currentTime + cart.totalTime + interval === booking.time) {
// 						isBooked = true;
// 						gapAdded = true;
// 						currentTime = currentTime + interval - gap;
// 						break;
// 					}
// 					else if (currentTime - gap === previousEndTime && currentTime - gap + cart.totalTime === booking.time) {
// 						isBooked = true;
// 						currentTime = currentTime - gap;
// 						break;
// 					}
// 					else if (currentTime < bookingEndTime && currentTime + cart.totalTime > booking.time) {
// 						isBooked = true;
// 						gapAdded = true;
// 						currentTime = bookingEndTime + gap;
// 						break;
// 					}
// 					else if (currentTime < booking.time && currentTime + cart.totalTime > bookingEndTime) {
// 						isBooked = true;
// 						currentTime += cart.totalTime;
// 					}
// 					previousEndTime = bookingEndTime;
// 				}
// 			}

// 			if (!isBooked) {
// 				currentTime += gapAdded ? -gap + interval : interval;
// 				gapAdded = false;
// 				timeList.push(('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2));
// 			}
// 		}
// 		return timeList;
// 	}