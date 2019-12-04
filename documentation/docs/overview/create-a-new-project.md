---
title: Create a New Project
path: /create-a-new-project/
---

# Create a New Project

The easiest way to get started is to use the `create-fusion-app` package to scaffold a new Fusion.js project locally.

First, ensure you have the [Yarn](https://yarnpkg.com/lang/en/) package manager installed on your machine. Then, run the following command:

```sh
$ yarn create fusion-app my-fusion-app
```

The last argument provided will be used as the application name and for generating a project within your current working directory.

If you prefer to use `npm`, you can use the following command instead:

```sh
$ npx create-fusion-app my-fusion-app
```

Keep in mind however that Fusion.js assumes you are using `yarn` throughout development and production workflows, not `npm`.

For an overview of what the scaffold contains and how to use it, view the documentation for [create-fusion-app](https://github.com/fusionjs/fusionjs/tree/master/create-fusion-app).

## Creating a new project from scratch

While the scaffold is the recommended way to quickly bootstrap an application, setting up a new project from scratch is a great way to learn how the framework works. The core packages required are:

* `fusion-core`
* `fusion-cli`
* `fusion-tokens`

If you are using React (recommended), also install:

* `fusion-react`
* `react`
* `react-dom`

Use the following command to install all of this:

```sh
$ yarn add fusion-core fusion-react fusion-cli fusion-tokens react react-dom
```

Before embarking on this effort, check out the [Learning Fusion.js Tutorial](/docs/learning-fusionjs-tutorial). It is a guided walkthrough that specifically covers this usage case and walks through the thought process behind building a Fusion.js application.
