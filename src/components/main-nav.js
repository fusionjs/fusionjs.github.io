import React from 'react';
import {styled} from 'styletron-react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import {MainNavContainer, MainNavItem} from './styled-elements';
import {getPath} from '../utils';

const InternalLink = props => {
  return <Link style={{backgroundColor: 'transparent'}} {...props} />;
};

const ExternalLink = styled('a', ({styleProps = {}}) => ({
  backgroundColor: 'transparent',
  ...styleProps.overrides,
}));

const Nav = props => {
  const {data, location, pathPrefix} = props;

  function matchPath(regexp) {
    return location.pathname.match(regexp);
  }

  function isActive(path) {
    const reNews = new RegExp(`^${pathPrefix}${path}(/|$)`);
    return matchPath(reNews);
  }

  return (
    <MainNavContainer data-test="main-nav">
      {data.map((item, index) => {
        const re = new RegExp(`^${pathPrefix}${item.pathPrefix}(/|$)`);
        const isActive = matchPath(re);

        return (
          <InternalLink
            key={index}
            to={item.path || getPath(item.pathPrefix, item.children[0])}
          >
            {isActive ? (
              <Helmet
                titleTemplate={`%s | ${item.title} | Fusion.js Engineering`}
                title={item.title}
              />
            ) : null}
            <MainNavItem styleProps={{isActive}}>{item.title}</MainNavItem>
          </InternalLink>
        );
      })}
      <InternalLink to="/support">
        <MainNavItem
          styleProps={{
            isActive: isActive('/support'),
            overrides: {
              '@media (max-width: 474px)': {
                display: 'none',
              },
            },
          }}
        >
          Support
        </MainNavItem>
      </InternalLink>
    </MainNavContainer>
  );
};

export default Nav;
