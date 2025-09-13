"use strict";

import { getSelectedArrayItem, populateSelect } from "./common.js";
import { locales, populateLocaleElement } from "./Locale-common.js";

const convertPrice = (priceInCzk, targetCurrency) => {
	return priceInCzk / exchangeRates[targetCurrency];
};

const minimumIntegerDigitsList = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(String);
const minimumFractionDigitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(String);
const maximumFractionDigitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(String);
const minimumSignificantDigitsList = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(String);
const maximumSignificantDigitsList = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(String);
/** Exchange rates for CZK */
const exchangeRates = {
	CZK: 1,
	EUR: 24.315,
	USD: 20.749,
	AUD: 13.779,
	CAD: 14.983,
	CNY: 2.913,
	DKK: 3.257,
	JPY: 0.14028,
	MXN: 1.123,
	NOK: 2.1,
	PLN: 5.712,
	CHF: 26.016,
	GBP: 28.1,
};
const currencyDisplays = ["symbol", "code", "narrowSymbol", "name"];
const unitDisplays = ["short", "narrow", "long"];

/** @type {string} */
let currency;
const laphroaig30yoPrice = 23074.935; // in CZK
const governmentBudget2024Balance = -271.4 * 10 ** 9; // in CZK
const speedOfLight = 299792458; // in m/s
/** @type {Intl.NumberFormat} */
let numberFormat, currencyNumberFormat, unitNumberFormat;

/** @type {HTMLSelectElement} */
let localeElement,
	minimumIntegerDigitsElement,
	minimumFractionDigitsElement,
	maximumFractionDigitsElement,
	minimumSignificantDigitsElement,
	maximumSignificantDigitsElement,
	currencyElement,
	currencyDisplayElement,
	unitDisplayElement;
/** @type {HTMLElement} */
let piElement, laphroaig30yoPriceElement, governmentBudget2024BalanceElement, speedOfLightElement;

const populateFormElements = () => {
	populateLocaleElement(localeElement, locales);
	populateSelect(minimumIntegerDigitsElement, minimumIntegerDigitsList, true);
	populateSelect(minimumFractionDigitsElement, minimumFractionDigitsList, true);
	populateSelect(maximumFractionDigitsElement, maximumFractionDigitsList, true);
	populateSelect(minimumSignificantDigitsElement, minimumSignificantDigitsList, true);
	populateSelect(maximumSignificantDigitsElement, maximumSignificantDigitsList, true);
	populateSelect(currencyElement, Object.keys(exchangeRates));
	populateSelect(currencyDisplayElement, currencyDisplays);
	populateSelect(unitDisplayElement, unitDisplays);
};

const updateNumberFormats = () => {
	const commonOptions = {};
	if (minimumIntegerDigitsElement.value !== "") {
		commonOptions.minimumIntegerDigits = Number(
			getSelectedArrayItem(minimumIntegerDigitsElement, minimumIntegerDigitsList),
		);
	}
	if (minimumFractionDigitsElement.value !== "") {
		commonOptions.minimumFractionDigits = Number(
			getSelectedArrayItem(minimumFractionDigitsElement, minimumFractionDigitsList),
		);
	}
	if (maximumFractionDigitsElement.value !== "") {
		commonOptions.maximumFractionDigits = Number(
			getSelectedArrayItem(maximumFractionDigitsElement, maximumFractionDigitsList),
		);
	}
	if (minimumSignificantDigitsElement.value !== "") {
		commonOptions.minimumSignificantDigits = Number(
			getSelectedArrayItem(minimumSignificantDigitsElement, minimumSignificantDigitsList),
		);
	}
	if (maximumSignificantDigitsElement.value !== "") {
		commonOptions.maximumSignificantDigits = Number(
			getSelectedArrayItem(maximumSignificantDigitsElement, maximumSignificantDigitsList),
		);
	}

	currency = getSelectedArrayItem(currencyElement, Object.keys(exchangeRates));

	const currencyOptions = {
		...commonOptions,
		style: "currency",
		currency,
		currencyDisplay: getSelectedArrayItem(currencyDisplayElement, currencyDisplays),
	};

	const unitOptions = {
		...commonOptions,
		style: "unit",
		unit: "meter-per-second",
		unitDisplay: getSelectedArrayItem(unitDisplayElement, unitDisplays),
	};

	numberFormat = new Intl.NumberFormat(getSelectedArrayItem(localeElement, locales), { ...commonOptions });
	currencyNumberFormat = new Intl.NumberFormat(getSelectedArrayItem(localeElement, locales), currencyOptions);
	unitNumberFormat = new Intl.NumberFormat(getSelectedArrayItem(localeElement, locales), unitOptions);

	rerender();
};

const rerender = () => {
	piElement.textContent = numberFormat.format(Math.PI);
	laphroaig30yoPriceElement.textContent = currencyNumberFormat.format(convertPrice(laphroaig30yoPrice, currency));
	governmentBudget2024BalanceElement.textContent = currencyNumberFormat.format(
		convertPrice(governmentBudget2024Balance, currency),
	);
	speedOfLightElement.textContent = unitNumberFormat.format(speedOfLight);
};

localeElement = document.getElementById("locale");
minimumIntegerDigitsElement = document.getElementById("minimum-integer-digits");
minimumFractionDigitsElement = document.getElementById("minimum-fraction-digits");
maximumFractionDigitsElement = document.getElementById("maximum-fraction-digits");
minimumSignificantDigitsElement = document.getElementById("minimum-significant-digits");
maximumSignificantDigitsElement = document.getElementById("maximum-significant-digits");
currencyElement = document.getElementById("currency");
currencyDisplayElement = document.getElementById("currency-display");
unitDisplayElement = document.getElementById("unit-display");
[
	localeElement,
	minimumIntegerDigitsElement,
	minimumFractionDigitsElement,
	maximumFractionDigitsElement,
	minimumSignificantDigitsElement,
	maximumSignificantDigitsElement,
	currencyElement,
	currencyDisplayElement,
	unitDisplayElement,
].forEach((element) => {
	element.addEventListener("change", updateNumberFormats);
});

piElement = document.getElementById("pi");
laphroaig30yoPriceElement = document.getElementById("laphroaig-30yo-price");
governmentBudget2024BalanceElement = document.getElementById("government-budget-2024-balance");
speedOfLightElement = document.getElementById("speed-of-light");

populateFormElements();
updateNumberFormats();
