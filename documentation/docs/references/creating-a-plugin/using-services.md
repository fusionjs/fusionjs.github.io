# Using services

React hooks are the preferred method for using services in React. In fact, many cases where we used class components can now be accomplished easier with hooks. Keep in mind that most plugins currently do not provide a service we would be able to use on the client-side. This feature is future-facing for how we want to consume services.

*React Hooks were introduced in React v16.8. Make sure you are using a compatible version.*

Hooks are relatively new to React, please familiarize yourself with the concepts. SEE [the docs](https://reactjs.org/docs/hooks-intro.html).

#### useService

To use a Fusion.js plugin in React, `fusion-react` provides a custom `useService` hook for access to the service registered by a plugin.

```js
// src/plugins/Example.js
import {createPlugin, createToken} from 'fusion-core';

export const ExampleToken = createToken('example');

export default createPlugin({
  provides: () => 'Hello React!',
});
```

```js
// src/app.js
import ExamplePlugin, {ExampleToken} from './plugins/Example.js';

export default (app: FusionApp) => {
  app.register(ExampleToken, ExamplePlugin);
  // ...
}
```

```js
// src/components/Example.js
import React from 'react';
import {useService} from 'fusion-react';
import {ExampleToken} from '../plugins/Example.js';

export default function Example() {
  const exampleService = useService(ExampleToken);
  return (
    <h1>{exampleService}</h1>
  ); // => <h1>Hello React!</h1>
}
```

The `useService` is a custom hook that accepts a token and returns the resolved service registered to that token.

* `token: Token<TService>` - Required. A registered token
* `service: TService` - The service provided by the registered plugin.

#### Implementation Details

Under the hood, `fusion-react` is using the Context API. The `Provider` is already added to the tree for you. In order to ensure the DI system cannot be overridden deep in the tree, there are no `Context` objects exposed directly. It wouldn't make sense to be able to place another `Provider` in the component tree.

#### Troubleshooting
`useService` will throw an exception if the token has not been registered or the plugin does not define a service in the `provides` option of `createPlugin`. Since hooks must be called unconditionally (i.e. you cannot use try/catch), these errors can only be caught with an [`ErrorBoundary`](https://reactjs.org/docs/error-boundaries.html) around the component. Preferrably, `useService` is never called with a token that would result in this exception.
