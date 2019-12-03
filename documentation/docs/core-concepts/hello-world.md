---
title: Hello World
path: /hello-world/
---

# Hello World

A simple React app using Fusion.js would look something like this:

```js
import App from 'fusion-react';
import React from 'react';

export default async function start() {
  const root = <div>Hello World</div>
  const app = new App(root);
  return app;
}
```

Running this code (`fusion dev`) would produce the string "Hello World" on a plain white background with no styling.

While at face value this code obviously isn't doing much, there is a lot happening behind the scenes. Simply running this code will:

* render the "Hello World" string on the server first, then use [React API's](https://reactjs.org/docs/react-dom.html#hydrate) to synchronize with React on the client
* optimize all client and vendor code into separate bundles to ensure fast delivery of assets to the browser
* setup HMR for local development

While this looks similar to a typical React example, one thing to emphasize is that **all written code (with some exceptions) will run on both the server and the client**. This is universal rendering at work and it is central to how Fusion.js works.

In the [next section](/docs/core-concepts/basic-principles) we'll cover the basic principles of Fusion.js.
