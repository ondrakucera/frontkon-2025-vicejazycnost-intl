"use strict";

import { getSelectedArrayItem, populateSelect } from "./common.js";
import { populateLocaleElement } from "./Locale-common.js";

const csCzLocaleCode = "cs-CZ";
const enUsLocaleCode = "en-US";

const localeStrings = [csCzLocaleCode, enUsLocaleCode];
const locales = localeStrings.map((localeString) => new Intl.Locale(localeString));

const titles = {
	[csCzLocaleCode]: "O pejskovi a kočičce, jak si myli podlahu",
	[enUsLocaleCode]: "Moby Dick; Or, The Whale",
};

const texts = {
	[csCzLocaleCode]:
		"To bylo tenkrát, když pejsek a kočička ještě spolu hospodařili; měli u lesa svůj malý domeček a tam spolu bydleli a chtěli všechno dělat tak, jak to dělají velcí lidé. Ale oni to vždycky tak neuměli, protože mají malé a nešikovné tlapičky a na těch tlapičkách nemají prsty, jako má člověk, jenom takové malé polštářky a na nich drápky. A tak nemohli dělat všechno tak, jak to dělají lidé, a do školy nechodili, protože škola není pro zvířátka, ba ne, to ne! Co myslíte? Ta je jen pro děti!",
	[enUsLocaleCode]:
		"Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.",
};

/** @type {("sentence"|"word"|"grapheme")[]} */
const granularities = ["sentence", "word", "grapheme"];

/** @type {Intl.Segmenter} */
let segmenter;

/** @type {HTMLSelectElement} */
let localeElement, granularityElement;
/** @type {HTMLElement} */
let titleElement, segmentsElement;

const populateFormElements = () => {
	populateLocaleElement(localeElement, locales);
	populateSelect(granularityElement, granularities);
};

const updateSegmenter = () => {
	segmenter = new Intl.Segmenter(getSelectedArrayItem(localeElement, locales), {
		granularity: getSelectedArrayItem(granularityElement, granularities),
	});

	rerender();
};

const rerender = () => {
	const localeString = getSelectedArrayItem(localeElement, localeStrings);

	titleElement.textContent = titles[localeString];

	const segments = Array.from(segmenter.segment(texts[localeString]), (segmentData) => segmentData.segment);
	segmentsElement.innerHTML = segments.map((segment) => `<li>${segment}</li>`).join("");
};

localeElement = document.getElementById("locale");
granularityElement = document.getElementById("granularity");
[localeElement, granularityElement].forEach((element) => {
	element.addEventListener("change", updateSegmenter);
});
titleElement = document.getElementById("title");
segmentsElement = document.getElementById("segments");

populateFormElements();
updateSegmenter();
