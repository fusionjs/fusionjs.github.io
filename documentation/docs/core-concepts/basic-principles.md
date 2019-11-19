---
title: Basic Principles
path: /basic-principles/
---

# Basic Principles

Internally, Fusion.js uses [Koa](https://koajs.com/) to handle request routing using a middleware stack. If you are unfamiliar with the concept of a middleware stack, think of an incoming request being processed by multiple layers of functions, that is, "stacking" on top of each other. As each function executes, it processes the request and passes it to the next middleware in the stack. For example, an incoming request might require some data to be fetched from a database first, then passes that information to a second middleware that uses that data to make a calculation.

While traditionally middleware is more the realm of server side frameworks (see [expressjs](https://expressjs.com/en/guide/writing-middleware.html) or [connect](https://github.com/senchalabs/connect)), because of the universal nature of Fusion.js, the middleware stack is processed on **both the client and the server**.

For example, a basic Fusion.js middleware function might look like this:

```js
const app = new App(rootComponent);

app.middleware(
  () => async (ctx, next) => {
    // Do something with the request here
    // Here, we'll just do something useless
    console.log('Inside middleware!');
    // Call next to go to the next middleware in the stack
    next();
  }
);
```

Here, we are attaching a middleware to `FusionApp` and adding logic to the request chain. We are telling the framework — _"anytime a request comes in, run that request through the middleware function that we just defined"_.

However, keep in mind this happens on the client as well. So when the page loads, a `console.log` statement will write to `stdout` on the Node server as well as to the console on your web browser. The timing and ordering of when that occurs is a bit nuanced but is covered in [Anatomy of a Request](/docs/core-concepts/anatomy-of-a-request).

You can clearly see how extensible this is. You can register multiple middleware methods on a Fusion.js app to achieve different things:

* Handle simple API routes like `/api/getUsers` or `/api/createUser`
* Add logging to all requests and send those logs to an event tracking service
* Handle authentication by reading cookies on the request and denying access to resources with a 401 status code

and so forth!

Fusion.js extends some of the base functionality of Koa by augmenting additional properties to the Koa `context` object. Those details can be found in the documentation for [`fusion-core`](/api/fusion-core#context).

## Rendering

As well as servicing requests, Fusion.js treats server side rendering as a first class citizen. When a request for HTML data comes in, Fusion.js will render the entire component tree on the server first, then call React hydration methods to render the same UI on the client. Rendering first on the server minimizes page load speeds and the developer experience of Fusion.js has been tuned to make this as painless as possible.

```js
import React from 'react';

const rootComponent = () => {
  return (
    <div>Hello world on the server AND the browser!</div>
  );
};
```

In the [next section](/docs/core-concepts/plugins) we'll explore an overview of the plugin system and how it works.
