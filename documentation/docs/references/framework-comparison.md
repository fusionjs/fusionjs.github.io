---
title: Framework Comparison
path: /framework-comparison/
---

# Framework comparison

Here is how Fusion.js compares to some popular frameworks and libraries:

## create-react-app

[create-react-app](https://github.com/facebookincubator/create-react-app) is a CLI that scaffolds a React project and configures Webpack, Babel, Eslint, Jest, etc.

#### Similarities

Similar to create-react-app, Fusion.js provides a Webpack/Babel setup.

#### Fusion.js benefits

Fusion.js provides higher level tools like server-side rendering, more powerful code splitting and fully-integrated hot module reloading. Fusion.js also provides a modern HTTP server API through [Koa.js](http://koajs.com/) middleware and a universal plugin system.

Because Fusion.js provides the compilation pipeline, as well as both the server and browser environments, it can automatically apply several optimizations that would otherwise need to be done manually for every application.

## Express

[Express](https://expressjs.com/) is the most popular HTTP server framework for Node.js.

#### Similarities

Both Express and Fusion.js are comprised of middleware and can be used as a Node.js server.

#### Fusion.js benefits

Unlike Express, Fusion.js is built on top of Koa.js middleware, which uses a more modern async/await based middleware architecture and is side-effect free. This gives a better testing and stack trace/debugging experience.

## Next.js

[Next.js](https://github.com/zeit/next.js/) is a framework developed by Zeit.co for building server-rendered React applications.

#### Similarities

Both Next.js and Fusion.js are designed for React and server-side rendering, and both encapsulate requisite build tooling via a simplified CLI.

#### Fusion.js benefits

The key feature that sets Fusion.js apart from Next.js is its universal plugin system. Unlike Next.js, which lacks the abstractions needed to manage server-side code, Fusion.js plugins work for both server and client code. And because Fusion.js leverages dependency injection, a plugin’s dependencies can easily be mocked during tests and exposed as services to other plugins.

