# Integration testing

Integration tests verify that your modules work together as expected. They open your application within a browser, and perform actions in the same way that an end user would.

* [Overview](#overview)
* [Example Puppeteer test](#example-puppeteer-test)
* [Debugging tests](#debugging-tests)
  * [Headless mode](#headless-mode)
  * [Screenshots](#screenshots)
* [Common pitfalls](#common-pitfalls)
  * [Appropriate waiting](#appropriate-waiting)
  * [Resiliant selectors](#resiliant-selectors)

## Overview

We currently recommend using [puppeteer](https://github.com/GoogleChrome/puppeteer) for integration testing.

## Example Puppeteer test

```js
/* eslint-env node */
import puppeteer from 'puppeteer';

test('Page has content', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  const content = await page.content();
  expect(content.length > 0).toEqual(true);
  await page.close();
  await browser.close();
});
```

## Debugging tests

Integration tests can be incredibly useful for catching errors before they hit production, but also tricky to debug without the right tooling. Here's a few tools which you can use to debug your tests, and ensure that they don't fail intermittently.

### Headless mode

Puppeteer launches Chromium in headless mode by default. To launch a full version of Chromium, set the 'headless' option when launching a browser. This can be useful when debugging as you can see the actual browser window.

```js
const browser = await puppeteer.launch({headless: false}); // default is true
```

### Screenshots

Screenshots are a very useful tool for recording the state of a page at a given point within your test. You can have your test always record screenshots, or only when there's an unexpected error.

```js
await page.goto('https://www.uber.com');
await page.screenshot({ path: 'screenshots/homepage.png' });
```

## Common pitfalls

Care must be used when writing an integration test to ensure that intermittently failing tests are avoided. Here are some strategies you can use to ensure that your tests are more resilient to failure.

### Appropriate waiting

Waiting for a set amount of milliseconds can be prone to failure due to undeterministic load times, or running on different classes of hardware. You should always avoid waiting for a set amount of time, and instead opt to wait for some condition to be true.

```js
// Never do this as it's prone to failure.
await page.waitFor(5000);

// This is good, we wait for the element to appear.
// This could be used at any time, for example, after starting the test or clicking on a link.
await page.waitForSelector('.some-thing-present');

// A more complex wait, where we wait for a DOM condition to be true.
await page.waitFor(async () => {
  const content = await page.content();
  return content.includes('some-delayed-content');
});
```

### Resiliant selectors

Building integration tests with unsuitable selectors can cause unexpected failures and lost productivity. It is often not a good idea to query for selectors which are only used for presentational cases, as these change and cause tests to break. We are currently investing adding deterministic querying capabilities using enzyme selectors alongside puppeteer. Here's a few examples of selectors to use, and some to avoid.

```js
// Bad selector, not specific enough and only based on presentation.
'.col-2 span';

// Bad selector, this is more specific, but could easily break if another list was added to the page.
'ul li:first-child span';

// A good selector, based on semantic tag names and specific attributes.
'ul#past-trips li:first-child img.avatar';

// A good selector as it's clear this is used for testing.
// Occasionally it may be necessary to add custom hooks for testing.
// Data attributes are one way of doing this, and we recommend prefixing with `data-test-`
'[data-test-custom-hook]';
```
