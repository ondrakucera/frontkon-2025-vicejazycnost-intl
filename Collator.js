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
const collations = Intl.supportedValuesOf("collation");
const speakers = [
	"Zakharchenko",
	"Ricciuti",
	"Moerkerke",
	"Matuška",
	"Willis",
	"Kulhánek",
	"Navrátil",
	"Velíšek",
	"Hrubý",
	"Chylík",
	"Hrstka",
	"Ungr",
	"Špaček",
	"Pustelník",
	"Malík",
	"Staněk",
	"Randák",
	"Kučera",
	"Lorenz",
	"Macek",
	"Zatloukalová",
	"Trumm",
	"Svěrák",
	"Černý",
	"Čongrády",
	"Krejčík",
	"Seitler",
	"Trčková",
];

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

const updateSpeakers = () => {
	const options = {};
	if (collationElement.value !== "") {
		options.collation = collations[Number(collationElement.value)];
	}

	collator = new Intl.Collator(locales[Number(localeElement.value)], options);

	speakersElement.innerHTML = speakers
		.sort(collator.compare)
		.map((speaker) => `<li>${speaker}</li>`)
		.join("");
};

localeElement = document.getElementById("locale");
collationElement = document.getElementById("collation");
[localeElement, collationElement].forEach((element) => element.addEventListener("change", updateSpeakers));
speakersElement = document.getElementById("speakers");

populateFormElements();
updateSpeakers();
