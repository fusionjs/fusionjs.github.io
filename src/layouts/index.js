import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import {
  Page,
  PageWidth,
  H1,
  Header,
  HeaderTitle,
  Body,
  FlexContainer,
  FlexItem,
  SideNavContainer,
  Content,
} from './styled-elements';
import MainNav from '../components/main-nav';
import SideNav from '../components/side-nav';
import Footer from '../components/footer';
import docsContents from '../nav-docs.yml';
import apiContents from '../nav-api.yml';

import '../css/normalize.css';
import '../css/prism.css';
import '../css/doc-search.css';

class Template extends React.Component {
  render() {
    const {location, children, data = {site: {}}} = this.props;
    const pathPrefix =
      !data.site.pathPrefix || data.site.pathPrefix === '/'
        ? ''
        : data.site.pathPrefix;
    const re = new RegExp(`^(${pathPrefix})?(\/|$)`, 'i');
    const pathArr = location.pathname.replace(re, '').split('/');
    const docsPage = pathArr[0] === 'docs';
    const apiPage = pathArr[0] === 'api';
    const hasSideNav = docsPage || apiPage;

    // During the production build location doesn't include the pathPrefix,
    // this adds the pathPrefix during the build so all further location checks
    // are the same as in browser (used for checking if a menu is active)
    if (typeof window === 'undefined') {
      location.pathname = `${pathPrefix}${location.pathname}`;
    }

    /* eslint-disable react/forbid-component-props */
    return (
      <Page>
        <Helmet
          defaultTitle="Fusion.js Documentation"
          titleTemplate="%s | Fusion.js Documentation"
          meta={[
            {
              name: 'description',
              content:
                'A modular javascript framework for creating plugin-based React applications.',
            },
            {name: 'keywords', content: 'web, light, javascript, react, ssr'},
          ]}
        />
        <Header>
          <PageWidth>
            <FlexContainer>
              <FlexItem>
                <H1>
                  <Link to="/" style={{backgroundColor: 'transparent'}}>
                    <HeaderTitle>Fusion.js</HeaderTitle>
                  </Link>
                </H1>
              </FlexItem>
              <FlexItem>
                <MainNav
                  data={[docsContents, apiContents]}
                  location={location}
                  pathPrefix={pathPrefix}
                />
              </FlexItem>
            </FlexContainer>
          </PageWidth>
        </Header>
        <Body>
          <PageWidth>
            <FlexContainer>
              {hasSideNav ? (
                <FlexItem
                  styleProps={{
                    overrides: {
                      flex: '0 0 310px',
                      marginRight: '36px',
                      display: 'flex',
                      transitionProperty: 'flex',
                      transitionDuration: '0.5s',
                      transitionTimingFunction: 'ease',
                      '@media (max-width: 800px)': {
                        flex: '0 0 30px',
                      },
                    },
                  }}
                >
                  <SideNavContainer>
                    <SideNav
                      data={
                        (docsPage && docsContents) ||
                        (apiPage && apiContents) ||
                        []
                      }
                      location={location}
                      pathPrefix={pathPrefix}
                    />
                  </SideNavContainer>
                </FlexItem>
              ) : null}
              <FlexItem
                styleProps={{
                  overrides: {
                    marginRight: '30px',
                    width: hasSideNav ? 'calc(100% - 336px)' : '100%',
                    '@media (max-width: 800px)': {
                      width: hasSideNav ? 'calc(100% - 76px)' : '100%',
                    },
                  },
                }}
              >
                <Content>{children()}</Content>
              </FlexItem>
            </FlexContainer>
          </PageWidth>
        </Body>
        <Footer styleProps={{hasSideNav}} />
      </Page>
    );
  }
  /* eslint-enable react/forbid-component-props */
}

Template.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
};

export default Template;

export const pageQuery = graphql`
  query PathPrefixQuery {
    site {
      pathPrefix
    }
  }
`;
