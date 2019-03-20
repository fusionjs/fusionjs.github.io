# CSS Modules

## Setup

```
yarn add --dev gulp gulp-postcss autoprefixer cssnano postcss-modules gulp-concat gulp-remember
```

```js
// gulpfile.js

const fs = require("fs");
const path = require("path");
const { src, dest, task, watch, lastRun, parallel } = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const modules = require("postcss-modules");
const concat = require("gulp-concat");
const remember = require("gulp-remember");

function css() {
  return src(["**.css"], { sourcemaps: true, since: lastRun(css) })
    .pipe(postcss([modules(), autoprefixer()]))
    .pipe(remember("css"))
    .pipe(concat("styles.css"))
    .pipe(postcss([cssnano()]))
    .pipe(dest("src/static", { sourcemaps: true }));
}

function watchCss() {
  const watcher = watch("**.css", css);
  watcher.on("change", file => {
    remember.forget("css", path.join(process.cwd(), file));
  });
  watcher.on("unlink", file => {
    fs.unlink(`${file}.json`, err => {});
  });
}

exports.build = css;
exports.default = parallel(css, watchCss);

```

Gulp usage:

```
# To build and watch rebuild CSS
gulp

# To just build CSS
gulp build
```


### npm scripts

**Update your build command**

```json
{
  "scripts": {
    "build-production": "gulp build && fusion build --production"
  }
}
```

**Updating your dev command**
```
yarn add concurrently --dev
```

```json
{
  "scripts": {
    "dev": "concurrently gulp 'fusion dev'"
  }
}
```

## Usage

```
src/
├── components/
│   ├── foo.js
│   ├── foo.css
│   └── foo.css.json (generated)
└── static/
    └── styles.css (generated)
```

### Using CSS modules in components

```css
// foo.css

.bar {
  color: red;
}

.baz {
  color: green;
}
```

```jsx
// foo.js

import styles from "./foo.css.json";

export const Foo = () => {
  return (
    <div className={styles.bar}>
      <div className={styles.baz} />
    </div>
  );
};
```

### Adding bundled CSS to the page

```jsx
// In root component

import { assetUrl } from "fusion-core";
import { Helmet } from "fusion-plugin-react-helmet-async";

const css = assetUrl("../static/styles.css");

const app = (
  <App>
    <Helmet>
      <link rel="stylesheet" href={css} />
    </Helmet>
  </App>
);
```
