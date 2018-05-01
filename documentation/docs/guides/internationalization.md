---
title: Internationalization
path: /Internationalization/
---

# Internationalization

### Translations

The Fusion.js applications can use the [fusion-plugin-i18n-react](https://github.com/fusionjs/fusion-plugin-i18n-react) plugin for translations.

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

There are many libraries that offer i18n support for dates/time: [moment.js](https://momentjs.com/), [date-fns](https://date-fns.org/) and [globalize.js](https://github.com/globalizejs/globalize) are popular ones.

Supporting a large number of locales can have a significant impact on bundle size if formatting for a large number of locales happens client-side. We recommend formatting dates server-side when fetching data and avoid formatting data when rendering date/times in the React layer.

Avoid parsing formatted dates. Date parsing is extremely bug-prone in native Javascript and libraries alike because they all fall back to undocumented browser-specific semantics when strings don't conform to the [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601). It's also often unreliable due to lack of timezone information. Instead of parsing dates that have been formatted, use timestamps to get fast and reliable serialization/deserialization and robust `Date` object reconstruction.

---

### Numbers and currency

The [globalize.js](https://github.com/globalizejs/globalize) library is commonly used to format numbers and currency.

Supporting a large number of locales can have a significant impact on bundle size if formatting for a large number of locales happens client-side. We recommend formatting numbers and currency when fetching data and avoid formatting data when rendering date/times in the React layer.
