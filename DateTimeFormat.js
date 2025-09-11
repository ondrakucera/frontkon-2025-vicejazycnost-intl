"use strict";

import { dateToDatetimeLocalInputValue, frontkonTime, getSelectedArrayItem, populateSelect } from "./common.js";
import { locales, populateLocaleElement } from "./Locale-common.js";

const dateStyles = ["medium", "full", "long", "short"];
const timeStyles = ["medium", "full", "long", "short"];
const timeZones = Intl.supportedValuesOf("timeZone");
const calendars = Intl.supportedValuesOf("calendar");

let currentTime = new Date();
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
	populateLocaleElement(localeElement, locales);
	populateSelect(dateStyleElement, dateStyles);
	populateSelect(timeStyleElement, timeStyles);
	populateSelect(timeZoneElement, timeZones, true);
	populateSelect(calendarElement, calendars, true);

	selectedTimeInput.value = dateToDatetimeLocalInputValue(selectedTime);
};

const updateDateTimeFormat = () => {
	const options = {
		dateStyle: getSelectedArrayItem(dateStyleElement, dateStyles),
		timeStyle: getSelectedArrayItem(timeStyleElement, timeStyles),
	};
	if (timeZoneElement.value !== "") {
		options.timeZone = getSelectedArrayItem(timeZoneElement, timeZones);
	}
	if (calendarElement.value !== "") {
		options.calendar = getSelectedArrayItem(calendarElement, calendars);
	}

	dateTimeFormat = new Intl.DateTimeFormat(getSelectedArrayItem(localeElement, locales), options);

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
