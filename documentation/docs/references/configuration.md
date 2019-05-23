---
title: Configuration
path: /configuration/
---

# Configuration

### Environment variables

The `NODE_ENV` environment variable is inferred by the compiler from the initiating Fusion CLI command and flags. It cannot be manually configured.

Fusion.js can also receive some start-up configuration through a few environment variables:

* `ROUTE_PREFIX` - A path under which the application responds. For example, if `ROUTE_PREFIX=/foo`, the app will live in `http://the-site.com/foo`. Defaults to empty string.
* `FRAMEWORK_STATIC_ASSET_PATH` - A path under which requests are treated as static asset requests. Defaults to `_static`.
* `ROOT_DIR` - The root directory of the app, relative to CWD. Can be configured via the `--dir` flag in Fusion CLI. Defaults to `.`

### Static configuration

The standard way to configure plugins in Fusion.js is to register the configuration values into the DI system via `app.register`. To support configuration tree shaking, we recommended keeping configuration in .js files rather than .json files.

If you have to add a new plugin to `app.js`, you should still separate configuration into an appropriate file in `src/config` in order to keep configuration code discoverable for future project maintainers.

---

# Working with secrets

Handle secrets like any other plugin configuration. Just register them to provide them to the plugin you're using.

In the example below, the secret for the JWT session plugin is being provisioned via environment variables.

```js
// src/main.js
import React from 'react';
import App from 'fusion-react';
import JWTSession, {SessionSecretToken} from 'fusion-plugin-jwt';
import {SessionToken} from 'fusion-tokens';

export default () => {
  const app = new App(<div>Hello</div>);

  app.register(SessionToken, JWTSession);
  app.register(SessionSecretToken, __NODE__ && process.env.SESSION_SECRET);

  return app;
};
```

Remember that typically we should only expose secrets in the server. In the example above, the `__NODE__ && process.env.SESSION_SECRET` expression [gets removed from the browser bundle](universal-rendering) via UglifyJS' dead code elimination.

# Secret rotation

It's good security practice to rotate secrets regularly, but we might not want to restart the application every time rotation needs to happen.

To accomplish dynamic secret rotation, plugins can receive an EventEmitter or similar abstraction as an argument:

```js
import {createPlugin} from 'fusion-core';
import {UniversalEventsToken} from 'fusion-plugin-universal-events';

export default createPlugin({
  deps: {SecretsEmitter: UniversalEventsToken},
  provides: ({SecretsEmitter}) => {
    const service = class Foo {
      //...
    };

    const emitter = SecretsEmitter.from()
    emitter.on('secret-rotation:foo', () => {
      const foo = service.from();
      // apply new secret
    });

    return service;
});
```
