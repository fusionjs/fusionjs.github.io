# Component testing

Component testing allows you to make assertions and validate your React component logic. We recommend using [enzyme](https://github.com/airbnb/enzyme/blob/master/README.md) to test React components.

### Testing a functional React component

Test a functional React component with enzyme's `shallow`
function. The subsections below show examples of different types of tests for React
components.

#### Testing props

This example defines a functional component that takes some props, renders them
via enzyme's `shallow`, and makes assertions on the output props.

```js
// src/components/tag-title.js
import React from 'react';

export default ({name, isLoading}) => (
  <div style={{borderRightWidth: isLoading ? '1px' : '0px'}}>
    {isLoading ? 'Deleting...' : name}
  </div>
);

// src/components/__tests__/tag-title.node.js
import React from 'react';
import {shallow} from 'enzyme';
import {test} from 'fusion-test-utils';
import TagTitle from '../tag-title';

test('Normal title', assert => {
  const mockData = {
    name: 'myTag',
    isLoading: false,
  };

  const output = shallow(<TagTitle {...mockData} />);
  const outputProps = output.props();

  assert.equal(outputProps.style.borderRightWidth, '0px', 'no border');
  assert.equal(outputProps.children, 'myTag', 'correct title');
});

test('Loading title', assert => {
  const loadingMockData = {
    name: 'myTag',
    isLoading: true,
  };
  import React from 'react';

  const output = shallow(<TagTitle {...loadingMockData} />);
  const outputProps = output.props();

  assert.equal(outputProps.style.borderRightWidth, '1px', 'no border');
  assert.equal(outputProps.children, 'Deleting...', 'correct title');
});
```

#### Simulate click

This example defines a component with an `onClick` handler and uses fusion-test-utils'
`mockFunction` to check that the handler is called a click event is triggered.

```js
// src/components/delete-icon.js
import React from 'react';

export default ({id, deleteFn}) => <a onClick={() => deleteFn(id)}>Delete</a>;

// src/components/__tests__/delete-icon.node.js
import React from 'react';
import {shallow} from 'enzyme';
import {test, mockFunction} from 'fusion-test-utils';
import DeleteIcon from '../delete-icon';

test('Delete button', assert => {
  const mockData = {
    id: 'myTag',
  };

  const deleteFn = mockFunction();
  const wrapper = shallow(<DeleteIcon {...mockData} deleteFn={deleteFn} />);

  wrapper.find('a').simulate('click');
  assert.equal(
    deleteFn.mock.calls.length,
    1,
    'delete function only called once'
  );
  assert.equal(
    deleteFn.mock.calls[0][0],
    mockData.id,
    'delete function called with correct id'
  );
});
```

#### Test for presence

This example tests success and error states for a component by asserting on the
expected shape of the output.

```js
// src/components/example-error.js
import React from 'react';

export default class ExampleError extends Component {
  render() {
    const {error} = this.props;

    if (error) {
      return <span>{error.stack}</span>;
    }
    return <div>No Errors Here</div>;
  }
}

// src/components/__tests__/example-error.node.js
import React from 'react';
import {shallow} from 'enzyme';
import {test} from 'fusion-test-utils';
import ExampleError from '../example-error';

test('Without an error', assert => {
  const wrapper = shallow(<ExampleError />);

  assert.equal(wrapper.find('div').length, 1, 'renders a div');
});

test('With an error', assert => {
  const wrapper = shallow(<ExampleError error={{stack: 'some stack'}} />);

  assert.equal(wrapper.find('span').length, 1, 'renders error');
});
```

### Testing a React component with lifecycle methods

To test a React component's lifecycle methods, use enzyme's
`mount` function. The `mount` function requires tests to be run in a browser
environment.

In the example below, we're interested in testing that the `getUser` function
gets called only if `user.name` and `user.error` are both falsy.

```js
// src/components/tags-editor.js
import React from 'react';

export default class TagsEditor extends Component {
  componentDidMount() {
    const {name, error} = this.props.user;
    if (!error && !name) {
      this.props.getUser();
    }
  }

  render() {
    const {user} = this.props;
    return (
      <div>
        <h1>{user.name}</h1>
      </div>
    );
  }
}

// src/components/__tests__/tags-editor.browser.js
import React from 'react';
import {mount} from 'enzyme';
import {test, mockFunction} from 'fusion-test-utils';
import TagsEditor from '../tags-editor';

test('Hydrated render of tags editor', assert => {
  const mockHydratedData = {user: {name: 'Test Name'}};

  const getUser = mockFunction();
  const wrapper = mount(<TagsEditor {...mockHydratedData} getUser={getUser} />);

  assert.equal(getUser.mock.calls.length, 0, 'getUser not called');
});

test('Requests data if not in props', assert => {
  const mockUnhydratedData = {user: {}};

  const getUser = mockFunction();
  mount(<TagsEditor {...mockUnhydratedData} getUser={getUser} />);

  assert.equal(getUser.mock.calls.length, 1, 'getUser called');
});

test('Dont request data if errored', assert => {
  const mockErredData = {user: {error: new Error()}};

  const getUser = mockFunction();
  mount(<TagsEditor {...mockErredData} getUser={getUser} />);

  assert.equal(getUser.mock.calls.length, 0, 'getUser not called');
});
```
