# SVG React Components

React components can be generated from SVG files using [https://github.com/smooth-code/svgr](https://github.com/smooth-code/svgr).

Suppose you have the following icons:

```
src/
└── icons
    ├── foo.svg
    └── bar.svg
```

Running `npx @svgr/cli -d src/icons src/icons` will generate the corresponding React components:

```
src/
└── icons
    ├── foo.svg
    ├── foo.js
    ├── bar.svg
    └── bar.js
```

These can be imported:

```js
import Foo from "./foo.js";
```
