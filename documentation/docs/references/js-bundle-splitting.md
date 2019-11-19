---
title: JS Bundle Splitting
path: /js-bundle-splitting/
---

# JS Bundle Splitting

Bundle splitting is the process of separating Javascript code into multiple files. This results in a smaller amount of code being downloaded on the initial page load while other parts of the web app are loaded later on demand.

Fusion.js supports dynamic `import` statements out of the box as well as provides React helpers for dynamic component loading courtesy of the `split` API from `fusion-react`.

### Dynamic imports

Webpack provides support for dynamically importing modules at run time. Webpack will split the desired code into its own bundle at compile time. The browser can then fetch that bundle when it is needed instead of loading it during page load.

```js
import React, {useState} from 'react';

export default function MainComponent {
  const [isModalDisplayed, setModalDisplayed] = useState(false);
  const [ModalComponent, setModalComponent] = useState(null);

  const loadModalComponent = async () => {
    const loadResult = await import('./components/modal.js');
    setModalComponent(() => loadResult.default);
  };

  return (
    <div>
      {isModalDisplayed && ModalComponent ? <ModalComponent /> : null}
      <button onClick={() => {
        setModalDisplayed(true);
        loadModalComponent();
      }} />
    </div>
  );
}
```

The above example illustrates how the dynamic `import` statement can be used anywhere in your code to tell Webpack to create a bundle for the desired import. In this case, since the `Modal` component only displays if a user clicks a button, we can defer loading in that bundle until the user triggers that action, thus saving bandwidth on the initial page load.

Dynamic imports are not limited to just React components. For example, they can also be used to delay loading large data sets that need to be processed on the client.

For complete details, view the [Webpack docs](https://webpack.js.org/guides/code-splitting/#dynamic-imports).

### `split` API for loading React components

Similar to the previous example, Fusion.js provides the [`split`](/api/fusion-react#split) API from `fusion-core` that creates a wrapper component that will display a loading component while the bundle is loading, an error component if the load encounters an error, and the actual component once the bundle has loaded. This helper API makes it easier to bundle split React components so that the boilerplate code does not need to be repeated by hand.

One general strategy to reduce download times is to split top-level component routes. Since the route definitions already present a clear delineation of how your application is set up (admin pages go here, profile page is here, settings page is there, etc.), deferring the JS bundle load until the user accesses that route means the components associated with that route do not load until they are needed.

In the following example, we use the `split` API to defer load of the `Hello` component until it is required. `split` takes in a `load` property that controls whether or not to display the underlying component. In this case, we use a dynamic `import` and wait until the browser has fetched the bundle. Once loading is complete, the real `Hello` component will be displayed.

```js
// src/components/root.js
import React from 'react';
import {split} from 'fusion-react';

const LoadingComponent = () => <div>Loading...</div>;
const ErrorComponent = () => <div>Error loading component</div>;
const Hello = split({
  load: () => import('./components/hello');
  LoadingComponent,
  ErrorComponent
});

const root = (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/hello">Hello</Link></li>
    </ul>
  </div>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/hello" component={Hello} />
  </Switch>
)

export default root;
```

### Splitting the Vendor bundle

By default all node modules are compiled into a single vendor bundle, but occasionally you might want to assign one or more node modules to a separate bundle. For example, it's unlikley that the React module will be updated from one build to the next and so when performance is critical it might make sense to cache it as a separate bundle.

As of Webpack 4, the webpack config file accepts an `optimization` property to split the vendor bundle. Fusion.js developers can add this configuration via `.fusionrc.js` in the root directory of the app:

```js
module.exports = {
  splitChunks: {
    chunks: 'async',
    cacheGroups: {
      default: {
        minChunks: 2,
        reuseExistingChunk: true,
      },
      vendor_react: {
        test: /.*\/node_modules\/react\/index\.js/,
        name: 'vendor-react',
        chunks: 'initial',
        enforce: true,
      },
    },
  },
};
```

With this configuration, the build will partition vendor bundles into `client-vendor.js` and `client-vendor-react.js` (with hash suffixes as appropriate).

### Preloading and prefetching modules

Webpack also provides support for preloading and prefetching modules using inline directives.

```js
import(/* webpackPrefetch: true */ 'LoginModal');
```

This directive will output a `<Link>` tag that tells the browser to prefetch this bundle during idle time to prepare for the user interacting with the `LoginModal` component.

```js
import(/* webpackPreload: true */ 'ChartingLibrary');
```

This directive will instruct the browser to download the library at the same time as the main JS bundle.

Both of these options are useful in instances where a user may access a bundle split part of your site (like a login modal). Prefetching the bundle in anticipation of the user actually clicking on the login link will preload the bundle so that when they do, the associated code is there.

The complete details for both options as well as further details on when to use each option are available in the [Webpack docs](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules).

> NOTE: These are more geared towards power users so if you are unsure you need them, you probably do not.
