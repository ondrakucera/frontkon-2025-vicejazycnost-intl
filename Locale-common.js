"use strict";

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

export { locales };
