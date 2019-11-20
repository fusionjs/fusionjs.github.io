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
tests in Node.js and browser environments.

## Test coverage

Test coverage information informs you of what percentage of your code is executed within a test. It is one metric out of many which can help you create and maintain high quality web applications.

Generate coverage reports using the `--coverage` parameter within the `fusion test` CLI command. See the [fusion-cli docs](/api/fusion-cli#cli-api) for additional CLI parameters.

### Excluding test coverage

It may occasionally be necessary to exclude coverage in certain cases such as utilities or configuration files. Since Jest uses Istanbul under the hood to generate coverage reports, you may leverage Istanbul ignore comments to exclude coverage where necessary.

Here is an example of excluding coverage for an entire file:

```js
/* istanbul ignore file */
```

You can also ignore individual code branches using a similar [comment pattern](https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md).

## Testing strategies

Learn about the various testing strategies that work with Fusion.js applications:

* [Component Testing](/docs/testing/component)
* [Unit Testing](/docs/testing/unit)
* [Snapshot Testing](/docs/testing/snapshot)
* [Simulation Testing](/docs/testing/simulation)
* [Integration Testing](/docs/testing/integration)
