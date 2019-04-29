---
title: Styling
path: /styling/
---

# Styling components

It's possible to use any CSS framework or library with Fusion.js. Below we provide a guide for using Styletron, a high-performance atomic CSS library maintained by the Fusion.js team.

* [Custom styling](#custom-styling)
* [3rd party stylesheets](#3rd-party-stylesheets)

---

## Custom styling

For custom styling, we recommend using Styletron (via [`fusion-plugin-styletron-react`](https://github.com/fusionjs/fusion-plugin-styletron-react)). Use Styletron to write styled components that get compiled to atomic CSS for maximum performance.

This plugin automatically sets up SSR, hydration, and context provider boilerplate and re-exports the styling functions from `styletron-react` so you can just focus on styling.

```js
// Be sure to import HOCs from "fusion-plugin-styletron-react"
import {
  styled,
  withStyle,
  withStyleDeep,
  withTransform,
} from 'fusion-plugin-styletron-react';
```

**Note**: Extra features such as LTR-to-RTL might be included in `fusion-plugin-styletron-react`, so it's best to use its exports instead of `styletron-react` directly.

> To read more about Styletron, please refer to the official [Styletron documentation](https://www.styletron.org/).

---

## 3rd party stylesheets

To add 3rd party stylesheets to an app, use the `fusion-plugin-react-helmet-async` plugin.

```js
import React from 'react';
import {Helmet} from 'fusion-plugin-react-helmet-async';

const Root = () => (
  <div>
    <Helmet>
      <link
        rel="stylesheet"
        href={assetUrl('../node_modules/a-library/styles.css')}
      />
    </Helmet>
    <h1>Hello World</h1>
  </div>
);
```
