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

exports.MainNavContainer = styled('div', () => ({
  '@media (max-width: 587px)': {
    display: 'none',
  },
}));

exports.MobileNavContainer = styled('div', () => ({
  paddingBottom: '15px',
  '@media (min-width: 588px)': {
    display: 'none',
  },
}));

exports.SearchField = styled('input', ({styleProps = {}}) => ({
  boxSizing: 'border-box',
  display: 'inline-block',
  fontFamily: fontFamily,
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: '18px',
  color: white120Color,
  width: '90px',
  height: '100%',
  border: 'none',
  borderRadius: '2px',
  backgroundColor: 'transparent',
  outline: 'none',
  verticalAlign: 'baseline',
  transition: 'width .3s',
  padding: '7px 12px',
  '::placeholder': {
    opacity: 1,
    color: white120Color,
    fontFamily: fontFamily,
    fontWeight: 'bold',
    fontSize: '11px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  ':focus': {
    width: '120px',
    color: blackColor,
    backgroundColor: 'rgba(250, 250, 250, 1)',
  },
  ...styleProps.overrides,
}));

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
  borderBottomWidth: '4px',
  borderBottomStyle: 'solid',
  color: styleProps.isActive ? whiteColor : white120Color,
  borderBottomColor: styleProps.isActive ? primaryColor : 'transparent',
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
  '@media (max-width: 587px)': {
    width: '97vw'
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

exports.StyledBurger = styled('button', ({styleProps = {}}) => ({
  position: 'absolute',
  top: '10px',
  right: '15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  width: '32px',
  height: '32px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '0',
  zIndex: '99',

  ':focus': {
    outline: 'none'
  },

  '@media (min-width: 588px)': {
    display: 'none',
  },
}));

exports.StyledBurgerBar = styled('div', ({ styleProps = {} }) => ({
    width: '32px',
    height: '2px',
    backgroundColor: whiteColor,
    transition: 'all 0.3s linear',
    position: 'relative',
    transformOrigin: '1px',

    ':first-child': {
      transform: styleProps.open ? 'rotate(45deg)' : 'rotate(0)',
    },

    ':nth-child(2)': {
      opacity: styleProps.open ? '0' : '1',
      transform: styleProps.open ? 'translateX(20px)' : 'translateX(0)',
    },

    ':nth-child(3)': {
      transform: styleProps.open ? 'rotate(-45deg)' : 'rotate(0)',
    },
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

exports.Header = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  minHeight: '52px',
  background: '#041725',
  color: whiteColor,
  zIndex: '999',
});

exports.HeaderTitle = styled('span', {
  backgroundColor: 'transparent',
  display: 'inline-block',
  fontWeight: '100',
  fontSize: '20px',
  textTransform: 'uppercase',
  letterSpacing: '4px',
  textDecoration: 'none',
  color: whiteColor,
  paddingTop: '16px',
  paddingBottom: '16px',
  paddingLeft: '15px',
  paddingRight: '15px',
  lineHeight: '1',
  ':hover': {
    textDecoration: 'none',
  },
});

exports.H1 = styled('h1', {
  marginTop: '0',
  marginBottom: '0',
  marginLeft: '0',
  marginRight: '0',
});
