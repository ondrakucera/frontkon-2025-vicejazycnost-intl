"use strict";

import { speakers } from "./Collator-common.js";
import { getSelectedArrayItem, populateSelect } from "./common.js";
import { locales, populateLocaleElement } from "./Locale-common.js";

const collations = Intl.supportedValuesOf("collation");

/** @type {Intl.Collator} */
let collator;

/** @type {HTMLSelectElement} */
let localeElement, collationElement;
/** @type {HTMLElement} */
let speakersElement;

const populateFormElements = () => {
	populateLocaleElement(localeElement, locales);
	populateSelect(collationElement, collations, true);
};

const updateCollator = () => {
	const options = {};
	if (collationElement.value !== "") {
		options.collation = getSelectedArrayItem(collationElement, collations);
	}

	collator = new Intl.Collator(getSelectedArrayItem(localeElement, locales), options);

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
