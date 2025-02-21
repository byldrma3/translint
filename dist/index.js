"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransLint = void 0;
const lodash_1 = __importDefault(require("lodash"));
const flatLangs = (obj, prefix = '') => {
    return lodash_1.default.transform(obj, (result, value, key) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (lodash_1.default.isObject(value) && !lodash_1.default.isArray(value))
            return lodash_1.default.assign(result, flatLangs(value, fullKey));
        result[fullKey] = value;
    });
};
const TransLint = (languages) => {
    const flattenedLanguages = Object.keys(languages).reduce((acc, lang) => {
        acc[lang] = flatLangs(languages[lang]);
        return acc;
    }, {});
    const allKeys = lodash_1.default.union(...Object.values(flattenedLanguages).map(Object.keys));
    const missingTranslations = {};
    for (const lang in flattenedLanguages) {
        const keys = Object.keys(flattenedLanguages[lang]);
        const missingKeys = allKeys.filter(key => !keys.includes(key));
        if (missingKeys.length > 0) {
            missingTranslations[lang] = {
                language: lang,
                keys: missingKeys,
            };
        }
    }
    const status = Object.keys(missingTranslations).length === 0;
    return {
        result: !status ? Object.values(missingTranslations) : null,
        status: status,
    };
};
exports.TransLint = TransLint;
