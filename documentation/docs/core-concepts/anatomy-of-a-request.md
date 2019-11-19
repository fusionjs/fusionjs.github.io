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
app.register(ThirdPlugin);
```

We will also assume that each plugin defines a middleware function.

```js
const FirstPlugin = createPlugin({
  middleware: () => async (ctx, next) => {
    // Implementation here
  }
});
```

## On the server

## Rendering

## On the client

[insert that request diagram somewhere]

* plugin order when a request comes in
* plugins run on server and then client
