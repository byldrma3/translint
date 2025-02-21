type LanguageRecord = Record<string, object>;
export declare const TransLint: (languages: LanguageRecord) => {
    result: {
        language: string;
        keys: string[];
    }[] | null;
    status: boolean;
};
export {};
