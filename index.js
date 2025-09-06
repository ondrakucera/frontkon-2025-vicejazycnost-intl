"use strict";

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

const locales = [
	"cs-CZ",
	"en-US",
	"en-GB",
	"de-DE",
	"fr-FR",
	"it-IT",
	"es-ES",
	"ar-SA",
	"he-IL",
	"sv-SE",
	"fi-FI",
	"zh-CN",
].map((localeString) => new Intl.Locale(localeString));
const dateStyles = ["medium", "full", "long", "short"];
const timeStyles = ["medium", "full", "long", "short"];

let currentTime = new Date();
const frontkonTime = new Date("2025-10-01T17:00:00.000+02:00");
let selectedTime = new Date(Math.floor(currentTime.getTime() / 1000) * 1000); // current time rounded to seconds
/** @type {Intl.DateTimeFormat} */
let dateTimeFormat;

/** @type {HTMLSelectElement} */
let localeElement, dateStyleElement, timeStyleElement;
/** @type {HTMLInputElement} */
let selectedTimeInput;
/** @type {HTMLElement} */
let currentTimeElement, frontkonTimeElement, selectedTimeElement;

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

	selectedTimeInput.value = dateToDatetimeLocalInputValue(selectedTime);
};

const updateDateTimeFormat = () => {
	dateTimeFormat = new Intl.DateTimeFormat(locales[Number(localeElement.value)], {
		dateStyle: dateStyles[Number(dateStyleElement.value)],
		timeStyle: timeStyles[Number(timeStyleElement.value)],
	});
	updateCurrentTime();
	updateFrontkonTime();
	updateSelectedTime();
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

localeElement = document.getElementById("locale");
dateStyleElement = document.getElementById("date-style");
timeStyleElement = document.getElementById("time-style");
[localeElement, dateStyleElement, timeStyleElement].forEach((element) => {
	element.addEventListener("change", updateDateTimeFormat);
});
selectedTimeInput = document.getElementById("selected-time-input");
selectedTimeInput.addEventListener("change", updateSelectedTime);

currentTimeElement = document.getElementById("current-time");
frontkonTimeElement = document.getElementById("frontkon-time");
selectedTimeElement = document.getElementById("selected-time");

populateFormElements();
updateDateTimeFormat();
setInterval(updateCurrentTime, 200);
