const React = require('react');
const {styled} = require('styletron-react');
const {
  primaryColor,
  whiteColor,
  blackColor,
  white40Color,
  white60Color,
  white120Color,
  fontFamily,
} = require('../components/style-settings');

exports.Page = styled('div', {
  fontFamily: fontFamily,
  fontSize: '16px',
  lineHeight: '28px',
  minHeight: 'calc(100vh - 52px)',
  overflowX: 'hidden',
});

exports.PageWidth = styled('div', {
  width: '96%',
  maxWidth: '1420px',
  margin: '0 auto',
});

exports.Body = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 0,
  flexBasis: 'auto',
  justifyContent: 'stretch',
  alignItems: 'flex-start',
  marginTop: '52px',
  minHeight: 'calc(100vh - 52px - 90px)',
});

exports.FlexContainer = styled('div', ({styleProps = {}}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  ...styleProps.overrides,
}));

exports.FlexItem = styled('div', ({styleProps = {}}) => ({
  width: styleProps.width || 'auto',
  ...styleProps.overrides,
}));

exports.SideNavContainer = styled('div', () => ({
  position: 'fixed',
  height: 'calc(100vh - 52px)',
  overflowY: 'auto',
  marginLeft: '-999px',
  paddingLeft: '999px',
  paddingRight: '0',
  paddingTop: '1.45rem',
  paddingBottom: '1.45rem',
  borderRight: `1px solid ${white60Color}`,
  backgroundColor: white40Color,
  transitionProperty: 'padding',
  transitionDuration: '0.5s',
  transitionTimingFunction: 'ease',
  zIndex: 5,
  '@media (max-width: 800px)': {
    paddingLeft: '720px',
    ':before': {
      content: '""',
      display: 'block',
      height: '24px',
      width: '28px',
      position: 'absolute',
      right: '0',
      top: '16px',
      borderTop: `4px solid ${primaryColor}`,
      borderBottom: `4px solid ${white120Color}`,
      opacity: 1,
    },
    ':after': {
      content: '""',
      display: 'block',
      width: '28px',
      position: 'absolute',
      right: '0',
      top: '26px',
      borderTop: `4px solid ${white120Color}`,
      opacity: 1,
    },
    ':hover': {
      paddingLeft: '999px',
    },
    ':hover:before': {
      opacity: 0,
      transition: 'opacity .08s ease-out',
      transform: 'translate3d(0px,0px,0) rotate(-90deg)',
    },
    ':hover:after': {
      opacity: 0,
      transition: 'opacity .08s ease-out',
      transform: 'translate3d(0px,0px,0) rotate(-90deg)',
    },
  },
  '@media (max-width: 374px)': {
    ':hover': {
      width: '80%',
      boxSizing: 'content-box',
    },
  },
}));

exports.Content = styled('div', {
  // paddingTop: '52px',
});
