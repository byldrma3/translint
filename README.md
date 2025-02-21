# TransLint

A lightweight utility to detect missing translation keys across multiple language files.

## Features

- Flattens nested translation objects
- Compares translation keys across all languages
- Identifies missing translations for each language
- Returns a clear status report

## Installation

```bash
npm install @byldrma3/translint
# or
yarn add @byldrma3/translint
```

## Usage

```typescript
import { TransLint } from '@byldrma3/translint';

const languages = {
  en: {
    common: {
      hello: 'Hello',
      welcome: 'Welcome'
    }
  },
  fr: {
    common: {
      hello: 'Bonjour'
      // 'welcome' key is missing
    }
  }
};

const result = TransLint(languages);
console.log(result);
// Output:
// {
//   result: [
//     {
//       language: 'fr',
//       keys: ['common.welcome']
//     }
//   ],
//   status: false
// }
```

## Return Value

- `result`: Array of missing translations per language (null if all translations are complete)
- `status`: Boolean indicating if all translations are complete

## License

MIT © [MIT license](https://github.com/byldrma3/translint/blob/main/LICENSE)