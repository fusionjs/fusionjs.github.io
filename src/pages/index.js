import React from 'react';
import {styled} from 'styletron-react';
import Link from 'gatsby-link';
import Prism from 'prismjs';
import peopleImg from '../images/person.svg';
import alarm from '../images/alarm-clock.svg';
import help from '../images/help.svg';
import github from '../images/github.svg';
import {blueColor, white10Color} from '../components/style-settings';
import startup from '../images/startup.svg';
import strategy from '../images/strategy.svg';

const highlight = code =>
  Prism.highlight(code, Prism.languages.javascript, 'javascript');

const HeroContainer = styled('div', {
  width: '80%',
  margin: '100px auto 75px'
});

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

const Title = styled('h1', {
  textAlign: 'center',
  fontWeight: '200',
  textTransform: 'uppercase',
  fontSize: '80px',
  lineHeight: '1.25',
  margin: '20px 0',
  '@media (max-width: 890px)': {
    fontSize: '50px'
  }
});

const SubTitle = styled('h2', {
  textAlign: 'center'
});

const Description = styled('div', {
  textAlign: 'center'
});

const SectionHeader = styled('h3', {});

const Advantage = styled('div', {
  padding: '0 40px',
  flexGrow: '1',
  flexBasis: '400px',
});

const Snippet = styled('div', {
  flexBasis: '100%',
  overflow: 'auto',
  margin: '0',
  padding: '0 30px 0 0',
  maxWidth: '100%',
});

const FocusBlock = styled('div', {
  flex: '1 1 300px',
  padding: '16px 52px',
});

const LinkImg = styled('a', {
  color: 'inherit',
  backgroundColor: 'transparent',
});

const Image = styled('img', {
  margin: '20px 50px 40px',
  width: '150px',
  height: '150px',
});

const CTAContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  marginTop: '50px',
});

const CTALeftBox = styled('div', {
  backgroundColor: white10Color,
  padding: '30px 20px',
  width: '50%',
});

const CTARightBox = styled('div', {
  backgroundColor: 'black',
  color: '#33FF00',
  width: '50%',
  textAlign: 'left',
});

const CTATitle = styled('h3', {
  margin: 0,
});

const CTAPrimaryButton = styled(Link, {
  ':hover': {
    backgroundColor: 'black',
    borderColor: 'black',
    textDecoration: 'none',
  },
  backgroundColor: blueColor,
  border: `1px solid ${blueColor}`,
  color: 'white',
  cursor: 'pointer',
  display: 'inline-block',
  marginRight: '20px',
  minWidth: '140px',
  padding: '10px 0px',
});

const CTASecondaryButton = styled('a', {
  ':hover': {
    borderColor: 'black',
    color: 'black',
    textDecoration: 'none',
  },
  backgroundColor: 'white',
  border: `1px solid ${blueColor}`,
  color: blueColor,
  cursor: 'pointer',
  display: 'inline-block',
  minWidth: '140px',
  padding: '10px 0px',
});

const Home = () => {
  return (
    <div>
      <HeroContainer>
        <Title>Fusion.js</Title>
        <SubTitle>A plugin-based universal web framework</SubTitle>
        <Description>
          <p>
            Fusion.js gives you the developer experience you expect from a
            React/Redux setup and provides tools to take project quality to the
            next level.
          </p>
          <CTAContainer>
            <CTALeftBox>
              <CTATitle>Try it out!</CTATitle>
              <p>Get started building applications with Fusion.js in minutes.</p>
              <CTAPrimaryButton to="/docs/getting-started">Quick Start</CTAPrimaryButton>
              <CTASecondaryButton href="https://github.com/fusionjs" target="_blank">Github</CTASecondaryButton>
            </CTALeftBox>
            <CTARightBox>
              <pre
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
$ yarn create fusion-app my-fusion-app
$ cd my-fusion-app
$ yarn dev
                `
                }}
              />
            </CTARightBox>
          </CTAContainer>
        </Description>
      </HeroContainer>
      <AltContainer>
        <Image src={startup} />
        <Advantage>
          <SectionHeader>Build more, configure less</SectionHeader>
          <p>
            Universal plugins enable one-liner library integrations with even
            the most complex requirements
          </p>
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
        </Advantage>
      </AltContainer>
      <FlexContainer>
        <Image src={strategy} />
        <Advantage>
          <SectionHeader>Manage complexity like a boss</SectionHeader>
          <p>
            Testable, statically typed primitives that don't get in your way
          </p>
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
        </Advantage>
      </FlexContainer>
      <AltContainer>
        <FocusBlock>
          <SectionHeader>Core features</SectionHeader>
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
              And <Link to="/api/plugins">more</Link>
            </li>
          </ul>
        </FocusBlock>
      </AltContainer>
      <FlexContainer>
        <FocusBlock>
          <LinkImg to="/team">
            <img src={peopleImg} alt="Fusion.js core team" height="120px" />
          </LinkImg>
          <h4>Fusion.js Core Team</h4>
          <p>
            Meet the <Link to="/team">Fusion.js core team</Link>. They work on
            the Fusion.js core and default plugins. Start contributing and join
            us today!
          </p>
        </FocusBlock>
        <FocusBlock>
          <LinkImg to="/support">
            <img src={help} alt="Fusion.js support" height="120px" />
          </LinkImg>
          <h4>Need help?</h4>
          <p>
            Find out how to get help from the Fusion.js community on the{' '}
            <Link to="/support">support</Link> page.
          </p>
        </FocusBlock>
        <FocusBlock>
          <LinkImg href="https://github.com/fusionjs" target="_blank">
            <img src={github} alt="Fusion.js GitHub" height="120px" />
          </LinkImg>
          <h4>GitHub</h4>
          <p>
            Have a question about Fusion or want to contribute? Check it out on{' '}
            <a href="https://github.com/fusionjs">GitHub</a>.
          </p>
        </FocusBlock>
      </FlexContainer>
    </div>
  );
};

export default Home;
