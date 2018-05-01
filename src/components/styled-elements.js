const React = require('react');
const {styled} = require('styletron-react');
const {
  primaryColor,
  whiteColor,
  blackColor,
  black90Color,
  white120Color,
  fontFamily,
} = require('./style-settings');

exports.MainNavContainer = styled('div', {});

exports.MainNavItem = styled('span', ({styleProps = {}}) => ({
  display: 'inline-block',
  fontFamily: fontFamily,
  fontWeight: 'bold',
  fontSize: '11px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  textDecoration: 'none',
  lineHeight: '1',
  padding: '17px 15px 19px 15px',
  borderTopWidth: '4px',
  borderTopStyle: 'solid',
  color: styleProps.isActive ? whiteColor : white120Color,
  borderTopColor: styleProps.isActive ? primaryColor : 'transparent',
  ':hover': {
    color: whiteColor,
  },
  '@media (max-width: 380px)': {
    padding: '17px 8px 19px 8px',
  },
  '@media (max-width: 348px)': {
    padding: '17px 4px 19px 4px',
    letterSpacing: '1px',
  },
  ...styleProps.overrides,
}));

exports.SideNavContainer = styled('div', ({styleProps = {}}) => ({
  position: 'relative',
  width: '310px',
  paddingRight: '24px',
  paddingTop: '24px',
  paddingBottom: '28px',
  listStyle: 'none',
  '@media (max-width: 374px)': {
    ':hover': {
      width: '100%',
      boxSizing: 'border-box',
    },
  },
  ...styleProps.overrides,
}));

exports.SideNavUl = styled('ul', ({styleProps = {}}) => ({
  margin: '0',
  listStyle: 'none',
  ...styleProps.overrides,
}));

exports.SideNavLi = styled('li', ({styleProps = {}}) => ({
  margin: '0',
  ...styleProps.overrides,
}));

exports.SideNavItem = styled('span', ({styleProps = {}}) => ({
  display: 'inline-block',
  padding: '5px 11px',
  fontSize: '16px',
  fontWeight: styleProps.isActive ? 'bold' : '400',
  borderLeft: '4px solid transparent',
  color: styleProps.isActive ? blackColor : white120Color,
  ':hover': styleProps.noLink
    ? {}
    : {
        color: styleProps.isActive ? blackColor : primaryColor,
        fontWeight: 'bold',
      },
  ':before': {
    content: '""',
    display: 'inline-block',
    position: 'absolute',
    left: '0',
    height: '28px',
    borderLeft: '4px solid transparent',
    borderLeftColor: styleProps.isActive ? primaryColor : 'transparent',
  },
  ...styleProps.overrides,
}));
