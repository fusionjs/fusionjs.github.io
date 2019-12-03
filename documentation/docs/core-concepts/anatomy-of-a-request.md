---
title: Anatomy of a Request
path: /anatomy-of-a-request/
---

# Anatomy of a Request

In the previous sections, we learned about Fusion.js plugins and their ability to define middleware functions that can read the `request` object and/or make changes to it. In this section, we'll cover what happens when a request comes into the Fusion.js server, the order that plugins are accessed, and when rendering occurs.

We'll be using the following example for this discussion.

```js
const app = new App();
app.register(FirstPlugin);
app.register(SecondPlugin);
app.register(StandalonePlugin);
```

> **NOTE**: The actual ordering of registration here does not matter since Fusion.js will resolve all plugin dependencies when your app loads. This greatly simplifies configuration of your app since you don't need to manually re-order things around!

Let's also assume that `SecondPlugin` depends on `FirstPlugin` but `StandalonePlugin` is stand-alone with no dependencies.

```js
const FirstPlugin = createPlugin({
  middleware: () => (ctx, next) => {
    console.log('FirstPlugin');
    next();
  },
});

const SecondPlugin = createPlugin({
  // Define a dependency to FirstPlugin!
  deps: {first: FirstPlugin},
  middleware: () => (ctx, next) => {
    console.log('SecondPlugin');
    next();
  },
});

const StandalonePlugin = createPlugin({
  middleware: () => (ctx, next) => {
    console.log('StandalonePlugin');
    next();
  },
});
```

We've given each plugin a `middleware` definition to log its own name so we can tell when they are accessed.

### On the server

When Fusion.js initializes, it builds a dependency graph of all registered plugins based on what plugins depend on. This ensures that each plugin has its necessary dependencies when it needs to run.

In the above example, because `SecondPlugin` depends on `FirstPlugin`, the `console.log` order that the middleware will be accessed is:

1. `FirstPlugin`
2. `StandalonePlugin`
3. `SecondPlugin`

> **Note**: The order of `FirstPlugin` and `StandalonePlugin` is not deterministic since both are not dependent on anything else. This is ok in our case though since we have no preference.

### Server rendering

After all plugins have run, the last task is to render out the current page on the server. This is **always** the last action that the server takes. This presents an opportunity for registered plugins to modify the HTML template if necessary to add/remove HTML elements while the request chain is processing.

Finally, the server render will flush the page HTML onto the client.

### On the client

The client will run through the same process, stepping through each `middleware` based on the topological sort of the plugin graph.

### Client rendering

Lastly, the client will "render" itself. Because the page has already been written to the DOM and the user can already see content at this point, this in practice is [React hydration](https://reactjs.org/docs/react-dom.html#hydrate) which synchronizes the client state with what has already been rendered on the page.

### Declaring logic after render

At this point, the request has almost completed. A plugin can define any actions to take _after_ the render by adding code to after the `next()` call in the `middleware` function. For example, you could measure how long a particular render took or setup an expensive object and clean it up after render.

This is more of an advanced feature so for more information on how this works, see the complete [Plugins](/docs/references/creating-a-plugin) reference.

## Learning curve

Plugins are a powerful, yet nuanced part of Fusion.js. It may take some time to fully understand how to maximize the power of them so play around with making your own plugins and see what you can come up with!

In the [next section](/docs/core-concepts/universal-framework), we'll take a look at understanding the universal framework portion of Fusion.js.
