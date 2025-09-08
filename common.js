"use strict";

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

/**
 * @param {HTMLSelectElement} selectElement
 * @param {string[]} array
 * @returns {string}
 */
const getSelectedArrayItem = (selectElement, array) => array[Number(selectElement.value)];

export { getSelectedArrayItem, populateSelect };
