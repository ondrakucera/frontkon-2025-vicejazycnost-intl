"use strict";

const displayNames = new Intl.DisplayNames("cs", { type: "language" });

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

/**
 * @param {HTMLSelectElement} localeElement
 * @param {Intl.Locale[]} locales
 */
const populateLocaleElement = (localeElement, locales) => {
	localeElement.innerHTML = locales
		.map((locale, index) => `<option value="${index}">${displayNames.of(locales[index])}</option>`)
		.join("");
};

export { locales, populateLocaleElement };
