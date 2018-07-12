import React from 'react';
import {styled} from 'styletron-react';
import Link from 'gatsby-link';
import Prism from 'prismjs';
import peopleImg from '../images/people.svg';
import alarm from '../images/alarm-clock.svg';
import chat from '../images/chat-message.svg';
import github from '../images/github.svg';
import {white10Color} from '../components/style-settings';
import balloons from '../images/balloons.png';
import airplane from '../images/airplane.png';

const highlight = code =>
  Prism.highlight(code, Prism.languages.javascript, 'javascript');

const FlexContainer = styled('div', ({styleProps = {}}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '52px',
  paddingBottom: '52px',
  alignItems: 'start',
  flexFlow: 'wrap',
  '@media (max-width: 890px)': {
    paddingTop: '16px',
    paddingBottom: '16px',
    alignItems: 'flex-start',
  },
  ...styleProps.overrides,
}));

const AltContainer = styled('div', ({styleProps = {}}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '52px',
  paddingBottom: '52px',
  paddingRight: '999px',
  marginRight: '-999px',
  marginLeft: '-27px',
  paddingLeft: '27px',
  backgroundColor: white10Color,
  flexFlow: 'wrap',
  alignItems: 'flex-start',
  '@media (max-width: 890px)': {
    paddingTop: '16px',
    paddingBottom: '16px',
    alignItems: 'flex-start',
  },
}));

const Title = styled('h2', {
  fontWeight: '200',
  fontSize: '3.5rem',
  lineHeight: '1.25',
  width: '40%',
  '@media (max-width: 890px)': {
    width: '100%',
    fontSize: '2.2em',
  },
});

const Description = styled('div', {
  width: '50%',
  paddingLeft: '52px',
  '@media (max-width: 890px)': {
    width: '100%',
    paddingLeft: '0',
  },
});

const SectionHeader = styled('h3', {});

const Advantage = styled('div', {
  padding: '0 50px',
  flexGrow: '1',
  flexBasis: '400px',
});

const Snippet = styled('div', {
  flexBasis: '670px',
  overflow: 'auto',
  padding: '0 50px',
  maxWidth: '100%',
});

const FocusBlock = styled('div', {
  flex: '1 1 320px',
  paddingLeft: '52px',
  paddingTop: '16px',
  paddingBottom: '16px',
  '@media (max-width: 1320px)': {
    flex: '1 1 450px',
  },
  '@media (max-width: 890px)': {
    flex: '1 1 320px',
  },
});

const LinkImg = styled('a', {
  color: 'inherit',
  backgroundColor: 'transparent',
});

const Image = styled('img', {
  padding: '20px 50px 40px',
});

const Home = () => {
  return (
    <div>
      <FlexContainer styleProps={{overrides: {alignItems: 'center'}}}>
        <Title>
          Fusion.js<br />
          <small>A Plugin-Based Universal Web Framework</small>
        </Title>
        <Description>
          <p>
            Fusion.js gives you the developer experience you expect from a
            React/Redux setup, and provides tools to take project quality to the
            next level.<br />
            <Link to="/docs/getting-started/create-a-project">
              Create a project &gt;
            </Link>
          </p>
        </Description>
      </FlexContainer>
      <AltContainer>
        <Image src={balloons} />
        <Advantage>
          <SectionHeader>Build more, configure less</SectionHeader>
          <p>
            Universal plugins enable one-liner library integrations with even
            the most complex requirements
          </p>
        </Advantage>
        <Snippet>
          <pre
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: highlight(`
import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';

const root = <div>...</div>;

export default () => {
  const app = new App(root);

  /*
  One line of code sets up everything you need for routing:
  - Server rendering
  - React Providers on both server and browser
  - Bundle splitting integration
  - HMR integration
  - Metadata hydration
  */
  app.register(Router);

  return app;
}
              `),
            }}
          />
        </Snippet>
      </AltContainer>
      <FlexContainer>
        <Image src={airplane} />
        <Advantage>
          <SectionHeader>Manage complexity like a boss</SectionHeader>
          <p>
            Testable, statically typed primitives that don't get in your way.
          </p>
        </Advantage>
        <Snippet>
          <pre
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: highlight(`
/* @flow */

import {createPlugin, createToken} from 'fusion/core';
import {UserServiceToken as User} from './user';
import {ProjectServiceToken as Project} from './project';

export const TeamServiceToken = createToken('TeamServiceToken');
export const TeamService = createPlugin({
  deps: {User, Project},
  provides: ({User, Project}) => ({
    async findByProjectId(projectId) {
      const {users} = await Project.findById(projectId);
      return Promise.all(users.map(id => User.findById(id)));
    },
  }),
});
              `),
            }}
          />
        </Snippet>
      </FlexContainer>
      <AltContainer>
        <FocusBlock>
          <SectionHeader>Core Features</SectionHeader>
          <ul>
            <li>Plugin-based architecture and DI system for maintainability</li>
            <li>
              Out-of-the-box support for server-rendering of React components,
              bundle splitting and hot module reloading
            </li>
            <li>Tree-shaking support on universal code</li>
            <li>
              Ready-to-use testing environment with Jest, Enzyme, Puppeteer and
              integration test utilities
            </li>
          </ul>
        </FocusBlock>
        <FocusBlock>
          <SectionHeader>Plugin integrations</SectionHeader>
          <ul>
            <li>
              <Link to="/api/fusion-plugin-react-redux/">Redux</Link>:
              automatically set up Redux for server-side rendering and
              client-side store hydration
            </li>
            <li>
              <Link to="/api/fusion-plugin-react-router/">React Router</Link>:
              automatically integrate with the core SSR, HMR and bundle
              splitting systems
            </li>
            <li>
              Data fetching: supports{' '}
              <Link to="/api/fusion-plugin-rpc-redux-react/">
                RPC-driven composable data fetching
              </Link>{' '}
              and <Link to="/api/fusion-apollo">GraphQL/Apollo</Link>
            </li>
            <li>
              Security: automatically setup{' '}
              <Link to="/api/fusion-plugin-csrf-protection">
                CSRF protection
              </Link>{' '}
              on endpoints
            </li>
            <li>
              Quality metrics: easily consume{' '}
              <Link to="/api/fusion-plugin-node-performance-emitter">
                server performance
              </Link>{' '}
              and{' '}
              <Link to="/api/fusion-plugin-browser-performance-emitter">
                browser performance
              </Link>{' '}
              logging,{' '}
              <Link to="/api/fusion-plugin-error-handling">error logging</Link>{' '}
              and{' '}
              <Link to="/api/fusion-plugin-universal-events">
                generic event streams
              </Link>
            </li>
            <li>
              Performance: easily opt into performance-oriented paradigms such
              as atomic CSS (via{' '}
              <Link to="/api/fusion-plugin-styletron-react">Styletron</Link>),
              and{' '}
              <Link to="/api/fusion-plugin-font-loader-react">
                font lazy-loading strategies
              </Link>
            </li>
            <li>
              <Link to="/api/fusion-plugin-i18n-react">I18N</Link>:
              Automatically set up efficient bundle-splitting-aware translation
              loading
            </li>
            <li>
              and <Link to="/api/fusion-docs/">more</Link>
            </li>
          </ul>
        </FocusBlock>
      </AltContainer>
      <FlexContainer>
        <FocusBlock>
          <Link to="/team">
            <img src={peopleImg} alt="Fusion.js Core Team" height="120px" />
          </Link>
          <h4>Fusion.js Core Team</h4>
          <p>
            Meet the <Link to="/team">Fusion.js core team</Link>. They work on
            the Fusion.js core and default plugins. Start contributing and join
            us today!
          </p>
        </FocusBlock>
        <FocusBlock>
          <Link to="/support">
            <img src={chat} alt="Fusion.js support" height="120px" />
          </Link>
          <h4>Need Help?</h4>
          <p>
            Find out how to get help from the Fusion.js community on the{' '}
            <Link to="/support">support</Link> page.
          </p>
        </FocusBlock>
        <FocusBlock>
          <LinkImg href="https://github.com/fusionjs" target="_blank">
            <img src={github} alt="Fusion.js Github" height="120px" />
          </LinkImg>
          <h4>Github</h4>
          <p>
            Have a question about Fusion or want to contribute? Check it out on{' '}
            <a href="https://github.com/fusionjs">Github</a>.
          </p>
        </FocusBlock>
      </FlexContainer>
    </div>
  );
};

export default Home;
