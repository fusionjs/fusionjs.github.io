---
title: Plugins
path: /plugins/
---

# Plugins

So far, we've learned that Fusion.js allows for registering different middleware to handle all sorts of behaviors. Let's take another look at the previous example.

```js
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

This middleware is an example of a **Fusion.js plugin**. Plugins are registered via the `register()` method and they extend the core functionality of a Fusion.js app. Middleware, for handling requests, is one example of what they can do. In addition to that, plugins can also provide a programmatic service that can be consumed by itself and by other plugins:

```js
app.register({
  provides: () => {
    // This plugin provides a single function called log that can be called by other plugins!
    log: (msg) => console.log(msg),
  }
});
```

A plugin can define any interface to export. It can be an object that maps to utility functions. Or it even be a `class` or a React higher order component.

You can even access the plugin service API from React components:

```js
import {useService} from 'fusion-react';
import {LoggerToken} from '../plugins/logger-plugin';

const RootComponent = () => {
  // Get the plugin from React context and use its API directly
  // LoggerToken contains the value of the Logger plugin, this is explained below
  const loggerService = useService(LoggerToken);

  useEffect(() => {
    loggerService.log('Hello World!');
  });
};
```

While standalone plugins can be useful, many times you'll want to write plugins that depend on the exported interface from other plugins. Or you'll want to depend on changes to the request `context` object that another plugin has made through its middleware function. For that reason, plugins can directly depend on other plugins and Fusion.js will automatically sort out the dependency graph.

```js
import {AuthToken} from '../plugins/auth-plugin';
import {LoggerToken} from '../plugins/logger-plugin';

app.register({
  deps: {
    auth: AuthToken,
    logger: LoggerToken,
  },
  provides: ({auth, logger}) => {
    // You can use the auth and logger services here
  },
  middleware: ({auth, logger}) => (ctx, next) => {
    // And even use them here to
    // For example, maybe to log the request headers
    // Or to check for cookies and return a 401
  },
});
```

You may have noticed the above examples are referencing tokens. Each Fusion.js plugin that is created usually has a corresponding token. Tokens represent the value of that plugin and are used when we need to reference that plugin somewhere else within the framework. This assignment is done when we register the plugin with Fusion.js.

```js
const app = new App();
app.register(AuthToken, AuthPlugin);
app.register(LoggerToken, LoggerPlugin);
```

Whew, that was a lot to take in. The [Learning Fusion.js Tutorial](/docs/learning-fusionjs-tutorial) walks through these concepts step by step and is a great way to get hands on experience with the plugin system. The [Plugins reference](/docs/references/creating-a-plugin) goes into detail on how the plugin system works and the full API.

## An ecosystem of plugins

A typical Fusion.js app will have any number of plugins registered at a time. For simple apps, maybe as few as five. For more complex apps, as many as 50. Due to the ability for plugins to depend on other plugins, complex workflows can be orchestrated to achieve common web app requirements.

Fusion.js provides plugins for common React libraries like Redux, React Router, and Apollo. For the full list of plugins that currently exist in the Fusion.js ecosystem, see [here](/api/plugins). The [Recipes](/docs/recipes) section also goes into detail on how to accomplish common tasks with Fusion.js and also details the associated plugins that are needed.

In the [next section](/docs/core-concepts/anatomy-of-a-request), we'll dive into what happens when a request comes into a Fusion.js app.
