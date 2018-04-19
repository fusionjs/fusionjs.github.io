import React from 'react';
import {styled} from 'styletron-react';
import Link from 'gatsby-link';
import peopleImg from '../images/people.svg';
import alarm from '../images/alarm-clock.svg';
import chat from '../images/chat-message.svg';
import github from '../images/github.svg';
import {white10Color} from '../components/style-settings';

const FlexContainer = styled('div', ({styleProps = {}}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '52px',
  paddingBottom: '52px',
  alignItems: 'center',
  '@media (max-width: 890px)': {
    paddingTop: '16px',
    paddingBottom: '16px',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  ...styleProps.overrides,
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

const Home = () => {
  return (
    <div>
      <FlexContainer>
        <Title>Developing websites with Fusion.js</Title>
        <Description>
          <p>
            What is Fusion.js? How do I create a new Fusion.js application? What
            are Fusion.js plugins? How do I add a new page or create some new
            feature in my Fusion.js web application? What do I do if I'm stuck?
            Find the answers and more in our{' '}
            <Link to="/docs/getting-started">
              Developing Web Applications with Fusion.js
            </Link>.
          </p>
        </Description>
      </FlexContainer>
      <FlexContainer
        styleProps={{
          overrides: {
            paddingRight: '999px',
            marginRight: '-999px',
            marginLeft: '-52px',
            backgroundColor: white10Color,
            flexFlow: 'wrap',
            alignItems: 'flex-start',
            '@media (max-width: 890px)': {
              paddingTop: '16px',
              paddingBottom: '16px',
            },
          },
        }}
      >
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
        {/*}
        <FocusBlock>
          <LinkImg
            href="https://groups.google.com/a/uber.com/forum/#!forum/fusion-js"
            target="_blank"
          >
            <img src={alarm} alt="Fusion.js Google group" height="120px" />
          </LinkImg>
          <h4>Fusion.js@ Email List</h4>
          <p>
            Join the{' '}
            <a
              href="https://groups.google.com/forum/#!forum/fusion-js"
              target="_blank"
            >
              Fusion.js Google Group
            </a>{' '}
            to get Fusion.js release announcements and discuss Fusion.js related
            topics.
          </p>
        </FocusBlock>
        */}
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
