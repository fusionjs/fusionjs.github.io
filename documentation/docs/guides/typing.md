---
title: Typing
path: /typing/
---

# Typing

Fusion.js supports [Flow](https://flow.org/) out of the box for static type checking.

### Why use static types in JavaScript?

JavaScript lacks language level support for static types, making it difficult to ensure that code you write has the correct types at compile time.  Although you can write JavaScript code without any type annotations and have it work, there is the risk that bad code leads to malformed inputs being provided to methods or functions that have to then either gracefully fail (e.g. runtime type checking with error handling) or fail hard (e.g. unhandled exceptions).  In the worst case, a mismatched type goes unchecked and cascades to a failure down the road leading to lengthy debugging and unintended side effects.

At its core, static type checking aims to verify and enforce that values being used by your code meet the invariant conditions specified by the types at **compile time**.  This offers a number of advantages over dynamic typing:

* Early bug and error detection due to type mismatches
* Self-documenting code through type annotations
* Cleaner error handling to check variable or argument types at runtime
* Increases portability of code
* Improves the testing experience - no more tediously testing for mistyped inputs

### Why use Flow?

Flow is not the only solution for static type checking in JavaScript.  It is, however, an elegant solution that provides benefits **without having to change any of your existing code**.  Flow has the ability to infer types within your code, ensuring that it can help catch type errors from the get go.  And adding type annotations allows for incrementally improving type coverage.  We recommended that you use Flow since Fusion.js provides types for core components of the framework that can be used in your application.

### Getting Started

If you are new to Flow, we recommended that you check out the [Getting Started](https://flow.org/en/docs/getting-started/) and [Type Annotations](https://flow.org/en/docs/types/) documentation.

If you use Visual Studio Code as your primary IDE, check out the [Flow for Visual Studio Code](https://github.com/flowtype/flow-for-vscode) extension.

### Annotating a simple React component

Annotating React components with type annotations can be very powerful for ensuring your components are used as expected.  To illustrate this, let's write a very simple component that displays a user's name.

```js
// src/components/display-name
// @flow
import React from 'react';

type Props = {|
  firstName: string,
  lastName: ?string // may be undefined, if last name not provided
|}
class DisplayNameComponent extends React.Component<Props> {
  render() {
    const fullName = `${this.props.firstName} ${this.props.lastName || ''}`;
    return <div>{fullName}</div>;
  }
}
```

If we run `flow run check`, we'd expect to see find no errors.  Let's see what happens if we try to also display a user's age.

```js
class DisplayNameComponent extends React.Component<Props> {
  render() {
    const fullName = `${this.props.firstName} ${this.props.lastName || ''}`;
    const age = this.props.age; // type error!
    return <div>{fullName}</div>;
  }
}
```

In this case, we get the an error that the property `age` was not found in `Props`, as illustrated [here](https://flow.org/try/#0PTAEGcCcGNmh7AtgB3gOwKZoC7mAEwEtxkAbAQwE8BaNcxDAKBFAAEAzU+Ad0cJXiRsoAEoZy0Ye0hJQAckjjJcgNyNG2SsgygACjOThQAXlABvAD6NQodoUjhsAOXoYAXBGyRCaAOYAaa1AKRxcGDwB+R28-UBZEKlAAIx0AVzR8DDtMfH9QQnZg8kdQOgZS+GFkGQA3Qkz8RgsAX0ZoEKMAEWIyKjCMAGEkVEwcUAwAD2wsfCMxCWwAOiGBUewAHn14QwA+cyDFDIxIAAoASn2bGwQ0EvZU0lJ+k1AAAwASM2wAC2JF6u24EWdgczlczVAnx+fwBhkWITB5QsFnkcmarzUV1ANxK5F8OlM0KBsKBeIwmKuimwqUgaFA6yINR2Znuj36zXWBEITIprWaQA).

We recommended that you check out the [Flow + React documentation](https://flow.org/en/docs/react/).

### Annotating a simple Fusion.js plugin

To see how we can leverage built in Fusion.js types, let's write a very simple Fusion.js plugin that logs a random cat fact on every request to `/log-cat-fact`.

```js
// src/plugins/cat-facts.js
// @flow

import {createPlugin} from 'fusion-core';
import {LoggerToken} from 'fusion-tokens';
import type {Context} from 'fusion-core';

/* Helpers */
const FACTS: Array<string> = [ // provided by: https://catfact.ninja/fact
  "A 2007 Gallup poll revealed that both men and women were equally likely to own a cat.",
  "Most cats adore sardines.",
  "Cats have been domesticated for half as long as dogs have been.",
  "The average litter of kittens is between 2 - 6 kittens.",
];
function getCatFact(): string {
  return FACTS[Math.floor(Math.random() * FACTS.length)];
}

type CatFactsDeps = {
  logger: typeof LoggerToken,
};

type CatFactsService = void;

export default createPlugin<CatFactsDeps, CatFactsService>({
  deps: {logger: LoggerToken},
  middleware: deps => (ctx: Context, next: () => Promise<*>) => {
    if(ctx.url === '/log-cat-fact') {
      deps.logger.log(getCatFact());
    }
    return next();
  }
});
```

Let's break this down.

The `createPlugin` function takes two generics `CatFactsDeps` and `CatFactsService`. The type `CatFactsDeps` specifies what should be the type of the `deps` property. The type `CatFactsService` specifies what should be the type of the service returned by `provides`. Since this example only sets up a middleware and doesn't provide a service API, we simply alias `CatFactsService` with `void`.

We import a `type {Context}` from `fusion-core` which is used in our middleware signature.  This let's us ensure safe accessibility of the `ctx` object.  We are also using the dependency injected logger which is registered with `LoggerToken`.  If we look at the type of `logger`, we would expect to see:

```js
// defined in https://github.com/fusionjs/fusion-tokens/blob/master/src/index.js#L24
export type Logger = {
  log(level: string, arg: any): void,
  error(arg: any): void,
  warn(arg: any): void,
  info(arg: any): void,
  verbose(arg: any): void,
  debug(arg: any): void,
  silly(arg: any): void,
};
```

If we tried to do `deps.logger.notALogMethod(...)` we would expect a type error.  Fusion.js will automatically hook up these injected types when they are available, ensuring more seamless type safety across the Fusion.js ecosystem.

#### Universal plugin types

It's possible for plugins to be non-trivial enough that they have similar but not identical type signatures on server and browser.

The recommended way to type those types of plugins is to create separate plugins and tokens for each environment:

```js
// src/plugins/foo/server.js
import type {FusionPlugin} from 'fusion-core';

export type ServerFooDeps = {
  bar: typeof BarToken,
}

export class ServerFoo {
  greet() {
    console.log('hello');
  }
}

export const ServerFooToken = createToken<ServerFoo>('Foo');
export const ServerFooPlugin = ((__NODE__ && createPlugin<ServerFooDeps, ServerFoo>({
  deps: {bar: BarToken},
  provides({bar}) {
    return new ServerFoo();
  }
}): any): FusionPlugin<ServerFooDeps, ServerFoo>);

// src/plugins/foo/browser.js
import type {FusionPlugin} from 'fusion-core';

export type BrowserFooDeps = {
  baz: typeof BazToken,
}

export class BrowserFoo {
  dontGreet() {
    console.log('no hi for you');
  }
}

export const BrowserFooToken = createToken<BrowserFoo>('Foo');
export const BrowserFooPlugin = ((__BROWSER__ && createPlugin<BrowserFooDeps, BrowserFoo>({
  deps: {baz: BazToken},
  provides({baz}) {
    return new BrowserFoo();
  }
}): any): FusionPlugin<BrowserFooDeps, BrowserFoo>);

// src/plugins/foo/index.js
export * from './plugins/foo/server.js';
export * from './plugins/foo/browser.js';

// src/main.js
import App from 'fusion-react';
import {ServerFooToken, ServerFooPlugin, BrowserFooToken, BrowserFooPlugin} from './plugins/foo/index.js';

export default () => {
  const app = new App();

  if (__NODE__) {
    app.register(ServerFooToken, ServerFooPlugin);
  else {
    app.register(BrowserFooToken, BrowserFooPlugin);
  }

  return app;
}
```

Note that we use `__NODE__ && ...` and `__BROWSER__ && ...` code fences to treeshake the plugins (and their dependencies) out of the appropriate bundles. The cast to `any` and back to `FusionPlugin` is required to prevent Flow from nagging about the environment selection boolean.

Warning: You should not move the `createPlugin` call outside of the `__NODE__ && ...` fence, as doing so can prevent treeshaking.
