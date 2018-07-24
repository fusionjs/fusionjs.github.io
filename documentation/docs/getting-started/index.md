---
title: Getting started
path: /getting-started/
---

# Getting started

Fusion.js is a web application framework for building high quality universal applications. It provides a modular architecture with a strong focus on testability and maintainability.

Here are the features you'll find in Fusion.js:

- server side rendering and async rendering
- ES2017 and JSX support out of the box
- hot module reloading in development mode
- bundle splitting
- universal rendering (run the same code in the server and the browser)
- server-side development via Koa.js
- plugin-based architecture (so you only include what you need in your browser bundles)
- a curated set of plugins for data fetching, styling, etc. maintained by the Fusion.js team
- plugins for error logging, security, etc.
- bundle analysis tooling

If you want to know how Fusion.js compares to similar projects, see the [framework comparison page](/docs/getting-started/framework-comparison).

---

### Hello world

To create a new Fusion.js application we recommend using [yarn create](https://yarnpkg.com/lang/en/docs/cli/create/). In a terminal, run the following:

```
yarn create fusion-app my-fusion-app
```

Fusion expects the entry file to be at `src/main.js`. There we can specify what rendering library we want to use. For convenience, the `fusion-react` package provides an entry-point application class that is already configured to work with React. Let's use that:

```js
// src/main.js
import App from 'fusion-react';
```

The `App` class constructor takes a React element. This is the root element of the application:

```js
new App(<div>Hello world</div>);
```

Now that we've configured our application, we just need to export a function that returns it:

```js
// src/main.js
import App from 'fusion-react';
import React from 'react';

export default () => {
  return new App(<div>Hello world</div>);
};
```

To run the application, run this command from your CLI:

```sh
yarn run dev
```

The application will be available at `http://localhost:3000` and will render `Hello world`.

Try changing the text to see hot reloading in action.

While the Fusion.js CLI takes care of developer productivity concerns such as Babel configuration, build-time orchestration and hot module reloading, the Fusion.js runtime does very little. This ensures that the baseline build of a Fusion.js app is lean and flexible.

However, apps can gain more functionality via plugins. In the next section, we'll look at how to use a plugin.

---

### Styling

The basic Fusion.js boilerplate comes with [Styletron](https://github.com/rtsao/styletron) support installed. This is done via a plugin registration, which looks like this in `src/main.js`:

```js
// src/main.js
import App from 'fusion-react';
import Styletron from 'fusion-plugin-styletron-react';
import React from 'react';

export default () => {
  const app = new App(<div>Hello world</div>);

  app.register(Styletron);

  return app;
};
```

Now, let's move our `<div>` element to a separate file called `src/components/root.js` and replace the div with a styled one:

```js
// src/components/root.js
import React from 'react';
import {styled} from 'fusion-plugin-styletron-react';

const Panel = styled('div', {background: 'silver'});

export default <Panel>Hello</Panel>;

// src/main.js
import App from 'fusion-react';
import Styletron from 'fusion-plugin-styletron-react';

import root from './components/root';

export default () => {
  const app = new App(root);

  app.register(Styletron);

  return app;
}
```

The application in your browser should automatically reload to display the silver background.

---

### Assets

Use the virtual module `assetUrl` for other asset types, such as images.

```js
// src/components/root.js
import React from 'react';
import {styled} from 'fusion-plugin-styletron-react';
import {assetUrl} from 'fusion-core';

const Panel = styled('div', {background: 'silver'});

export default (
  <Panel>
    <img src={assetUrl('./my-image.gif')} />
  </Panel>
);
```

Note that the argument to `assetUrl` needs to be a compile-time static string literal.

---

### Example applications

We have a list of Fusion.js example applications at on the [getting started page](/docs/getting-started/create-a-project/#example-fusionjs-projects). There you can also find CLI tools to generate new Fusion.js applications and plugins.

### Create a new web application

When you're ready to start on a new web project, run through these steps:

- [Create a project](/docs/getting-started/create-a-project)
- [Run your project](/docs/getting-started/run-your-project)

---

### Next steps

Here are some more in-depth sections covering various aspects of Fusion.js:

#### Core concepts

- [Universal rendering](/docs/guides/universal-rendering)
- [Creating a plugin](/docs/guides/creating-a-plugin)
  - [Tokens](/docs/guides/creating-a-plugin/tokens)
  - [Dependencies](/docs/guides/creating-a-plugin/dependencies)
  - [Creating endpoints](/docs/guides/creating-a-plugin/creating-endpoints)
  - [Creating providers](/docs/guides/creating-a-plugin/creating-providers)
  - [Modifying the HTML template](/docs/guides/creating-a-plugin/modifying-html-template)

#### Plugins

Check out the links below to help you get familiar with other useful plugins that are provided by the Fusion.js team:

- [Styletron](https://github.com/fusionjs/fusion-plugin-styletron-react)
- [React Router](https://github.com/fusionjs/fusion-plugin-react-router)
- [RPC/Redux](https://github.com/fusionjs/fusion-plugin-rpc-redux-react)
- [I18n](https://github.com/fusionjs/fusion-plugin-i18n-react)
- [Error handling](https://github.com/fusionjs/fusion-plugin-error-handling)
- [Logging](https://github.com/fusionjs/fusion-plugin-universal-logger)
