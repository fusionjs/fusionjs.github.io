---
title: Adding Data
path: /adding-data/
---

# Adding Data

In the previous section, we added the ability to fetch to-do items when our app loads. Now, let's add the ability to add new to-do items. We'll accomplish this by:

* Making a call in our component layer to add a new to-do item
* Adding a handler on the server side to add a new to-do item

Let's begin!

## Making a call in our component layer to add a new to-do item

In our component code, we have already wired up an event handler when the user presses the Enter key on the `<input>` box. Now, we just need to POST data when this occurs to our same handler. Add the following code to `src/components/root.js` inside of `handleOnKeydown`:

```js{8-14}
const handleOnKeydown = (e) => {
  if (e.key === 'Enter') {
    setInputText('');
    setTodos([
      ...todos,
      inputText
    ]);
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({value: inputText}),
    });
  }
};
```

Here, we are optimistically updating the UI and then firing the call to add our new to-do item. This is a great way to simulate a highly responsive application to the end user though it comes with its drawbacks, such as needing to add the ability to handle if the write actually failed. For now though, we'll assume that the call will always succeed.

We're sending the data as JSON to our server handler. Let's update the handler now to handle this POST call.

## Adding a handler on the server side to add a new to-do item

We already created a plugin to mount the `/api/todos` endpoint in a middleware function. That middleware currently only handles GET requests so let's add the code to support the POST now. Add the following lines of code to `src/plugins/todos.js`:

```js{5-9}
export default async (ctx, next) => {
  if (ctx.path === '/api/todos') {
    if (ctx.method === 'GET') {
      ctx.response.body = todos;
    } else if (ctx.method === 'POST') {
      const {value} = ctx.request.body;
      todos.push(value);
      ctx.response.status = 201;
    }
  }
  await next();
};
```

Here, we check the current method to see if it is a POST, then read `value` from the `request.body` property, push it to our in-memory data store, and return a `201` status code back to the browser. If you try and run this code though, you'll notice that it doesn't quite work yet. Adding to-do items work since the client will update independently but the actual call to write will fail.

### Adding koa-bodyparser

If you look at the [documentation for Koa](https://koajs.com/), you'll see that `ctx.request` doesn't actually have a `body` property. Luckily, Koa provides a middleware package called [`koa-bodyparser`](https://github.com/koajs/bodyparser) that can handle reading request headers to figure out how to parse incoming data. In our case, because we sent the data as `application/json`, `koa-bodyparser` will JSON parse that data for us. Let's go ahead and add that to our project.

First, install the package:

```sh
$ yarn add koa-bodyparser
```

Next, register the middleware with our app at `src/main.js`:

```js{4}
export default async function start() {
  const app = new App(Root);
  if (__NODE__) {
    app.middleware(require('koa-bodyparser')());
    app.middleware(TodosPlugin);
  }
  return app;
}
```

Now start your dev server with `yarn dev`. Add a few to-do items and when you refresh the page, you'll see that they are persisted on reloads now! Since this is just an in-memory data store, if the server is shut down, the items will be lost but adding permanant persistence is just another plugin integration away.

## Wrapping Up

We're done! By now you've seen that Fusion.js app are just a combination of:

* the same React components you know and love
* custom Fusion.js plugins to extend the behavior of the app
* third party Koa-compatible libraries

Hopefully this brief intro gives you a good taste for what kind of apps you can build with Fusion.js.

For more ideas, visit [Recipes](/docs/recipes) to see how to accomplish common web tasks with Fusion.js. And for deeper reading, view the [References](/docs/references).
