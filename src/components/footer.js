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
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <InternalLink to="/join-us">
                <LinkText>Join us!</LinkText>
              </InternalLink>
            </p>
          </FlexItem>
        </FlexContainer>
      </PageWidth>
      <PageWidth>
        <small>
          Icons made by{' '}
          <ExternalLink
            href="https://www.flaticon.com/authors/monkik"
            title="monkik"
          >
            monkik
          </ExternalLink>,{' '}
          <ExternalLink
            href="https://www.flaticon.com/authors/geotatah"
            title="geotatah"
          >
            geotatah
          </ExternalLink>,{' '}
          <ExternalLink
            href="https://www.flaticon.com/authors/pixel-perfect"
            title="Pixel perfect"
          >
            Pixel perfect
          </ExternalLink>,{' '}
          <ExternalLink
            href="https://www.flaticon.com/authors/freepik"
            title="freepik"
          >
            freepik
          </ExternalLink>, from{' '}
          <ExternalLink href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </ExternalLink>{' '}
          are licensed by{' '}
          <ExternalLink
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
          >
            CC 3.0 BY
          </ExternalLink>
        </small>
      </PageWidth>
    </Footer>
  );
};
