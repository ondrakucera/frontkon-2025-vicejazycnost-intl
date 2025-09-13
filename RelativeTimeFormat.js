"use strict";

import { getSelectedArrayItem, populateSelect } from "./common.js";
import { locales, populateLocaleElement } from "./Locale-common.js";

/** @type {("long"|"short"|"narrow")[]} */
const styles = ["long", "short", "narrow"];
/** @type {("always"|"auto")[]} */
const numerics = ["always", "auto"];
const counts = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10].map(String);
/** @type {("second"|"minute"|"hour"|"day"|"week"|"month"|"quarter"|"year")[]} */
const units = ["second", "minute", "hour", "day", "week", "month", "quarter", "year"];

/** @type {Intl.RelativeTimeFormat} */
let relativeTimeFormat;
/** @type {number} */
let count;

/** @type {HTMLSelectElement} */
let localeElement, styleElement, numericElement, countElement;
/** @type {HTMLElement} */
let relativeTimesElement;

const populateFormElements = () => {
	populateLocaleElement(localeElement, locales);
	populateSelect(styleElement, styles);
	populateSelect(numericElement, numerics);
	populateSelect(countElement, counts);
};

const updateRelativeTimeFormat = (withoutRerendering = false) => {
	relativeTimeFormat = new Intl.RelativeTimeFormat(getSelectedArrayItem(localeElement, locales), {
		style: getSelectedArrayItem(styleElement, styles),
		numeric: getSelectedArrayItem(numericElement, numerics),
	});

	if (!withoutRerendering) {
		rerender();
	}
};

const updateCount = (withoutRerendering = false) => {
	count = Number(getSelectedArrayItem(countElement, counts));

	if (!withoutRerendering) {
		rerender();
	}
};

const rerender = () => {
	relativeTimesElement.innerHTML = units.map((unit) => `<li>${relativeTimeFormat.format(count, unit)}</li>`).join("");
};

localeElement = document.getElementById("locale");
styleElement = document.getElementById("style");
numericElement = document.getElementById("numeric");
[localeElement, styleElement, numericElement].forEach((element) => {
	element.addEventListener("change", () => updateRelativeTimeFormat());
});
countElement = document.getElementById("count");
countElement.addEventListener("change", () => updateCount());
relativeTimesElement = document.getElementById("relative-times");

populateFormElements();
updateRelativeTimeFormat(true);
updateCount(true);
rerender();
