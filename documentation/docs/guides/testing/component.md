# Component testing

Use component testing to make assertions and validate your React component logic. We recommend using [Enzyme](https://github.com/airbnb/enzyme/blob/master/README.md) to test React components.

### Testing a functional React component

Test a functional React component with Enzyme's `shallow`
function. The subsections below show examples of different types of tests for React
components.

#### Testing props

This example defines a functional component that takes some props, renders them
via Enzyme's `shallow` function, and makes assertions on the output props.

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
import TagTitle from '../tag-title';

test('Normal title', () => {
  const mockData = {
    name: 'myTag',
    isLoading: false,
  };

  const output = shallow(<TagTitle {...mockData} />);
  const outputProps = output.props();

  expect(outputProps.style.borderRightWidth).toEqual('0px');
  expect(outputProps.children).toEqual('myTag');
});

test('Loading title', () => {
  const loadingMockData = {
    name: 'myTag',
    isLoading: true,
  };
  import React from 'react';

  const output = shallow(<TagTitle {...loadingMockData} />);
  const outputProps = output.props();

  expect(outputProps.style.borderRightWidth).toEqual('1px');
  expect(outputProps.children).toEqual('Deleting...');
});
```

#### Simulate click

This example defines a component with an `onClick` handler and uses
`jest.fn()` to check that the handler is called a click event is triggered.

```js
// src/components/delete-icon.js
import React from 'react';

export default ({id, deleteFn}) => <a onClick={() => deleteFn(id)}>Delete</a>;

// src/components/__tests__/delete-icon.node.js
import React from 'react';
import {shallow} from 'enzyme';
import DeleteIcon from '../delete-icon';

test('Delete button', () => {
  const mockData = {
    id: 'myTag',
  };

  const deleteFn = jest.fn();
  const wrapper = shallow(<DeleteIcon {...mockData} deleteFn={deleteFn} />);

  wrapper.find('a').simulate('click');
  expect(deleteFn.mock.calls.length).toEqual(1);
  expect(deleteFn.mock.calls[0][0]).toEqual(mockData.id);
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
import ExampleError from '../example-error';

test('Without an error', assert => {
  const wrapper = shallow(<ExampleError />);

  expect(wrapper.find('div').length).toEqual(1);
});

test('With an error', assert => {
  const wrapper = shallow(<ExampleError error={{stack: 'some stack'}} />);

  expect(wrapper.find('span').length).toEqual(1);
});
```

### Testing a React component with lifecycle methods

To test a React component's lifecycle methods, use Enzyme's
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
import TagsEditor from '../tags-editor';

test('Hydrated render of tags editor', () => {
  const mockHydratedData = {user: {name: 'Test Name'}};

  const getUser = jest.fn();
  const wrapper = mount(<TagsEditor {...mockHydratedData} getUser={getUser} />);

  expect(getUser.mock.calls.length).toEqual(0);
});

test('Requests data if not in props', () => {
  const mockUnhydratedData = {user: {}};

  const getUser = jest.fn();
  mount(<TagsEditor {...mockUnhydratedData} getUser={getUser} />);

  expect(getUser.mock.calls.length).toEqual(1);
});

test('Dont request data if errored', () => {
  const mockErredData = {user: {error: new Error()}};

  const getUser = jest.fn();
  mount(<TagsEditor {...mockErredData} getUser={getUser} />);

  expect(getUser.mock.calls.length).toEqual(0);
});
```
