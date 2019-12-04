---
title: Static Assets
path: /static-assets/
---

# Static Assets

During the compilation process, Fusion.js places files in the `.fusion` directory. Any file there is a static asset.

Fusion.js uses two environment variables to determine the URL prefix at which assets are served:

* `ROUTE_PREFIX` (defaults to empty string)
* `FRAMEWORK_STATIC_ASSET_PATH` (defaults to `/_static`)

If, for example, `ROUTE_PREFIX` is `/foo` and `FRAMEWORK_STATIC_ASSET_PATH` is `/_static`, then a request to `/foo/_static/bar.gif` in a production environment would attempt to respond with an asset at `.fusion/dist/production/client/bar.gif`

### What is assetUrl?

Fusion.js provides an `assetUrl` virtual function to both client and server side contexts. The helper simply converts asset relative paths (e.g. `./src/asset.js`) to the fully qualified URL (e.g. `/_static/asset.js`).

To use it, first import it:

```js
import {assetUrl} from 'fusion-core';
```

Then call it with a string literal as an argument:

```js
assetUrl('./src/static/foo.gif'); // becomes '/_static/foo.gif'
```

Note that `assetUrl` is resolved at compile time via a Babel plugin. Therefore, using a variable expression instead of a string literal will not work.

```js
// works
assetUrl('./src/static/foo.gif');

// throws compilation error
const path = './src/static/foo.gif';
assetUrl(path);
```

### Adding 3rd party assets

To include an asset in the `<head>` container, use the [`fusion-plugin-react-helmet-async`](https://github.com/fusionjs/fusion-plugin-react-helmet-async) plugin.

You can use the `assetUrl` utility to resolve assets stored in `node_modules` at compile time, e.g. `assetUrl('../../node_modules/some-module/example-asset.css')`.

```js
import React from 'react';
import {Helmet} from 'fusion-plugin-react-helmet-async';
import {assetUrl} from 'fusion-core';

export default function Root() {
  return (
    <main>
      <Helmet>
        <link rel="stylesheet" href={assetUrl('../../node_modules/some-path-to-asset')} />
      </Helmet>
    </main>
  );
}
```
