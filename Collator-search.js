"use strict";

import { speakers } from "./Collator-common.js";
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
	sensitivityElement.innerHTML =
		"<option></option>" +
		sensitivities.map((sensitivity, index) => `<option value="${index}">${sensitivity}</option>`).join("");
};

const updateCollator = (withoutRerendering = false) => {
	const options = { usage: "search" };
	if (sensitivityElement.value !== "") {
		options.sensitivity = sensitivities[Number(sensitivityElement.value)];
	}

	collator = new Intl.Collator(locales[Number(localeElement.value)], options);

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
