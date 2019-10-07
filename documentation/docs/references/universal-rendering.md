---
title: Universal rendering
path: /universal-rendering/
---

# Universal rendering

Fusion.js supports universal rendering. Universal rendering means that large parts of the codebase can run on the server (for performing server-side rendering) and on the browser.

In some frameworks, this is only limited to React code. In Fusion.js, the entire application runs in a universal context by default, from React components to middlewares in Fusion.js plugins. This means that plugin registration code only needs to be written once even if it requires server-only or browser-only code (e.g. custom hydration code), and that plugins can activate behavior across the entire lifecycle of an application without the need to configure things in many different parts of the app.

Naturally, you can also write React code once and have that code be automatically server-side rendered as you would expect.

## When is a page server-side rendered

Fusion.js assumes a page requires server-side rendering if the HTTP request has an `Accept` header containing `text/html`. This header value exists when URLs that are requested from a browser address bar, but it does not for programmatic requests such as XHR/fetch or assets (e.g. `<link href="...">`, `<img src="...">`)

A caveat of this approach is that hitting an endpoint from the browser address bar (as one might do during development) will include the header on an endpoint that isn't meant to be server-side rendered, and similarly, hitting a page via `curl` or similar tool without the header will not trigger server-side rendering correctly.

## Server-only / browser-only code

It is sometimes desirable to write server-only code, browser-only code, and at times, development-only code. To enable that, Fusion.js provides the `__NODE__`, `__BROWSER__` and `__DEV__` global flags. These special flags are statically replaced by the compiler with the appropriate boolean value, depending on which bundle the code is compiled for. Then, unused code gets removed via tree shaking and dead code elimination.

To write code that only runs in the server, wrap your code in the appropriate code fence:

```js
if (__NODE__) {
  // server-side code goes here
}
```

To write code that only runs in the browser:

```js
if (__BROWSER__) {
  // client-side code goes here
}
```

We recommend that you only use `__DEV__` to enhance developer experience with regards to error conditions:

```js
// this conditional gets removed from the browser bundle in production, saving a few bytes
if (__DEV__) {
  throw new Error(
    'The `{options}` argument is required. See the documentation at https://the-docs-website/api-docs/the-package'
  );
}
```

You should avoid writing significantly different code branches for different environments since doing so introduces more potential points of failure, and makes it more difficult to reproduce issues with confidence.

We also recommend that you use `__DEV__` and avoid using `process.env.NODE_ENV === 'production'`, since Fusion.js provides better static compilation and eslint support for the former.

## Imports

The ES6 standard specifies that `import`/`export` syntax cannot appear inside of an `if` statement of conditional expressions, but Fusion.js is still able to intelligently eliminate server-side imports from client-side bundles, thanks to tree-shaking.

Consider the example below:

```js
import fs from 'fs';

if (__NODE__) fs.readFileSync('package.json');
```

The compiler removes the `fs.readFileSync()` call from the browser bundle because the `if (__NODE__)` code fence evaluates to `false`, making the code branch unreacheable.

The `import` statement is outside of the code fence, but it is also removed because the compiler infers that it's also dead code, because no code paths ever use `fs` in this file for the browser bundle!

### Server-side side effects in dependencies

On some rare occasions, poorly written server-side packages might incur top-level side-effects. In those cases, the compiler becomes unable to treeshake the misbehaving dependency in the browser bundle, and compilation typically fails due to unpolyfilled server dependencies.

A simple way to avoid this issue is to simply load the module dynamically via a good old CommonJS `require` call.

```js
// before
import foo from 'misbehaving-dependency';

// after
const foo = __NODE__ && require('misbehaving-dependency');
```

Now the code follows the basic dead code elimination rules and the browser bundle will be compiled as expected.

### Aggressive tree shaking

Fusion.js provides a compiler flag to enable aggressive tree shaking to your project that can further save on bundle sizes by pruning out dead code. More information can be found in the following links:

* [`assumeNoImportSideEffects` flag](/api/fusion-cli/docs/fusionrc/#assumenoimportsideeffects)
* [Github PR link](https://github.com/fusionjs/fusion-cli/pull/392)

---

## Linting

Fusion.js provides an `eslint-config-fusion` configuration that issues contextual warnings depending on whether code is server-side or client-side.

```sh
yarn add eslint-config-fusion
```

To enable it, add it to your `.eslintrc.js`:

```js
module.exports = {
  extends: [require.resolve('eslint-config-fusion')],
};
```

Now ESLint will complain if you inadvertedly forget to code-fence:

```js
// we didn't code fence this browser-specific code, so it would also try to run in the server. Thus, eslint complains
window.addEventListener('load', () => {});

// after we code-fence, the eslint warning goes away
if (__BROWSER__) {
  window.addEventListener('load', () => {});
}
```

You can also mark an entire file as server-only or browser-only:

```js
/* eslint-env node */
```

```js
/* eslint-env browser */
```

This pattern is useful if a plugin has vastly different implementations on the server and the browser:

```js
// plugin-entry-point.js
import server from './server';
import client from './client';

export default __NODE__ ? server : client;

// server.js
/* eslint-env node */
export default serverCodeGoesHere;

// client.js
/* eslint-env browser */
export default browserCodeGoesHere;
```

---

## Client-rendered components

Occassionally, you may want specific components to only render client-side. This can be accomplished using `split` with `defer: true`:

```js
import {split} from 'fusion-react';

const ClientRenderedOnly = split({
  defer: true,
  load: () => import('./browser-only-component.js'),
  LoadingComponent: () => <div>SSR placeholder...</div>,
  ErrorComponent: () => <div>Error</div>,
});

<ClientRenderedOnly />;
```

## Disabling server-side rendering

To completely disable SSR, register a custom render function on the `RenderToken` on the server. However,  generally it is preferable to use the `split` HOC to defer rendering of specific components to the client rather than disable SSR completely.

```js
// src/main.js
import {RenderToken} from 'fusion-core';
import App from 'fusion-react';
// ...

if (__NODE__) {
  app.register(RenderToken, () => {
    return '<div id="root"></div>';
  });
}
```



---

## Modifying the HTML template

The HTML template consists of the HTML tag that gets served from the server which contains metadata such as the `<title>` and `<meta>` tags.

The easiest way to edit those tags is via [`fusion-plugin-react-helmet-async`](https://github.com/fusionjs/fusion-plugin-react-helmet-async).

Add the `Helmet` component to your React tree and add HTML elements inside of it to add/modify the respective HTML tag.

```js
import React from 'react';
import {Helmet} from 'fusion-plugin-react-helmet-async';

const Root = () => (
  <div>
    <Helmet>
      <title>Hello World</title>
      <link rel="canonical" href="https://www.fusionjs.com/" />
    </Helmet>
    <h1>Hello World</h1>
  </div>
);
```

### Modifying HTML without React

It's also possible to modify the HTML template of a Fusion.js app by using middleware plugins.

When a page is server-side rendered, the `ctx.template` property in the middleware is an object:

```js
ctx.template = {
  htmlAttrs: {}
  title: '',
  head: [],
  body: []
}
```

To modify the title, use:

```js
app.middleware((ctx, next) => {
  ctx.template.title = 'the new title';
  return next();
});
```

Similarly, to add attributes to the `<html>` tag, use:

```js
app.middleware((ctx, next) => {
  ctx.template.htmlAttrs.lang = 'en-US';
  return next();
});
```

To add arbitrary HTML to `<head>` and `<body>`, however, you must sanitize the HTML to ensure that there's no risk of an XSS attack from unsanitized user data.

To sanitize HTML, use the `html` template tag:

```js
import {html} from 'fusion-core';

app.middleware((ctx, next) => {
  ctx.template.head.push(
    html`<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />`
  );
  return next();
});
```

The `html` template tag sanitizes template string interpolations and return a _safe_ string.

Note that pushing unsanitized strings to either `head` or `body` will result in an error.

### Serialization and deserialization

Sometimes it's useful to share information from the server to the client.

The mechanism to do it is similar to the one above: use the `html` template tag to sanitize the interpolated data.

On the browser, we use `unescape` to get the original data.

```js
import {html, unescape} from 'fusion-core';

app.middleware((ctx, next) => {
  if (__NODE__) {
    const data = {
      /* some data */
    };
    ctx.template.head.push(
      html`<meta id="__MY_DATA__" content="${JSON.stringify(data)}">`
    );
  } else {
    const data = JSON.parse(
      unescape(document.getElementById('__MY_DATA__').content)
    );
  }
  return next();
});
```
