---
title: Universal Framework
path: /universal-framework/
---

# Universal Framework

Previous sections have mentioned that Fusion.js runs through all code both on the server and on the client. This differs from traditional frameworks where there is a clear delineation between what code is for the server and what code is for the client.

For code that is just rendering components, that is ok. However, for libraries that deal with file system access or accessing browser API's, there needs to be a way to specify which code is environment specific and not universal. Fusion.js provides global constants for this purpose that are defined during build time. Let's take a look at an example:

```js
const app = new App();

// This plugin is universal and works across both environments
app.register(LoggingPlugin);

// These plugins ONLY work on the server
if (__NODE__) {
  app.register(FileSystemPlugin);
}

// These plugins ONLY work on the browser
if (__BROWSER__) {
  app.register(BrowserApiPlugin);
}
```

The above entrypoint file uses the `__NODE__` and `__BROWSER__` constants to delineate which logic runs in which environments. We call these **code fences**. When Fusion.js code is built, the compiler will remove all code from a bundle if it does not match the given environment. So the server bundle will not have code marked as `__BROWSER__` only and vice versa.

These constants can be used across all universal code and help to contain code that belongs in the same environment together. Along with [Webpack tree shaking](https://webpack.js.org/guides/tree-shaking/) configured out of the box, this process keeps your Javascript bundles optimized and lean for maximum performance.

## One code base

Working in Fusion.js can be different than other frameworks because the code that you are writing is **one** shared code base. We believe that working with only one code base simplifies overhead in figuring out how to structure your project to ensure which code is run where, how to set up your compiler configs to write out the right bundles, and making sure your web app is architected correctly. Using code fences helps to separate out your environmental specific logic when you it.

In the [next section](/docs/core-concepts/core-packages), we'll cover the different packages that make up the framework.
