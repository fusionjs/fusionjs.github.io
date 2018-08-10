---
title: Debugging
path: /debugging/
---

# Debugging

### Debugging in development

When running the application in dev mode, connect a debugger to the
Node.js server via the `yarn dev --debug` command.

Running that command wil provide you with a debugger socket URL that can be
consumed by tools like the Chrome debugger, which then allows you to step
through server code. See
[Node.js inspector docs for more information](https://nodejs.org/en/docs/inspector).

You can debug tests in a similar way by running `yarn test --debug`.

#### Devtools

##### React

React provides [dev tools](https://github.com/facebook/react-devtools) that make
it easy to inspect the React component tree directly from the browser dev tools
panel. This tool works in Chrome and Firefox.

##### Redux

We recommend using
[the Redux dev tool extension](https://github.com/zalmoxisus/redux-devtools-extension)
for inspecting Redux actions and state tree.
