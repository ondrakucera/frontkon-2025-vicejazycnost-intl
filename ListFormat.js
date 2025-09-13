"use strict";

import { getSelectedArrayItem, populateSelect } from "./common.js";
import { locales, populateLocaleElement } from "./Locale-common.js";

const lists = [
	["Romeo", "Julie"],
	["Kašpar", "Melichar", "Baltazar"],
	["Athos", "Porthos", "Aramis", "d'Artagnan"],
	["Scary", "Sporty", "Baby", "Ginger", "Posh"],
	["Rachel", "Monica", "Phoebe", "Joey", "Chandler", "Ross"],
	["Chris", "Vin", "Chico", "Bernardo", "Lee", "Harry", "Britt"],
];

/** @type {("conjunction"|"disjunction"|"unit")[]} */
const types = ["conjunction", "disjunction", "unit"];
/** @type {("long"|"short"|"narrow")[]} */
const styles = ["long", "short", "narrow"];

/** @type {Intl.ListFormat} */
let listFormat;

/** @type {HTMLSelectElement} */
let localeElement, typeElement, styleElement;
/** @type {HTMLElement} */
let listsElement;

const populateFormElements = () => {
	populateLocaleElement(localeElement, locales);
	populateSelect(typeElement, types);
	populateSelect(styleElement, styles);
};

const updateListFormat = () => {
	listFormat = new Intl.ListFormat(getSelectedArrayItem(localeElement, locales), {
		type: getSelectedArrayItem(typeElement, types),
		style: getSelectedArrayItem(styleElement, styles),
	});

	rerender();
};

const rerender = () => {
	listsElement.innerHTML = lists.map((list) => `<li>${listFormat.format(list)}</li>`).join("");
};

localeElement = document.getElementById("locale");
typeElement = document.getElementById("type");
styleElement = document.getElementById("style");
[localeElement, typeElement, styleElement].forEach((element) => {
	element.addEventListener("change", updateListFormat);
});
listsElement = document.getElementById("lists");

populateFormElements();
updateListFormat();
