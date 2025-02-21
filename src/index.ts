import _ from 'lodash'

type FlattenedTranslations = Record<string, string>

type MissingTranslations = Record<string, { language: string; keys: string[] }>

type LanguageRecord = Record<string, object>

const flatLangs = (obj: object, prefix = ''): FlattenedTranslations => {
    return _.transform(obj, (result: FlattenedTranslations, value, key) => {
        const fullKey = prefix ? `${prefix}.${key}` : key

        if (_.isObject(value) && !_.isArray(value))
            return _.assign(result, flatLangs(value, fullKey))

        result[fullKey] = value as string
    })
}

export const TransLint = (languages: LanguageRecord) => {
    const flattenedLanguages = Object.keys(languages).reduce(
        (acc, lang) => {
            acc[lang] = flatLangs(languages[lang])

            return acc
        },
        {} as Record<string, FlattenedTranslations>,
    )

    const allKeys = _.union(
        ...Object.values(flattenedLanguages).map(Object.keys),
    )

    const missingTranslations: MissingTranslations = {}

    for (const lang in flattenedLanguages) {
        const keys = Object.keys(flattenedLanguages[lang])
        const missingKeys = allKeys.filter(key => !keys.includes(key))

        if (missingKeys.length > 0) {
            missingTranslations[lang] = {
                language: lang,
                keys: missingKeys,
            }
        }
    }

    const status = Object.keys(missingTranslations).length === 0

    return {
        result: !status ? Object.values(missingTranslations) : null,
        status: status,
    }
}
