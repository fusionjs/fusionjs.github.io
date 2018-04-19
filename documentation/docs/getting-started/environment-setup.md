---
title: Environment setup
path: /environment-setup/
---

# Environment setup

All initial prototyping and development should be performed on your local
machine. Web projects use Node.js for transpilation, bundling, and HTTP request
handling, and they use the NPM ecosystem for various pieces of functionality,
from client-side libraries to developer tooling.

### Global dependency versions

We have standardized around package.json's `engines` fields as a way to specify
the intended versions for building and running a Web App/Service. We recommend that you keep them up-to-date.
An example might look like:

```json
{
  "engines": {
    "node": "8.11.1",
    "npm": "5.6.0",
    "yarn": "1.6.0"
  }
}
```

#### Node.js

Make sure you're on the latest LTS release of Node.js. To check your Node.js
version, run:

```sh
node --version
```

You can use [`nvm`](https://github.com/creationix/nvm) to manage Node.js
versions locally. `nvm` is a common tool used to switch Node versions and manage
environments between different versions.

#### Yarn

We recommend that you use [yarn](https://yarnpkg.com/en/) for package
management. The Yarn team recommends installing the executable via
[brew](https://yarnpkg.com/en/docs/install#mac-tab) on MacOS.

To install it, run

```sh
brew install yarn
```

To verify your yarn version, run:

```sh
yarn --version
```

When you need to upgrade your yarn version, run

```sh
brew upgrade yarn
```
---

### Troubleshooting

**What versions of Node.js and npm can I use for my web frontend service?**

We recommend using the latest LTS release.

**What is SyntaxError: Unexpected token and how do I fix it?**

Some JS syntax in your project or one of its dependencies is not compatible with
the current Node version. This usually happens when you attempt to run ES2015
code on node 0.10. Upgrade the affected dependency, modify the code to support
the desired node version, or change the required Node version to support the
syntax.

---

### Next steps

- [Create a project](/docs/getting-started/create-a-project)
