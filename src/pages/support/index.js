import React from 'react';
import {styled} from 'styletron-react';
import support from '../../images/support.svg';
import chat from '../../images/chat-message.svg';
import webDevGroup from '../../images/web-dev-group.svg';
import stack from '../../images/stack.svg';
import uchat from '../../images/uchat.svg';
import bug from '../../images/bug.svg';
import {white10Color} from '../../components/style-settings';

const FlexContainer = styled('div', ({styleProps = {}}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '52px',
  paddingBottom: '52px',
  alignItems: 'center',
  '@media (max-width: 890px)': {
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  ...styleProps.overrides,
}));

const Title = styled('h2', {
  fontWeight: '200',
  fontSize: '2.6rem',
  lineHeight: '1.25',
  '@media (max-width: 890px)': {
    width: '100%',
    fontSize: '2.2em',
  },
});

const ImgContainer = styled('div', {
  marginRight: '84px',
  '@media (max-width: 890px)': {
    display: 'none',
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

const Component = () => {
  return (
    <div>
      <FlexContainer>
        <ImgContainer>
          <img src={support} alt="need help?" width="220px" />
        </ImgContainer>
        <Title>
          Need something but don't see it or want us to make an improvement?
          We'll work with you to help get it done.
        </Title>
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
          <LinkImg
            href="https://stackoverflow.com"
            target="_blank"
          >
            <img src={stack} alt="stackoverflow" height="120px" />
          </LinkImg>
          <h4>Stack Overflow</h4>
          <p>
            Ask your question and share knowledge on{' '}
            <a
              href="https://stackoverflow.com"
              target="_blank"
            >
              Stack Overflow
            </a>. We are working on getting a "fusion.js" tag created for this.
          </p>
        </FocusBlock>
        <FocusBlock>
          <LinkImg href="https://github.com/fusionjs" target="_blank">
            <img src={bug} alt="Report a bug or an issue" height="120px" />
          </LinkImg>
          <h4>File a Bug Report</h4>
          <p>
            If you have found an bug or other issue in Fusion.js
            please file a bug report in one of our repos{' '}
            <a href="https://github.com/fusionjs" target="_blank">
              https://github.com/fusionjs
            </a>.
          </p>
        </FocusBlock>
      </FlexContainer>
    </div>
  );
};

export default Component;
