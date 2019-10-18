---
title: "WebSockets"
path: /websockets
---

# WebSockets

Fusion.js supports WebSockets through the [`HttpServerToken`](/api/fusion-core#httpservertoken) exported from `fusion-core`. This token represents the current running instance of the Node [`http.Server`](https://nodejs.org/api/http.html#http_class_http_server) class and can be used to manually respond to the HTTP upgrade event necessary for WebSocket handshaking.

### Example

The following example uses the `HttpServerToken` inside of a plugin to set up a WebSocket connection. The Node [`ws`](https://github.com/websockets/ws) library is used for this example but any library could be used as long as it has an interface to handshake with an existing `http.Server` instance.

```js
import {createPlugin, HttpServerToken} from 'fusion-core';
import WebSocket from 'ws';

export default __SERVER__ && createPlugin({
  deps: {httpServer: HttpServerToken},
  provides: deps => {
    const {httpServer} = deps;
    const wss = new WebSocket.Server({noServer: true});

    wss.on('connection', ws => {
      ws.on('message', data => {
        // Respond to message here
      });

      ws.on('close', (...args) => {
        // Respond to socket close
      });
    });

    wss.on('error', () => {
      // Respond to socket error
    });

    httpServer.on('upgrade', (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
      });
    });

    // Optionally return the websocket connection here to allow other plugins to access the connection
    return wss;
  },
  middleware: () => {
    // If you don't need to provide the wss object you can register the websocket connection here instead
  },
});
```

From the client side, using a standard [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket) class is sufficient to connect to the server using the `wss://` protocol.
