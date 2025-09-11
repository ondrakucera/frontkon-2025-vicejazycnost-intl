"use strict";

import { getSelectedArrayItem, populateSelect } from "./common.js";
import { locales, populateLocaleElement } from "./Locale-common.js";

const styles = ["long", "short", "narrow", "digital"];
const numberingSystems = Intl.supportedValuesOf("numberingSystem");

/**
 * @param {Date} date1
 * @param {Date} date2
 */
const calculateDuration = (date1, date2) => {
	let earlierDate, laterDate;
	if (date1.getTime() <= date2.getTime()) {
		earlierDate = date1;
		laterDate = date2;
	} else {
		earlierDate = date2;
		laterDate = date1;
	}

	if (typeof Temporal !== "undefined") {
		const timeZoneId = Temporal.Now.timeZoneId();
		const earlierZonedDateTime = Temporal.Instant.fromEpochMilliseconds(earlierDate.getTime()).toZonedDateTimeISO(
			timeZoneId,
		);
		const laterZonedDateTime = Temporal.Instant.fromEpochMilliseconds(laterDate.getTime()).toZonedDateTimeISO(
			timeZoneId,
		);
		return earlierZonedDateTime.until(laterZonedDateTime, { largestUnit: "year", smallestUnit: "second" });
	} else {
		const secondDifference = Math.floor((laterDate.getTime() - earlierDate.getTime()) / 1000);
		const seconds = secondDifference % 60;
		const minutes = Math.floor(secondDifference / 60) % 60;
		const hours = Math.floor(secondDifference / (60 * 60)) % 24;
		const days = Math.floor(secondDifference / (60 * 60 * 24));
		return { days, hours, minutes, seconds };
	}
};

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

let currentTime = new Date();
const frontkonTime = new Date("2025-10-01T17:00:00.000+02:00");
let selectedTime = new Date(Math.floor(currentTime.getTime() / 1000) * 1000); // current time rounded to seconds
/** @type {Intl.DurationFormat} */
let durationFormat;

/** @type {HTMLSelectElement} */
let localeElement, styleElement, numberingSystemElement;
/** @type {HTMLInputElement} */
let selectedTimeInput;
/** @type {HTMLElement} */
let currentTimeDurationElement, selectedTimeDurationElement;

const populateFormElements = () => {
	populateLocaleElement(localeElement, locales);
	populateSelect(styleElement, styles);
	populateSelect(numberingSystemElement, numberingSystems, true);

	selectedTimeInput.value = dateToDatetimeLocalInputValue(selectedTime);
};

const rerender = () => {
	const durationAgainstCurrentTime = calculateDuration(currentTime, frontkonTime);
	currentTimeDurationElement.textContent =
		currentTime.getTime() <= frontkonTime.getTime()
			? `Do mé přednášky na FrontKonu zbývá ${durationFormat.format(durationAgainstCurrentTime)}.`
			: `Od mé přednášky na FrontKonu uplynulo ${durationFormat.format(durationAgainstCurrentTime)}.`;

	const durationAgainstSelectedTime = calculateDuration(selectedTime, frontkonTime);
	selectedTimeDurationElement.textContent =
		selectedTime.getTime() <= frontkonTime.getTime()
			? `Do mé přednášky na FrontKonu zbývá ${durationFormat.format(durationAgainstSelectedTime)}.`
			: `Od mé přednášky na FrontKonu uplynulo ${durationFormat.format(durationAgainstSelectedTime)}.`;
};

const updateCurrentTime = () => {
	currentTime = new Date();
	rerender();
};

const updateDurationFormat = () => {
	const options = { style: getSelectedArrayItem(styleElement, styles) };
	if (numberingSystemElement.value !== "") {
		options.numberingSystem = getSelectedArrayItem(numberingSystemElement, numberingSystems);
	}

	durationFormat = new Intl.DurationFormat(getSelectedArrayItem(localeElement, locales), options);

	rerender();
};

const updateSelectedTime = () => {
	selectedTime = new Date(selectedTimeInput.value);
	rerender();
};

localeElement = document.getElementById("locale");
styleElement = document.getElementById("style");
numberingSystemElement = document.getElementById("numbering-system");
[localeElement, styleElement, numberingSystemElement].forEach((element) => {
	element.addEventListener("change", updateDurationFormat);
});
selectedTimeInput = document.getElementById("selected-time-input");
currentTimeDurationElement = document.getElementById("current-time-duration");
selectedTimeDurationElement = document.getElementById("selected-time-duration");
selectedTimeInput.addEventListener("change", updateSelectedTime);

populateFormElements();
updateDurationFormat();
setInterval(updateCurrentTime, 200);
