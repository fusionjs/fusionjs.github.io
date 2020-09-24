import React from 'react';
import {styled} from 'styletron-react';
import Link from 'gatsby-link';
import {OutboundLink} from 'gatsby-plugin-google-analytics';
import {PageWidth, FlexContainer, FlexItem} from '../layouts/styled-elements';

const Footer = styled('footer', ({styleProps = {}}) => ({
  width: '100%',
  height: '90px',
  backgroundColor: styleProps.hasSideNav ? '#f8f8f9' : '#041725',
  color: styleProps.hasSideNav ? '#999' : '#FFF',
  fontSize: '12px',
  ...styleProps.overrides,
}));

const ExternalLink = styled(OutboundLink, {
  backgroundColor: 'transparent',
  color: 'inherit',
  textDecoration: 'none',
});

const InternalLink = props => {
  return <Link style={{backgroundColor: 'transparent'}} {...props} />;
};

const LinkText = styled('span', ({styleProps = {}}) => ({
  color: styleProps.hasSideNav ? '#999' : '#FFF',
  textTransform: 'uppercase',
  ':hover': {
    textDecoration: 'underline',
  },
}));

export default ({styleProps = {}}) => {
  const date = new Date().getFullYear()
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
            <p>© {date} Uber Technologies Inc.</p>
          </FlexItem>
          <FlexItem>
            <p>
              <ExternalLink href="https://github.com/fusionjs">
                <LinkText {...{styleProps}}>Github</LinkText>
              </ExternalLink>
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <ExternalLink href="https://stackoverflow.com/search?q=fusionjs">
                <LinkText {...{styleProps}}>Stack Overflow</LinkText>
              </ExternalLink>
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <ExternalLink href="https://join.slack.com/t/fusionjs/shared_invite/enQtOTQ2NDYwNTQ5NjgzLWI2ZDkzNDM2MTMyNzFiNmJiMDFmMGEyY2NkMTYyOTZiN2EzYjU1MmI4NDAyN2Y3OGIxMDZhODkzNThiZWU4ZGE">
                <LinkText {...{styleProps}}>Slack Channel</LinkText>
              </ExternalLink>
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <InternalLink to="/join-us">
                <LinkText {...{styleProps}}>Join us!</LinkText>
              </InternalLink>
            </p>
          </FlexItem>
        </FlexContainer>
      </PageWidth>
      <PageWidth>
        <FlexContainer
          styleProps={{
            overrides: {
              ...(styleProps.hasSideNav && {paddingLeft: '336px'}),
            },
          }}
        >
          {' '}
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
              href="https://www.flaticon.com/authors/good-ware"
              title="Good Ware"
            >
              Good Ware
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
          </small>{' '}
        </FlexContainer>
      </PageWidth>
    </Footer>
  );
};
