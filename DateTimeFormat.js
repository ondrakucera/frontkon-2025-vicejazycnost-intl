"use strict";

import { locales } from "./Locale-common.js";

/**
 * @param {Date} date
 * @returns {string}
 */
const dateToDatetimeLocalInputValue = (date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const dateStyles = ["medium", "full", "long", "short"];
const timeStyles = ["medium", "full", "long", "short"];
const timeZones = Intl.supportedValuesOf("timeZone");
const calendars = Intl.supportedValuesOf("calendar");

let currentTime = new Date();
const frontkonTime = new Date("2025-10-01T17:00:00.000+02:00");
let selectedTime = new Date(Math.floor(currentTime.getTime() / 1000) * 1000); // current time rounded to seconds
const gaugamelaTime = new Date("-000330-10-01T12:00:00+03:00");
/** @type {Intl.DateTimeFormat} */
let dateTimeFormat;

/** @type {HTMLSelectElement} */
let localeElement, dateStyleElement, timeStyleElement, timeZoneElement, calendarElement;
/** @type {HTMLInputElement} */
let selectedTimeInput;
/** @type {HTMLElement} */
let currentTimeElement, frontkonTimeElement, selectedTimeElement, gaugamelaTimeElement;

const populateFormElements = () => {
	const displayNames = new Intl.DisplayNames("cs", { type: "language" });
	localeElement.innerHTML = locales
		.map((locale, index) => `<option value="${index}">${displayNames.of(locales[index])}</option>`)
		.join("");
	dateStyleElement.innerHTML = dateStyles
		.map((dateStyle, index) => `<option value="${index}">${dateStyle}</option>`)
		.join("");
	timeStyleElement.innerHTML = timeStyles
		.map((timeStyle, index) => `<option value="${index}">${timeStyle}</option>`)
		.join("");
	timeZoneElement.innerHTML =
		"<option></option>" +
		timeZones.map((timeZone, index) => `<option value="${index}">${timeZone}</option>`).join("");
	calendarElement.innerHTML =
		"<option></option>" +
		calendars.map((calendar, index) => `<option value="${index}">${calendar}</option>`).join("");

	selectedTimeInput.value = dateToDatetimeLocalInputValue(selectedTime);
};

const updateDateTimeFormat = () => {
	const options = {
		dateStyle: dateStyles[Number(dateStyleElement.value)],
		timeStyle: timeStyles[Number(timeStyleElement.value)],
	};
	if (timeZoneElement.value !== "") {
		options.timeZone = timeZones[Number(timeZoneElement.value)];
	}
	if (calendarElement.value !== "") {
		options.calendar = calendars[Number(calendarElement.value)];
	}

	dateTimeFormat = new Intl.DateTimeFormat(locales[Number(localeElement.value)], options);

	updateCurrentTime();
	updateFrontkonTime();
	updateSelectedTime();
	updateGaugamelaTime();
};

const updateCurrentTime = () => {
	currentTime = new Date();
	currentTimeElement.textContent = dateTimeFormat.format(currentTime);
};

const updateFrontkonTime = () => {
	frontkonTimeElement.textContent = dateTimeFormat.format(frontkonTime);
};

const updateSelectedTime = () => {
	selectedTime = new Date(selectedTimeInput.value);
	selectedTimeElement.textContent = dateTimeFormat.format(selectedTime);
};

const updateGaugamelaTime = () => {
	gaugamelaTimeElement.textContent = new Intl.DateTimeFormat("cs", {
		weekday: "long",
		era: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		dayPeriod: "long",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		timeZoneName: "long",
	}).format(gaugamelaTime);
};

localeElement = document.getElementById("locale");
dateStyleElement = document.getElementById("date-style");
timeStyleElement = document.getElementById("time-style");
timeZoneElement = document.getElementById("time-zone");
calendarElement = document.getElementById("calendar");
[localeElement, dateStyleElement, timeStyleElement, timeZoneElement, calendarElement].forEach((element) => {
	element.addEventListener("change", updateDateTimeFormat);
});
selectedTimeInput = document.getElementById("selected-time-input");
selectedTimeInput.addEventListener("change", updateSelectedTime);

currentTimeElement = document.getElementById("current-time");
frontkonTimeElement = document.getElementById("frontkon-time");
selectedTimeElement = document.getElementById("selected-time");
gaugamelaTimeElement = document.getElementById("gaugamela-time");

populateFormElements();
updateDateTimeFormat();
setInterval(updateCurrentTime, 200);
