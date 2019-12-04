---
title: Overview
path: /overview/
---

# Overview

> **fu·sion** — *noun*
>
> The process or result of joining two or more things together to form a single entity.

Fusion.js, Uber’s open source universal web framework, represents the fusion of the client and the server. We built Fusion.js from the ground up to provide out-of-the-box support for features like universal rendering, static typing, and code splitting, and to reflect today’s best practices in web development.

## Getting started

If you are new to Fusion.js, [Core Concepts](/docs/core-concepts) and the [Learning Fusion.js Tutorial](/docs/learning-fusionjs-tutorial) are a great jumping off point to learn what Fusion.js is and to get some hands on experience.

Once you are more familiar with the framework, [Recipes](/docs/recipes) details how to accomplish common tasks related to web development in Fusion.js and [Testing](/docs/testing) dives into the utilities and libraries that Fusion.js provides as well as details general strategies and tips on debugging.

[References](/docs/references) dives deeper into specific parts of Fusion.js and the [API docs](/api/fusion-core) is a great way to learn all about the many plugins in the Fusion.js ecosystem.

## What is Fusion.js?

#### Extensible

Fusion.js’s plugin-based architecture addresses the challenge of building modern web applications within an ever-changing landscape. Because plugins are self-contained entities with their own set of dependencies, APIs, and middleware, application code is nicely encapsulated, making it easy to fix bugs, add new features, and upgrade services.

#### Universal / Isomorphic

Because Fusion.js applications are universal, which means that apps have a single entry point, all code from React components to middlewares in Fusion.js plugins by default runs on both the server and browser. This means that your code can be reused across the server and browser, and if needed, you can easily separate out business logic with `__NODE__` or `__BROWSER__` variables.

```js
const app = new App();

// This plugin is universal and works across both environments
app.register(LoggingPlugin);

// These plugins ONLY work on the server
if (__NODE__) {
  app.register(FileSystemPlugin);
}

// These plugins ONLY work on the browser
if (__BROWSER__) {
  app.register(BrowserApiPlugin);
}
```

With [universal rendering](/docs/references/universal-rendering), your applications will benefit from performance gains like faster initial page load and reduced bandwidth consumption. You also have the flexibility to define what renders on the server and browser with [code splitting](/docs/references/js-bundle-splitting).

#### Lightweight

We built Fusion.js to be a lightweight but high-performing system:

- [JS bundle splitting](/docs/references/js-bundle-splitting) allows you to break down large applications into smaller parts to be loaded as necessary; in addition,  translations, asset URLs and experiments are split along with each new bundle, resulting in minimal HTML page size and fast page load speeds.
- Brotli compression is turned on by default, resulting in 15-20% improvement in speed compared to a typical Webpack setup.
- Fusion.js also supports separate JS bundles for modern vs. legacy browsers, so apps only compile to ES5 for old browsers. This keeps modern browser JS bundles significantly smaller.

#### Testable

To counteract the extensive mocking required to test applications in Express, Fusion.js plugins leverage dependency injection, meaning they can expose well-defined APIs as services to other plugins, and a plugin’s dependencies can easily be mocked during tests. This also ensures that dependencies are type safe with support for [Flow](https://flow.org/). Built-in Fusion.js simulation, snapshot, and integration testing provide further support to help you write quality apps.

```js
test('example test', async t => {
  const app = await main();
  app.register(LoggerToken, MockLogger);

  // Continue with test
});
```

#### Modern build system out-of-the-box

Fusion.js comes with support for:

- A ready-to-use testing environment with [Jest](https://jestjs.io/), [Enzyme](https://github.com/airbnb/enzyme), [Puppeteer](https://github.com/GoogleChrome/puppeteer), and integration test utilities
- Server-rendering of React components, code splitting, and hot module reloading
- Automatic tree-shaking support on universal code to remove unused lines
