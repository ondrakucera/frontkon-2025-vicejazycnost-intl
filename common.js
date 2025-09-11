"use strict";

/**
 * @param {Date} date
 * @returns {string}
 */
const dateToDatetimeLocalInputValue = (date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const frontkonTime = new Date("2025-10-01T17:00:00.000+02:00");

/**
 * @template T
 * @param {HTMLSelectElement} selectElement
 * @param {T[]} array
 * @returns {T}
 */
const getSelectedArrayItem = (selectElement, array) => array[Number(selectElement.value)];

/**
 * @param {HTMLSelectElement} selectElement
 * @param {string[]} array
 * @param {boolean} [withEmptyOption]
 */
const populateSelect = (selectElement, array, withEmptyOption = false) => {
	selectElement.innerHTML =
		(withEmptyOption ? "<option></option>" : "") +
		array.map((item, index) => `<option value="${index}">${item}</option>`).join("");
};

export { dateToDatetimeLocalInputValue, frontkonTime, getSelectedArrayItem, populateSelect };
