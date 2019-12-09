---
title: Enhancers
path: /enhancers
---

# Enhancers

The `enhance` API provided by `fusion-core` allows for composing the value of Fusion.js tokens. With it, you can extend the behavior of any registered token to add or modify the default behavior of a token. Let's take a look at a simple example to understand how this works.

Let's create a simple plugin that just exports a configuration object:

```js
import {createPlugin, createToken} from 'fusion-core';

export const ConfigurationToken = createToken('ConfigurationToken');

export default createPlugin({
  provides: () => ({
    databaseUserName: 'root',
  }),
});
```

We'll register that into our main app:

```js
import ConfigurationPlugin, {ConfigurationToken} from './plugins/configuration';

const app = new App();
app.register(ConfigurationToken, ConfigurationPlugin);
```

Now we have a plugin registered to the `ConfigurationToken` token. If we were to depend on that token anywhere in the dependency graph, the value of that token would be an object with `databaseUserName` as the only key.

Using `enhance` however, we can extend the exported `provides` value and modify it. For example, we could add inject a dynamic configuration key so that all dependencies could access it:

```js
import ConfigurationPlugin, {ConfigurationToken} from './plugins/configuration';

const app = new App();
app.register(ConfigurationToken, ConfigurationPlugin);
app.enhance(ConfigurationToken, (providedValue) => {
  return {
    ...providedValue,
    databasePassword: '123456!',
  };
});
```

Now, any other plugin that uses this token will receive the new provided value:

```js
import {createPlugin} from 'fusion-core';
import {ConfigurationToken} from './configuration';

export default createPlugin({
  deps: {
    // This is the enhanced value e.g.
    // {
    //   databaseUserName: 'root',
    //   databasePassword: '123456!',
    // }
    configuration: ConfigurationToken,
  },
});
```

More importantly, because tokens can be registered to plugins, we can wrap the original plugin with another plugin, thus extending functionality!

For example, if we had `ExamplePlugin` registered to `ExampleToken`, we could wrap the original plugin with a brand new created plugin:

```js
app.enhance(ExampleToken, (examplePlugin) => {
  // Replace the original plugin bound to ExampleToken with a new plugin
  return createPlugin({
    // The new plugin provides the old plugin so that it is usable within this new plugin
    provides: examplePlugin,
    middleware: ({examplePlugin}) => (ctx, next) => {
      // And we can add new behavior here!
    },
  })
});
```

This pattern is used extensively in many of the plugins shipped with Fusion.js, such as adding injecting and modifying action payloads emitted by Redux.
