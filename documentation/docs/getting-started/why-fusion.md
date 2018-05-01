---
title: Why Fusion.js
path: /why-fusion/
---

# Why Fusion.js

Fusion.js is a collection of modern abstractions built from the ground up. It reflects today's best practices in web development and improves in many of the areas where other frameworks come up short.

### Benefits of Fusion.js

#### Developer productivity

Fusion.js was built from the ground up for modern, React and React-like apps; it includes a lot of core developer experience benefits:

* Features [React Router 4 style routing](/docs/guides/routing#component-based-routing), [composable data fetching](/docs/guides/fetching-data#use-rpc-method-in-a-component), and [internationalization](/docs/guides/internationalization#translations) using higher order components
* Unlocks the ability to write [universal code](/docs/guides/universal-rendering) that can be shared across browser and server render via a [lifecycle abstraction](/api/fusion-docs/creating-a-plugin) inspired by Koa middlewares and build-time environment fencing
* Out-of-the-box [build tooling](/api/fusion-cli) that supports modern stage 3+ EcmaScript features (like async/await), hot module reloading, and bundle splitting, with no configuration
* Faster dependency installer, build system, and test runner

#### Maintainability

One of Fusion's goals was to have a more maintainable and easily-upgradeable architecture that could last for years to come:

* Fusion's [universal plugin architecture](/api/fusion-docs/creating-a-plugin) is its core feature; every single feature is added through a set of [open source](/api/plugins) plugins and your own plugins as well.
* Plugins are self-contained entities (though some may have dependencies); this means that we can easily upgrade plugins as-needed and we don't need to upgrade the entire system.
* For each breaking change release, we intend to introduce codemods for even simpler migrations.

#### Performance

Fusion was created with development and performance in mind, and was built with a focus on a lightweight, flexible system:

* Initial DOMContentLoaded is fast. We've removed asset URLs, translations, and experiments from the application state sent down in the page body; now they are split per page-bundle, resulting in minimal HTML page size
* Our vendor JavaScript bundle small through usage of our modern build system, and we still have more improvements to come
* Brotli compression is turned on by default, resulting in another 15-20% improvement on modern browsers (Edge, Chrome, Safari, Firefox, etc.)
* [Bundle splitting](/docs/guides/routing#async-loading-routes) is extremely easy, allowing you to break down large applications into smaller parts and loading as necessary; in addition, we split translations, asset URLs and experiments along with each new bundle
* Performance gains can easily be added into the system over time because of the way the core libraries and build tooling work; we already plan to improve our vendor bundle size even more, create ES2015-specific code bundles (no polyfill or babel-transpiled code) and Preact-fusion plugins (Preact is 87% smaller than React).

#### Quality

We've improved a lot of tooling and APIs to increase the overall quality of our web applications, including:

* Fusion's core plugin system was built to be easily testable through what we call "[simulation testing](/docs/guides/testing/simulation)"; this allows you to test your application easily and in isolation
* Fusion also ships with improved test APIs for doing both [snapshot](/docs/guides/testing/snapshot) and [integration](/docs/guides/testing/integration) tests, allowing you to increase the quality of your app through various different test types
* [Flow typing](/docs/guides/typing) is included out-of-the-box; we still have a bit more work left in order to fully type the Fusion architecture, but even without that adding Flow types to applications will lessen errors
* We've added [Yarn](https://yarnpkg.com/en/) as our dependency installer, which means we will now get consistent builds across local, CI and prod using [lockfiles](https://yarnpkg.com/lang/en/docs/yarn-lock/); it's also faster than npm!

#### Same core technologies

All of these changes can be daunting, but much of them are in the core architecture and build system, meaning:

* The core technologies of all of Uber's web applications — React and Redux — remain the same in Fusion; this means the vast majority of application code: components, state management, data fetching will not need to change much in order to get many of Fusion's benefits
* For major performance improvements, though, there may need to be changes in areas around [font loading](/docs/guides/performance#font-preloading), using heavy 3rd-party dependencies and using the old Superfine CSS file (vs [Styletron](https://github.com/rtsao/styletron))

#### Unified documentation & open source development

Documentation and open-source-first development has been a core tenet of Fusion’s development.

* We’ve created a large set of guides, tutorials and Fusion core/plugin API docs that all sit on a [website](/docs/getting-started); you can make pull requests for documentation improvements as well as create tasks/issues directly from the documentation site
* Fusion.js is open source, so major changes will be proposed and discussed through the [transparent RFC process](https://github.com/fusionjs/rfcs)

---

### Next steps

* [Required knowledge](/docs/getting-started/required-knowledge)
