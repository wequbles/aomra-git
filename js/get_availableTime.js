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
	// {
	// 	year: 2023,
	// 	month: 10,
	// 	day: 30,
	// 	time: 840,
	// 	duration: 60
	// },
	// {
	// 	year: 2023,
	// 	month: 10,
	// 	day: 30,
	// 	time: 930,
	// 	duration: 30
	// }
]

/* Список не рабочих часов */
const workBreaks = [
	// {
	// 	repeat: "not",
	// 	year: 2023,
	// 	month: 10,
	// 	day: 29,
	// 	time: 720,
	// 	duration: 60
	// },
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
			if (weekend.repeat === "not") { // Если событие не повторяется
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
	const gap = 5;

	let gapAdded = false;
	let previousEndTime = null;

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
			const bookingEndTime = booking.time + booking.duration;
			if (year === booking.year && month === booking.month && day === booking.day) {
				if (i >= booking.time && i < bookingEndTime) {
					isAvailableTime = true;
					gapAdded = true;
					i = bookingEndTime + gap;
					break;
				}
				else if (i + cart.totalTime + interval === booking.time) {
					isAvailableTime = true;
					gapAdded = true;
					i += interval - gap;
					break;
				}
				else if (i - gap === previousEndTime && i - gap + cart.totalTime === booking.time) {
					isAvailableTime = true;
					i -= gap;
					break;
				}
				else if (i < bookingEndTime && i + cart.totalTime > booking.time) {
					isAvailableTime = true;
					gapAdded = true;
					i = bookingEndTime + gap;
					break;
				}
				else if (i < booking.time && i + cart.totalTime > bookingEndTime) {
					isAvailableTime = true;
					i += cart.totalTime;
				}
				previousEndTime = bookingEndTime;
			}
		}

		// for (const booking of bookedTime) {
		// 	if (year === booking.year && month === booking.month && day === booking.day) {
		// 		if (i === booking.time) {
		// 			isAvailableTime = true;
		// 			gapAdded = true;
		// 			i += booking.duration + gap;
		// 			break;
		// 		}
		// 	}
		// }

		if (!isAvailableTime) {
			time.push(i);
			i += gapAdded ? interval - gap : interval;
			gapAdded = false;
		}

	}
	return time;
}