"use strict";

import { getSelectedArrayItem, populateSelect } from "./common.js";
import { populateLocaleElement } from "./Locale-common.js";

const csCzLocaleCode = "cs-CZ";
const enUsLocaleCode = "en-US";
const deDeLocaleCode = "de-DE";
const esEsLocaleCode = "es-ES";

const localeStrings = [csCzLocaleCode, enUsLocaleCode, deDeLocaleCode, esEsLocaleCode];
const locales = localeStrings.map((localeString) => new Intl.Locale(localeString));

const ordinalRules = {
	[csCzLocaleCode]: {
		other: ".",
	},
	[enUsLocaleCode]: {
		one: "st",
		two: "nd",
		few: "rd",
		other: "th",
	},
	[deDeLocaleCode]: {
		other: ".",
	},
	[esEsLocaleCode]: {
		other: ".",
	},
};
const catCardinalRules = {
	[csCzLocaleCode]: {
		one: "kočka",
		few: "kočky",
		other: "koček",
	},
	[enUsLocaleCode]: {
		one: "cat",
		other: "cats",
	},
	[deDeLocaleCode]: {
		one: "Katze",
		other: "Katzen",
	},
	[esEsLocaleCode]: {
		one: "gato",
		other: "gatos",
	},
};
const numbers = [0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 20, 21, 22, 23, 24];

/** @type {("cardinal"|"ordinal")[]} */
const types = ["cardinal", "ordinal"];

/** @type {Intl.PluralRules} */
let pluralRules;
/** @type {"cardinal"|"ordinal"} */
let type;

/** @type {HTMLSelectElement} */
let localeElement, typeElement;
/** @type {HTMLElement} */
let catsElement;

const populateFormElements = () => {
	populateLocaleElement(localeElement, locales);
	populateSelect(typeElement, types);
};

const updatePluralRules = () => {
	type = getSelectedArrayItem(typeElement, types);
	pluralRules = new Intl.PluralRules(getSelectedArrayItem(localeElement, locales), { type });

	rerender();
};

const rerender = () => {
	if (type === "cardinal") {
		catsElement.innerHTML = numbers
			.map((number) => {
				const localeString = getSelectedArrayItem(localeElement, localeStrings);
				return `<li>${number} ${catCardinalRules[localeString][pluralRules.select(number)]}</li>`;
			})
			.join("");
	} else {
		catsElement.innerHTML = numbers
			.map((number) => {
				const localeString = getSelectedArrayItem(localeElement, localeStrings);
				return `<li>${number}${ordinalRules[localeString][pluralRules.select(number)]} ${catCardinalRules[localeString].one}</li>`;
			})
			.join("");
	}
};

localeElement = document.getElementById("locale");
typeElement = document.getElementById("type");
[localeElement, typeElement].forEach((element) => {
	element.addEventListener("change", updatePluralRules);
});
catsElement = document.getElementById("cats");

populateFormElements();
updatePluralRules();
