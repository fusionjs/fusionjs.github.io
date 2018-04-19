---
title: Security
path: /security/
---

# Security

Fusion.js plugins can allow for secure application development, plugins are provided to:

* CSRF protection
* Frameguard
* Content security policy

Most of these require no configuration from you.

---

### Configuring CSRF protection rules

By default, any [non-idepotent HTTP method](http://restcookbook.com/HTTP%20Methods/idempotency/) is protected by this plugin.

A CSRF (cross-site request forgery) attack happens if a victim visits a malicious website, and that website triggers a spoofed request via Javascript to execute an unwanted actions on a web application in which the victim is currently authenticated. CSRF protection ensures that a malicious site cannot trigger such requests by requiring a token to be associated with state-changing requests. This token cannot be spoofed thanks to security restrictions built into how browsers deal with cross-site javascript-based requests.

Some examples of CSRF attacks include a maliciously crafted facebook link that triggers expensive operations on a user's behalf, or one that forges a request to your backend. You should never disable CSRF protection.

It's possible to create a whitelist of URLs where CSRF protection is disabled if rare exceptions need to be made. For example, it is critical for error logging requests to be accepted by the server, rather than being blocked if they're missing a CSRF token, and error logging requests from Fusion.js are done with POST requests, which are subject to CSRF protection.

To add this exception to the whitelist, use the `CsrfIgnoreRoutesToken` configuration value:

```js
// src/app.js
import {CsrfIgnoreRoutesToken} from 'fusion-plugin-csrf-protection-react';

app.register(CsrfIgnoreRoutesToken, ['/_errors']);
```

---

### dangerouslySetHTML

When authoring plugins that affect the server-rendered template, you will often need to add values to the `ctx.template.head` and `ctx.template.body` arrays.

These values must be sanitized HTML values, which are produced by the `html` template tag. Sanitized HTML values are actually not strings at all. This restriction exists to prevent potential XSS attacks. You should always use `html` when hard-coding HTML into the template:

```js
import {html} from 'fusion-core';

export default __NODE__ &&
  createPlugin({
    middleware() {
      return (ctx, next) => {
        ctx.template.head.push(
          html`<meta name="viewport" content="width=device-width, initial-scale=1">`
        );
      };
    },
  });
```

The `html` template tag automatically escapes interpolated values via the `escape` utility function.

```js
import {escape} from 'fusion-core'; // note: this is not the same as the global.escape function!
```

There's another function called `dangerouslySetHTML` which disables protection against XSS attack. Needless to say, you should never use this function, unless you have taken care to manually call `escape` on ALL user data, _and_ added tests to ensure your custom sanitization code works correctly.
