---
title: Core Packages
path: /core-packages/
---

# Core Packages

Fusion.js is comprised of separate packages. Each package is responsible for a different part of the core framework and rather than ship as one monolithic package, the functionality is split to facilitate clear separation of concerns as well as easier upgrade paths for users.

The `create-fusion-app` scaffold will set up a new Fusion.js app with these pre-installed. The [Learning Fusion.js Tutorial](/docs/learning-fusionjs-tutorial) walks through installing these manually and setting them up.

Let's dive in and explore at a high level what these packages are.

## fusion-core

([GitHub](https://github.com/fusionjs/fusionjs/tree/master/fusion-core))

`fusion-core` is the core library, responsible for handling the request lifecycle of a Fusion.js app, which includes network requests to the web app and controlling rendering on both the server and the client. This logic is exported as the `FusionApp` class. More importantly, `FusionApp` provides the `register()` method which allows for registering built-in and user created plugins to extend the functionality of a Fusion.js app.

Under the hood, `FusionApp` is not running an HTTP server. Rather, it receives proxied requests and in turn can send requests back out.

## fusion-react

([GitHub](https://github.com/fusionjs/fusionjs/tree/master/fusion-react))

`fusion-react` extends `fusion-core` and replaces the internal rendering engine with React. Both client and server side rendering support for React are included, including [hooks support](http://localhost:8000/api/fusion-react#useservice). `fusion-react` also exports methods that assist with server side rendering, such as [React suspense-like API's](http://localhost:8000/api/fusion-react#prepared).

If you are using React, you will be using the exported `App` class from this package rather than from `fusion-core`.

## fusion-cli

([GitHub](https://github.com/fusionjs/fusionjs/tree/master/fusion-cli))

`fusion-cli` is the command line interface to build and run Fusion.js apps. The package handles:

* bundling your source code into separate client and server bundles using Webpack
* handles optimizations for development, test, and production environments
* spins up a Node HTTP server and proxies requests to `FusionApp`
* integrates hot module reloading out of the box

<!-- In the [next section](/docs/core-concepts/basic-principles), we'll cover the basics of Fusion.js and how the framework works at a high level. -->
