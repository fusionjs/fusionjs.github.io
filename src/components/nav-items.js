import React from 'react';
import {styled} from 'styletron-react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import { MainNavItem, SearchField } from './styled-elements';
import {getPath} from '../utils';

const InternalLink = props => {
  return <Link style={{backgroundColor: 'transparent'}} {...props} />;
};

const ExternalLink = styled('a', ({styleProps = {}}) => ({
  backgroundColor: 'transparent',
  ...styleProps.overrides,
}));

class DocsSearch extends React.Component {
  render() {
    return (
      <SearchField
        styleProps={{
          overrides: {
            '@media (max-width: 587px)': {
              display: 'none',
            },
            verticalAlign: 'baseline !important',
          },
        }}
        placeholder="Search"
        id="search-field"
      />
    );
  }
}

const NavItems = props => {
  const {data, location, pathPrefix} = props;

  function matchPath(regexp) {
    return location.pathname.match(regexp);
  }

  function isActive(path) {
    const reNews = new RegExp(`^${pathPrefix}${path}(/|$)`);
    return matchPath(reNews);
  }

  const handleLinkClick = () => props.setOpenMobileMenu()

  return (
    <React.Fragment>
      {data.map((item, index) => {
        const re = new RegExp(`^${pathPrefix}${item.pathPrefix}(/|$)`);
        const isActive = matchPath(re);

        return (
          <InternalLink
            key={index}
            to={item.path || getPath(item.pathPrefix, item.children[0])}
            onClick={handleLinkClick}
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
      <InternalLink to="/support" onClick={handleLinkClick}>
        <MainNavItem
          styleProps={{
            isActive: isActive('/support'),
          }}
        >
          Support
        </MainNavItem>
      </InternalLink>
      <DocsSearch />
    </React.Fragment>
  );
};

export default NavItems;
