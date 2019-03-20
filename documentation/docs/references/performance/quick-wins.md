---
title: "Quick Wins"
path: /quick-wins
---

# Quick Wins

This section will describe various low-effort techniques you can use use to make your web app faster:

- [bundle splitting](#bundle-splitting)
- [font preloading](#font-preloading)
- [image compression](#image-compression)

### Bundle splitting

Bundle splitting means separating JavaScript code into multiple files such that a smaller amount of code is downloaded
on page load, and other sections of the web app are loaded later on demand.

While Fusion.js allows splitting bundles to render shell and fill in the spaces separately, the easiest strategy to
reduce download times is to make the top-level component of routes split.

Below is an example showing what an app would look like before applying bundle splitting based on routes:

```js
// src/main.js
import App from 'fusion-react';
import root from './components/root';

export default () => {
  return new App(root);
}

// src/components/root.js
import React from 'react';
import Hello from './components/hello';

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

// src/components/hello.js
export default () => (
  <div>Hello</div>
)
```

And here's what it would look like if we added bundle splitting to the component for the `/hello` route:

```js
// src/main.js
import App from 'fusion-react';
import root from './components/root';

export default () => {
  return new App(root);
}

// src/components/root.js
import React from 'react';
import {split} from 'fusion-react-async';

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

// src/components/hello.js
export default () => (
  <div>Hello</div>
)
```

---

### Font preloading

Font downloads can be a significant source of latency. Configuring how fonts are loaded can improve download times.

The default font configuration provided by the scaffold is already optimized for most common cases. Here's a snippet of
that configuration:

```js
export default {
  preloadDepth: 1,
  fonts: {
    Book: {
      urls: {
        woff2: assetUrl("../static/fonts/Clan-Book.woff2"),
        woff: assetUrl("../static/fonts/Clan-Book.woff")
      },
      fallback: {
        name: "Helvetica"
      }
    },
    Medium: {
      urls: {
        woff2: assetUrl("../static/fonts/Clan-Medium.woff2"),
        woff: assetUrl("../static/fonts/Clan-Medium.woff")
      },
      fallback: {
        name: "Book"
      },
      styles: {
        fontWeight: "bold"
      }
    }
  }
  // ...
};
```

The `fonts` property defines a graph of dependencies: `Book` falls back to `Helvetica` and `Medium` falls back to
`Book`. Additionally, `Medium` is defined as a `bold` font weight.

The `preloadDepth` property indicates how many levels of the dependency graph are preloaded via inline CSS and by
extension how many are loaded asynchronously via JavaScript.

Preloading a font makes text using that font render with the correct font faster, because the browser can efficiently
prioritize and parallelize font and CSS downloads if fonts are declared with inline CSS. By contrast, downloading a font
asynchronously requires running JavaScript, which blocks the browser's parsing pipeline and can take an arbitrarily much
longer time to fire a font request than an inline CSS declaration. With that being said, while preloading one or two
fonts typically has little or no impact on DOMContentLoaded timing, the trade-off of preloading several fonts - even if
they aren't that noticeably used - is that you would have to wait a long time for anything to render at all because
you've saturated your download pipeline with font-related requests, which has a significant negative impact on
DOMContentLoaded timing.

Instead of doing that, the configuration above only preloads one level of the dependency graph, i.e. it only preloads
`Book`. It can be acceptable to defer loading of `Medium` because the browser can synthesize faux styles for bold and
italics for any font by using a generic algorithm. However, the faux font synthesis algorithm isn't perfect. Font design
is an art, which means that there are artistic and ergonomic differences between a synthesized bold style and a
hand-crafted font such as `Clan-Medium`. Ideally we want to use `Medium` instead of a synthesized bold, but it's
acceptable to temporarily show a synthesized bold while waiting for the true `Medium` font to be downloaded and
switching over when the download is done. This technique is known as FOFT (flash of faux text), and is far less jarring
than FOIT (flash of invisible text) and FOUT (flash of unstyled text).

The configuration above is usually good for most applications, but there may be reasons to tune it differently. If, for
example, we were working on an landing page that heavily used Clan-Medium above the fold, the FOFT might be more jarring
than preloading `Medium`. In that case, we could change `preloadDepth` to `0` to force `Medium` to be preloaded via
inline CSS.

On the other hand, if there's a major concern about overall performance of a web application, it might be an acceptable
trade-off to preload no fonts. In that case, changing `preloadDepth` to `2` would force both `Book` and `Medium` to be
loaded asynchronously. This would mean that the page would render immediately using `Helvetica` and later would switch
to `Book` and `Medium` as these fonts finished downloading (causing a FOUT).

---

### Image compression

Image compression is perhaps the most cost-effective way to improve performance of public facing web apps.

There are many tools that can automatically compress images, such as
[`imagemin-cli`](https://www.npmjs.com/package/imagemin-cli)
