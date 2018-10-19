---
title: Run your project
path: /run-project/
---

# Run your project

### Development mode

To run your project in development mode, run:

```sh
yarn dev
```

This enables hot module reloading, integration with various dev tools, etc.

The command above also starts the Fusion.js HTTP server. The development site
will be available at `http://localhost:3000`.

### Production mode

It's sometimes useful to run a project in production mode, for example, to check
bundle size or to debug a production-only issue. To run your project in
production mode locally, run:

```sh
yarn build-production && NODE_ENV=production yarn start
```

**Note**: Development tooling such as hot reloading is not available in
production builds.

### NPM scripts

Fusion.js provides various CLI commands that you can run via `yarn run`. For
example, to run the application in development mode, run `yarn run fusion dev`.

```json
{
  "scripts": {
    "dev": "fusion dev",
    "test": "fusion test",
    "cover": "fusion test --cover",
    "build": "fusion build",
    "build-production": "fusion build --production",
    "start": "PORT_HTTP=\"$PORT_HTTP\" fusion start"
  }
}
```

#### `yarn run fusion --help`

Shows Fusion.js CLI help. Get contextual help for each individual
command by passing `--help` as an argument to a command. For example, to see
what options are available to the `dev` command, run `yarn run fusion dev --help`

#### `yarn dev`

Starts the development mode server (with hot module reloading, etc.)

* `yarn dev --debug` - Enables debugger socket. See
  [Node.js inspector docs for more information](https://nodejs.org/en/docs/inspector).
* `yarn dev --port=1234` - Specifies what port the app should run on
* `yarn dev --no-open` - Don't open browser window automatically
* `yarn dev --no-hmr` - Disables hot module reloading
* `yarn dev --log-level=level` - Filters logs by level. Valid levels are:
  `error`, `warn`, `info`, `verbose`, `debug`, `silly`
* `yarn dev --dir=dir` - Specify the root directory for the application,
  relative to cwd. Defaults to `.`

#### `yarn test`

Runs tests

* `yarn test --cover` - Also runs test coverage
* `yarn test --skip-build` - Tests existing assets without recompiling
* `yarn test --watch` - Re-runs tests when files change
* `yarn test --dir=dir` - Specify the root directory for the application,
  relative to cwd. Defaults to `.`

#### `yarn cover`

Runs test coverage

#### `yarn build`

Builds a development bundle without starting the server

* `yarn build --test` - Builds test assets in addition to development assets
* `yarn build --cover` - Builds test assets with coverage instrumentation in
  addition to development assets
* `yarn build --production` - Builds production assets
* `yarn build --dir=dir` - Specify the root directory for the application,
  relative to cwd. Defaults to `.`

#### `yarn build-production`

Builds a production bundle

#### `yarn start`

Runs a bundle that was built via `yarn build`

* `yarn start --environment=env` - Runs the app as if running in a specific
  environment. Valid environments are: `development`, `production`
* `yarn start --dir=dir` - Specify the root directory for the application,
  relative to cwd. Defaults to `.`


<!--
#### `yarn lint`

Runs eslint

#### `yarn profile`

Opens source-map-explorer

* `yarn profile --environment` - Profiles assets for a specific environment.
  Valid values are: `development`, `production`
* `yarn profile --watch` - Updates source-map-explorer on file change
* `yarn profile --file-count` - Limit the number of files to display when
  showing list of largest files
* `yarn profile --dir=dir` - Specify the root directory for the application,
  relative to cwd. Defaults to `.`
-->

---

### Next steps

* [Core Concepts](/docs/getting-started/core-concepts)
