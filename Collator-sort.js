"use strict";

import { speakers } from "./Collator-common.js";
import { locales } from "./Locale-common.js";

const collations = Intl.supportedValuesOf("collation");

/** @type {Intl.Collator} */
let collator;

/** @type {HTMLSelectElement} */
let localeElement, collationElement;
/** @type {HTMLElement} */
let speakersElement;

const populateFormElements = () => {
	const displayNames = new Intl.DisplayNames("cs", { type: "language" });
	localeElement.innerHTML = locales
		.map((locale, index) => `<option value="${index}">${displayNames.of(locales[index])}</option>`)
		.join("");
	collationElement.innerHTML =
		"<option></option>" +
		collations.map((collation, index) => `<option value="${index}">${collation}</option>`).join("");
};

const updateCollator = () => {
	const options = {};
	if (collationElement.value !== "") {
		options.collation = collations[Number(collationElement.value)];
	}

	collator = new Intl.Collator(locales[Number(localeElement.value)], options);

	rerender();
};

const rerender = () => {
	speakersElement.innerHTML = speakers
		.sort(collator.compare)
		.map((speaker) => `<li>${speaker}</li>`)
		.join("");
};

localeElement = document.getElementById("locale");
collationElement = document.getElementById("collation");
[localeElement, collationElement].forEach((element) => element.addEventListener("change", updateCollator));
speakersElement = document.getElementById("speakers");

populateFormElements();
updateCollator();
