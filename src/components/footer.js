import React from 'react';
import {styled} from 'styletron-react';
import Link from 'gatsby-link';
import {PageWidth, FlexContainer, FlexItem} from '../layouts/styled-elements';

const Footer = styled('footer', ({styleProps = {}}) => ({
  width: '100%',
  height: '90px',
  backgroundColor: styleProps.hasSideNav ? '#f8f8f9' : '#041725',
  color: '#999',
  fontSize: '12px',
  ...styleProps.overrides,
}));

const ExternalLink = styled('a', {
  backgroundColor: 'transparent',
  color: 'inherit',
  textDecoration: 'none',
});

const InternalLink = props => {
  return <Link style={{backgroundColor: 'transparent'}} {...props} />;
};

const LinkText = styled('span', {
  color: '#999',
  textTransform: 'uppercase',
  ':hover': {
    textDecoration: 'underline',
  },
});

export default ({styleProps = {}}) => {
  return (
    <Footer {...{styleProps}}>
      <PageWidth>
        <FlexContainer
          styleProps={{
            overrides: {
              ...(styleProps.hasSideNav && {paddingLeft: '336px'}),
            },
          }}
        >
          <FlexItem>
            <p>© 2018 Uber Technologies Inc.</p>
          </FlexItem>
          <FlexItem>
            <p>
              <ExternalLink href="https://github.com/fusionjs">
                <LinkText>Github</LinkText>
              </ExternalLink>
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <InternalLink to="/">
                <LinkText>Home</LinkText>
              </InternalLink>
            </p>
          </FlexItem>
        </FlexContainer>
      </PageWidth>
    </Footer>
  );
};
