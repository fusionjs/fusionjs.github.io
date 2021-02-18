---
title: Anatomy of a Request
path: /anatomy-of-a-request/
---

# Anatomy of a Request

In the previous sections, we learned about Fusion.js plugins and their ability to define middleware functions that can read the `request` object and/or make changes to it. In this section, we'll cover what happens when a request comes into the Fusion.js server, the order that plugins are accessed, and when rendering occurs.

We'll be using the following example for this discussion.

```js
const app = new App();
app.register(SecondPlugin);
app.register(StandalonePlugin);
app.register(FirstPlugin);
```

> **NOTE**: You do not need to manage the ordering of registrations here if any of the plugins have dependencies on each other. Under the hood, Fusion.js will sort out the dependency graph for you.

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
2. `SecondPlugin`
3. `StandalonePlugin`

This ordering occurs even though `SecondPlugin` was registered earlier than `FirstPlugin` and `FirstPlugin` was registered last, after `StandalonePlugin`. Under the hood, Fusion.js will process plugins in the order that they are registered unless they have a dependency on another plugin, in which case that plugin is processed ahead of it. This causes `FirstPlugin` to be processed first by proxy of `SecondPlugin` and thus ahead of `StandalonePlugin`.

### Server rendering

After all plugins have run, the last task is to render out the current page on the server. This is **always** the last action that the server takes. This presents an opportunity for registered plugins to modify the HTML template if necessary to add/remove HTML elements in any middleware.

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
