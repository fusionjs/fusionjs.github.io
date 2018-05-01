const React = require('react');
const Styletron = require('styletron-client');
const {StyletronProvider} = require('styletron-react');

exports.wrapRootComponent = ({Root}) => () => {
  const styleElements = document.getElementsByClassName('_styletron_hydrate_');
  const styletron = new Styletron(styleElements);

  return (
    <StyletronProvider styletron={styletron}>
      <Root />
    </StyletronProvider>
  );
};
