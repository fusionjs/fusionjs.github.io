---
title: Project structure
path: /project-structure/
---

# Project structure

Here is an example of the file structure for a Fusion.js application.

```yaml
- src
  - components
    - root.js
  - static
  - __tests__
  - plugins
  - redux.js
  - main.js
- translations
```

#### src/main.js

The `src/main.js` is the entry point of a Fusion.js application. This file creates an `app` instance and registers plugins for various features such as css-in-js, data fetching, translations, logging and monitoring, and more.

#### src/components

The root component of your React application lives in `src/components/root.js`.

#### src/redux.js

We recommend using Redux and provide a `src/redux.js` file where you can define a root reducer and import other reducers as you write them.

#### src/static

We recommend placing all of your static assets in the `src/static` folder. They can be referenced in code via the `assetUrl` virtual module:

```js
// src/components/example.js
import {assetUrl} from 'fusion-core';

const image = <img src={assertUrl('../static/test-image.gif')} />;
```

#### src/**tests**

Tests can be located anywhere in a project directory tree inside **tests** directories. Test files that end in .node.js will be run in Node.js and files ending in .browser.js will be run in a headless browser environment (via Jsdom), and universal tests will be run in both.

#### src/plugins

Custom plugins go in the `src/plugins` folder.

#### translations

Put translations in the `translations` folder as JSON files whose names are their respective locales (e.g. `en-US.json`).

Here's an example translation file:

```json
{
  "greeting": "Hello ${name}"
}
```

---

### Next steps

* [Run your project](/docs/getting-started/run-your-project)
