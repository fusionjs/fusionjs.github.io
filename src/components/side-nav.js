import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import {
  SideNavContainer,
  SideNavUl,
  SideNavLi,
  SideNavItem,
} from './styled-elements';
import {getPath, stripTrailingSlash} from '../utils';

class NavItemGroup extends React.Component {
  render() {
    const {path, title, children, isActive} = this.props;
    return (
      <SideNavLi>
        <NavLink
          path={path}
          style={{textDecoration: 'none'}}
          isActive={isActive}
        >
          {title}
        </NavLink>
        <SideNavUl styleProps={{overrides: {paddingLeft: '16px'}}}>
          {children}
        </SideNavUl>
      </SideNavLi>
    );
  }
}

class NavItem extends React.Component {
  render() {
    return (
      <SideNavLi>
        <NavLink {...this.props} />
      </SideNavLi>
    );
  }
}

class NavLink extends React.Component {
  render() {
    const {path, children, isActive} = this.props;
    if (!path) {
      return (
        <SideNavItem styleProps={{isActive: isActive, noLink: true}}>
          {children}
        </SideNavItem>
      );
    } else {
      return (
        <Link
          to={path}
          style={{textDecoration: 'none', backgroundColor: 'transparent'}}
        >
          <SideNavItem styleProps={{isActive: isActive}}>
            {children}
          </SideNavItem>
        </Link>
      );
    }
  }
}

class SideNav extends React.Component {
  buildChildren(navData = {}) {
    const {location, pathPrefix: routePrefix} = this.props;
    const {children = [], pathPrefix = ''} = navData;

    return children.map((item, index) => {
      const prefixedPath = `${pathPrefix}${item.path || ''}`;
      const staticIndexStart = location.pathname.indexOf('/index.html');
      const locationPathWithoutStaticIndex =
        staticIndexStart !== -1
          ? location.pathname.substr(0, staticIndexStart)
          : location.pathname;
      const isActive =
        stripTrailingSlash(`${routePrefix}${prefixedPath}`) ===
        stripTrailingSlash(locationPathWithoutStaticIndex);
      const newPathPrefix = `${pathPrefix}${item.pathPrefix || ''}`;

      if (item.children && item.children.length) {
        return (
          <NavItemGroup
            key={index}
            path={item.path ? prefixedPath : null}
            title={item.title}
            isActive={isActive}
          >
            {isActive ? <Helmet title={item.title} /> : null}
            {this.buildChildren({
              children: item.children,
              pathPrefix: newPathPrefix,
            })}
          </NavItemGroup>
        );
      }
      return (
        <NavItem key={index} path={prefixedPath} isActive={isActive}>
          {isActive ? <Helmet title={item.title} /> : null}
          {item.title}
        </NavItem>
      );
    });
  }

  render() {
    const {data} = this.props;
    return (
      <SideNavContainer>
        <SideNavUl>{this.buildChildren(data)}</SideNavUl>
      </SideNavContainer>
    );
  }
}

export default SideNav;
