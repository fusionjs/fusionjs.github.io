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

---

### Static configuration

The standard way to configure plugins in Fusion.js is to register the configuration values into the DI system via `app.register`. To support configuration tree shaking, we recommended keeping configuration in .js files rather than .json files.

If you have to add a new plugin to `app.js`, you should still separate configuration into an appropriate file in `src/config` in order to keep configuration code discoverable for future project maintainers.
