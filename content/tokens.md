# Tokens

Tokens are used by the Fusion.js [dependency injection](creating-a-plugin.md#dependency-injection) system to define the dependency tree of an application. Tokens are designed to bridge the gap between the type checking and runtime information. Your app may register your own Fusion.js plugin to a token to control behavior of your application or test.

## Type safety

Tokens provide type safety for applications by allowing for plugins to define the shape of their requirements. For example, anything registered with a type of Token<Logger>, must implement the Logger interface to pass type checking.

```js
// src/plugins/loggerPlugin.js
import {LoggerToken} from 'fusion-tokens';

export default createPlugin({
  deps: {logger: LoggerToken},
});

// src/main.js
// This would fail type checking due to LoggerToken not confirming to the expected interface.
// app.register(LoggerToken, { key: false });

// This will pass type checking due to console conforming to the shape of Token<Logger>
app.register(LoggerToken, console);
```

## Preventing collisions

Tokens allow Fusion.js developers to avoid collisions by using a reference to the token. In addition, tokens provide more value over pure type information This allows for multiple dependencies with the same types that are semantically different.

**Use case:**

* You have a Fusion.js application with many dependencies.
* One type of dependency is a function that takes a string and returns a string.
* There are are ten plugins in your application that conform to that type.

Matching the type is not enough information, while registering a token allows us to leverage the correct service for each token.
