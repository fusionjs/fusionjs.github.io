---
title: Styling
path: /styling/
---

# Styling components

- [Custom styling](#custom-styling)
- [3rd party stylesheets](#3rd-party-stylesheets)

---

### Custom styling

For custom styling, we recommend using Styletron (via [`fusion-plugin-styletron-react`](https://github.com/fusionjs/fusion-plugin-styletron-react)).

This plugin automatically sets up SSR, hydration, and context provider boilerplate and re-exports the styling functions from `styletron-react` so you can just focus on styling.

```js
// Be sure to import HOCs from "fusion-plugin-styletron-react"
import {
  styled,
  withStyle,
  withStyleDeep,
  withTransform
} from "fusion-plugin-styletron-react";
```

**See the [main README for a thorough guide on using Styletron](https://github.com/rtsao/styletron/tree/v4-beta/packages/styletron-react).**

**Note**: Extra features such as LTR-to-RTL might be included in `fusion-plugin-styletron-react`, so it's best to use its exports instead of `styletron-react` directly.

## `styletron-react` guide

Here's a simple example that creates a styled component:

```js
// src/components/root.js
import react from 'react';
import {styled} from 'fusion-plugin-styletron-react';

const Panel = styled('div', {
  backgroundColor: 'silver',
});

export default <Panel>Hello</Panel>;
```

### Parameterized styled components

You can also have customizable styles by passing a function as the second argument:

```js
// src/components/root.js
import React from 'react';
import {styled} from 'fusion-plugin-styletron-react';

const Panel = styled('div', props => ({
  backgroundColor: props.$bg || 'silver',
}));

export default <Panel $bg="gold">Hello</Panel>;
```

### Styled prop filtering

Styled components automatically pass through all props to their underlying base except those prefixed by `$`, which will be filtered out. Use this namespace for props only used for styling. React will [no longer automatically filter out non-HTML props](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html) so this convention avoids the need for burdensome manual prop filtering.

```jsx
const StyledInput = styled("input", props => ({
  color: props.disabled ? "gray" : "black",
  background: props.$variant === "error" ? "red" : "blue"
}));

<StyledInput disabled={true} $variant="error" />;
```

### Build a style guide

We recommend that you organize your styled components into a style guide to promote code reusability and consistency:

```js
// src/style-guide/panel.js
import React from 'react';
import {styled} from 'fusion-plugin-styletron-react';

export default styled('div', {
  backgroundColor: 'silver',
});

// src/style-guide/button.js
import React from 'react';
import {styled} from 'fusion-plugin-styletron-react';

export default styled('button', {
  backgroundColor: 'silver',
});

// in your app
import Panel from './style-guide/panel';
import Button from './style-guide/button';

export default (
  <Panel>
    <Button>Click here!</Button>
  </Panel>
);
```

### Variants

A variant is pattern for implementing slightly different variations of a base style. Variants are a useful pattern to help codify the purposes of different style variations, and reduce the amount of inconsistencies in a style guide.

Here's an example `Button` with a `danger` and `warning` variants:

```js
// src/style-guide/button.js
import React from 'react';
import {styled} from 'fusion-plugin-styletron-react';

const variants = {
  default: {backgroundColor: 'silver'},
  danger: {backgroundColor: 'red'},
  warning: {backgroundColor: 'yellow'},
}

export default styled('button', ({$variant}) => variants[$variant] || variants.default);

// in your app
import Panel from './style-guide/panel';
import Button from './style-guide/button';

export default (
  <Panel>
    <Button>Cancel</Button>
    <Button $variant="danger">Delete</Button>
  </Panel>
);
```

### Hover styles

Here's how to add styles to the `:hover` pseudo-class:

```js
import React from 'react';
import {styled} from 'fusion-plugin-styletron-react';

export default styled('button', {
  backgroundColor: 'silver',
  ':hover': {
    backgroundColor: 'gold',
  },
});
```

### Media queries

Styletron compiles CSS into atomic classes (i.e. one class per style declaration), which doesn't support media query declaration order in the same way that unoptimized CSS does. One way to get around that is to define mutually exclusive media queries:

```js
import React from 'react';
import {styled} from 'fusion-plugin-styletron-react';

export default styled('button', {
  '@media (max-width: 1199px)': {
    width: '100%',
  },
  '@media (min-width: 1200px)': {
    margin: '10px',
  },
  background: 'silver',
});
```

## Declarative `@keyframes` and `@font-face` rules

Both `@font-face` and `@keyframes` rules can be used declaratively within style objects.

### `@font-face`

If a font face object is used in place of a string for `fontFamily`, a corresponding `@font-face` rule will be automatically generated.

```jsx
const font = {
  src: "..."
};

const Foo = styled("div", {fontFamily: font});

<Foo />;
```

### `@keyframes`

If a keyframes object is used in place of a string for `animationName`, a corresponding `@keyframes` rule will be automatically generated.

```jsx
const animation = {
  from: {color: "red"},
  to: {color: "blue"}
};

const Foo = styled("div", {animationName: animation});

<Foo />;
```

#### Built-in props

#### `$as` for rendering a different element

```jsx
const Foo = styled("div", /* ... */);

<Foo />;
<Foo $as="span" />;
<Foo $as={Link} />;
```

#### `$ref` for setting refs

Use the `$ref` prop to set a React `ref` on the underlying element.

```jsx
const Foo = styled("div", /* ... */);

class Component extends React.Component {
  <Foo
    $ref={c => {
      this.foo = c;
    }}
  />
}
```

---

### 3rd party stylesheets

To add 3rd party stylesheets to an app, use the `fusion-plugin-react-helmet-async` plugin.

```js
import React from 'react';
import {Helmet} from 'fusion-plugin-react-helmet-async';

const Root = () => (
  <div>
    <Helmet>
      <link rel="stylesheet" href={assetUrl('../node_modules/a-library/styles.css')} />
    </Helmet>
    <h1>Hello World</h1>
  </div>
);
```