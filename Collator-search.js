"use strict";

import { speakers } from "./Collator-common.js";
import { getSelectedArrayItem, populateSelect } from "./common.js";
import { locales, populateLocaleElement } from "./Locale-common.js";

const sensitivities = ["base", "accent", "case", "variant"];

/** @type {Intl.Collator} */
let collator;
let speaker = "kucera";

/** @type {HTMLSelectElement} */
let localeElement, sensitivityElement, speakerElement;
/** @type {HTMLElement} */
let speakersElement, speakerYesNoElement;

const populateFormElements = () => {
	populateLocaleElement(localeElement, locales);
	populateSelect(sensitivityElement, sensitivities, true);
};

const updateCollator = (withoutRerendering = false) => {
	const options = { usage: "search" };
	if (sensitivityElement.value !== "") {
		options.sensitivity = getSelectedArrayItem(sensitivityElement, sensitivities);
	}

	collator = new Intl.Collator(getSelectedArrayItem(localeElement, locales), options);

	if (!withoutRerendering) {
		rerender();
	}
};

const updateSpeaker = (withoutRerendering = false) => {
	speaker = speakerElement.value;

	if (!withoutRerendering) {
		rerender();
	}
};

const rerender = () => {
	speakerYesNoElement.innerHTML = speakers.some((speakerItem) => collator.compare(speaker, speakerItem) === 0)
		? "Ano."
		: "Ne.";
};

localeElement = document.getElementById("locale");
sensitivityElement = document.getElementById("sensitivity");
[localeElement, sensitivityElement].forEach((element) => element.addEventListener("change", () => updateCollator()));
speakerElement = document.getElementById("speaker");
speakerElement.value = speaker;
speakerElement.addEventListener("input", () => updateSpeaker());
speakerYesNoElement = document.getElementById("speaker-yes-no");
speakersElement = document.getElementById("speakers");
speakersElement.innerHTML = speakers.map((speaker) => `<li>${speaker}</li>`).join("");

populateFormElements();
updateCollator(true);
updateSpeaker(true);
rerender();
