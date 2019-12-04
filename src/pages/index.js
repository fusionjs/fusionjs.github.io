import React from 'react';
import {styled} from 'styletron-react';
import Link from 'gatsby-link';
import {OutboundLink} from 'gatsby-plugin-google-analytics';
import Prism from 'prismjs';
import peopleImg from '../images/person.svg';
import alarm from '../images/alarm-clock.svg';
import help from '../images/help.svg';
import github from '../images/github.svg';
import {blueColor, white10Color} from '../components/style-settings';
import strategy from '../images/strategy.svg';
import jigsaw from '../images/jigsaw.svg';

const highlight = code =>
  Prism.highlight(code, Prism.languages.javascript, 'javascript');

const HeroContainer = styled('div', {
  width: '80%',
  margin: '25px auto 75px',
});

const VideoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  margin: '0 auto 75px',
});

const FlexContainer = styled('div', ({styleProps = {}}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '42px',
  paddingBottom: '42px',
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
  paddingTop: '42px',
  paddingBottom: '42px',
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
    fontSize: '50px',
  },
});

const SubTitle = styled('h2', {
  textAlign: 'center',
});

const Description = styled('div', {
  textAlign: 'center',
});

const SectionHeader = styled('h3', {});

const Advantage = styled('div', {
  padding: '0 20px',
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
  color: white10Color,
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

const CTASecondaryButton = styled(OutboundLink, {
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

const HomeLayout = styled('div', {
  '@media (max-width: 800px)': {
    width: '100%',
  },
  margin: '0 auto',
  width: '970px',
});

const trackQuickStart = () => {
  if (window.ga) {
    window.ga('send', 'event', 'click', 'home', 'quick_start');
  }
};

const Home = () => {
  return (
    <HomeLayout>
      <HeroContainer>
        <Title>Fusion.js</Title>
        <SubTitle>Modern framework for fast, powerful React apps</SubTitle>
        <Description>
          <p>
            Fusion.js gives you the developer experience you expect from a
            React setup and provides tools to take project quality to the
            next level.
          </p>
          <CTAContainer>
            <CTALeftBox>
              <CTATitle>Try it out!</CTATitle>
              <p>
                Get started building applications with Fusion.js in minutes.
              </p>
              <CTAPrimaryButton
                to="/docs/overview"
                onClick={trackQuickStart}
              >
                Quick Start
              </CTAPrimaryButton>
              <CTASecondaryButton
                href="https://github.com/fusionjs/fusionjs"
                target="_blank"
              >
                Github
              </CTASecondaryButton>
            </CTALeftBox>
            <CTARightBox>
              <pre
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
$ yarn create fusion-app my-fusion-app
$ cd my-fusion-app
$ yarn dev
                `,
                }}
              />
            </CTARightBox>
          </CTAContainer>
        </Description>
      </HeroContainer>
      <VideoContainer>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/s-F1O5vnavk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </VideoContainer>
      <AltContainer>
        <Image src={jigsaw} />
        <Advantage>
          <SectionHeader>Plugin architecture</SectionHeader>
          <p>
            Encapsulate complex logic into a single plugin and register it in
            one line.
          </p>
          <Snippet>
            <pre
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: highlight(`
import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';

export default () => {
  const app = new App(<div>...</div>);

  /*
  One line of code sets up everything you need for routing:
  - Server rendering
  - React Providers on both server and browser
  - Bundle splitting integration
  - Hot module reloading support
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
          <SectionHeader>Universal code</SectionHeader>
          <p>
            Write your server and client code together and Fusion will take care
            of the rest.
          </p>
          <Snippet>
            <pre
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: highlight(`
import App from 'fusion-react';
import SecureHeadersPlugin from './plugins/secure-headers-plugin';

export default () => {
  const app = new App(<div>...</div>);

  // Register this plugin only on the server
  if (__NODE__) {
    app.register(SecureHeadersPlugin);
  }

  return app;
}
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
            <li>
              Ready-to-use testing environment with Jest, Enzyme, Puppeteer and integration test utilities
            </li>
            <li>
              Out-of-the-box support for server-rendering of React components,
              bundle splitting and hot module reloading
            </li>
            <li>
              Automatic tree-shaking support on universal code to remove unused
              lines
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
              Data fetching: supports{' '}
              <Link to="/api/fusion-plugin-rpc-redux-react/">
                RPC-driven data fetching
              </Link>{' '}
              and <Link to="/api/fusion-plugin-apollo">GraphQL/Apollo</Link>
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
              And <Link to="/api/plugins">more</Link>!
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
            <OutboundLink href="https://github.com/fusionjs">
              GitHub
            </OutboundLink>
            .
          </p>
        </FocusBlock>
      </FlexContainer>
    </HomeLayout>
  );
};

export default Home;
