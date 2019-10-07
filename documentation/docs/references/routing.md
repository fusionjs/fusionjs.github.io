---
title: Routing
path: /routing/
---

# Routing

[fusion-plugin-react-router](/api/fusion-plugin-react-router) is available to integrate routing features into the component tree. The plugin uses [React Router](https://reacttraining.com/react-router/) under the hood, and exposes a similar API that you can use to add routing behavior anywhere in your component tree.

For more details on how to use React Router, you can view their training guide [here](https://reacttraining.com/react-router/web/guides/quick-start).

### Example

```js
import React from 'react';
import {
  Router,
  Route,
  Link,
  Switch,
  NotFound,
} from 'fusion-plugin-react-router';

const Home = () => <div>Hello</div>;
const Test = () => <div>Test</div>;
const PageNotFound = () => (
  <NotFound>
    <div>404</div>
  </NotFound>
);

const root = (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/test">Test</Link>
      </li>
      <li>
        <Link to="/404">404</Link>
      </li>
    </ul>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/test" component={Test} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default root;
```

### Async loading routes

[fusion-plugin-react-router](/api/fusion-plugin-react-router) integrates nicely with [fusion-react](/api/fusion-react) to support async loading routes. This means that you will only load the code for the route that the user is currently visiting, and this can make significant performance improvements to your application.

```js
// src/components/root.js
import React from 'react';
import {split} from 'fusion-react';
import {Route} from 'fusion-plugin-react-router';

const LoadingComponent = () => <div>Loading...</div>;
const ErrorComponent = () => <div>Error loading component</div>;
const BundleSplitHello = split({
  load: () => import('./components/hello'),
  LoadingComponent,
  ErrorComponent
});

const root = (
  <div>
    <div>This is part of the initial bundle</div>
    <Route path="/hello" component={BundleSplitHello} />
  </div>
)
export default root;

// src/components/hello.js
export default () => (
  <div>
    This is part of a separate bundle that gets loaded asynchronously
    when the BundleSplit component gets mounted.
  </div>
)
```
