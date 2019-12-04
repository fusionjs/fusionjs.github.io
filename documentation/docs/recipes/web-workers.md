---
title: "Web workers"
path: /web-workers
---

# Web Workers

A web worker is a mechanism for running background tasks outside of the browser context. Heavy and resource consuming tasks can instead be moved to a background task so as to not block any UI threads in the main window. Communication is done through `postMessage` and `onmessage` handlers in both the worker instance and the browser.

Fusion.js supports loading web workers using the [`workerUrl` virtual module](/api/fusion-core#virtual-modules) exposed by `fusion-core`. The virtual module allows Fusion.js to bundle your web worker with Babel.

### Usage

The method signature for `workerUrl` is:

```js
workerUrl(url: string): string
```

It takes as input the path to your web worker file and will return the internal Babel-bundled URL. This URL can then be passed to the `Worker` constructor. For example, the following code creates a web worker within a Fusion.js client-side plugin.

```js
// web-worker-plugin.js
import {createPlugin, workerUrl} from 'fusion-core';

export default __BROWSER__ && createPlugin({
  middleware: () => {
    return (ctx, next) => {
      const url = workerUrl('./path/to/worker.js');
      const worker = new Worker(url);

      worker.onmessage = e => {
        console.log('Worker sent back', e.data);
      };
      worker.postMessage('Some message');

      return next();
    };
  },
});
```

Because the web worker has been transpiled and bundled with Babel, you can also use ES2015+ syntax as well as import other modules within the worker file.

```js
// worker.js

import add from '../utils/add.js';

class SomeWorkerClass() {
  // ...
}
```

### Restrictions

Since web workers are meant only run on the client, make sure to properly code fence your plugins and worker registration code with `__BROWSER__` guards so the code is not executed on the server.

```js
// app.js

if (__BROWSER__) {
  app.register(WebWorkerPlugin);
}
```
