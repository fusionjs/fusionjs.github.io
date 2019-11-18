---
title: Snapshot testing
path: /snapshot
---

# Snapshot testing

Snapshot testing is one possible way of preventing regressions by surfacing differences in components and objects. These tests may be run in either Node or browser environments, and against components or data structures. When snapshots need to be updated, you can update them with: `yarn test --updateSnapshot`. For more information see the [Jest snapshot testing documentation](https://facebook.github.io/jest/docs/en/snapshot-testing.html).

Example of snapshot testing a component:

```js
import React from 'react';
import {test} from 'fusion-test-utils';
import {shallow} from 'enzyme';

import MyComponent from '../MyComponent';

test('MyComponent', async assert => {
  const wrapper = shallow(<MyComponent />);
  assert.matchSnapshot(wrapper);
});
```

Snapshot testing a serializable object:

```js
import React from 'react';

import someLogic from '../logic';

test('test that should match snapshot', () => {
  const fixture = ['some', 'data', 'here'];
  expect(someLogic(fixture)).toMatchSnapshot();
});
```
