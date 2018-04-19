---
title: Testing
path: /testing/
---

# Testing

Tests can be located anywhere in a project directory tree: simply create
`__tests__` directories and put your tests inside. You can have as many
`__tests__` directories as you want. This means you can colocate tests to
features just as easily as you can put all your tests in a single location.

Fusion.js uses a file naming convention to determine which files correspond to
what kind of tests: files in a `__tests__` directory that end in `.node.js` will
be run in Node.js and files ending in `.browser.js` will be run in a browser environment (currently jsdom).

Fusion.js uses a small wrapper around [jest](https://github.com/facebook/jest) to run
tests in Node.js and browser environments. We are currently exploring leveraging [unitest](https://github.com/rtsao/unitest) as a future test runner for Fusion.js applications.

Find out about the various testing strategies that work with FusionJS applications:

* [Component testing](/docs/guides/testing/component)
* [Unit testing](/docs/guides/testing/unit)
* [Snapshot testing](/docs/guides/testing/snapshot)
* [Simulation testing](/docs/guides/testing/simulation)
* [Integration testing](/docs/guides/testing/integration)
