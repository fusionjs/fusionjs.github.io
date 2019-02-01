---
title: Internationalization
path: /Internationalization/
---

# Internationalization

### Translations

Fusion.js applications can use the [fusion-plugin-i18n-react](https://github.com/fusionjs/fusion-plugin-i18n-react) plugin for translations.

The easiest way to add translations to an app is to use the `Translate` React component:

```js
import React from 'react';
import {Translate} from 'fusion-plugin-i18n-react';

export default () => {
  // translates the key "test"
  return <Translate id="test" />;
});
```

If a translation needs to be parameterized, pass an object to the `data` prop:

```js
import React from 'react';
import {Translate} from 'fusion-plugin-i18n-react';

export default () => {
  // translates a key "test" with a value like "hello ${name}"
  return <Translate id="test" data={{name: 'world'}} />;
});
```

**Note**: If translations for a key are not available, the key will be displayed.

---

### Dates and time

It is recommended to use the [date-fns library](https://date-fns.org/) or the native JS [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) API to format dates.

This API is natively supported in most browsers, but for especially old browsers [a polyfill](https://github.com/andyearnshaw/Intl.js/) may be required.

---

### Numbers and currency

It is recommended to use the native JS [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) API to format numbers and currency.

For example:

```js
const formatted = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'JPY' }).format(123456.789);
// => "123.457 ¥"
```

This API is natively supported in most browsers, but for especially old browsers [a polyfill](https://github.com/andyearnshaw/Intl.js/) may be required.
