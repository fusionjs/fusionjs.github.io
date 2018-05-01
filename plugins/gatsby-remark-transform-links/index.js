const visit = require('unist-util-visit');
const {URL} = require('url');
const path = require('path');

// the pathPrefix in args comes empty and the __PREFIX_PATHS__ not set
// so getting the prefix here from the config
const {pathPrefix} = require('../../gatsby-config.js');

module.exports = ({markdownAST}) => {
  visit(markdownAST, 'link', node => {
    const fusionjsLink = 'https://github.com/fusionjs/';
    const reAbsoluteLink = new RegExp('^(?:[a-z]+:)?//', 'i');
    // strip .md extention in any relative link
    if (!reAbsoluteLink.test(node.url)) {
      node.url = node.url.replace(/\.md$/i, '');
    }
    // update github's fusionjs links to docs to links to docs website
    if (node.url.indexOf(fusionjsLink) === 0) {
      const linkUrl = new URL(node.url);
      // change a link to a fusionjs's packages docs to a relative docs website link
      linkUrl.pathname = path.join(
        '/api',
        linkUrl.pathname.replace(/^\/fusionjs\//i, '')
      );
      // remove branch path
      linkUrl.pathname = linkUrl.pathname.replace('/blob/master/', '/');
      // strip .md extention in any fusionjs link
      node.url = linkUrl
        .toString()
        .replace('https://github.com/', '/')
        .replace(/\.md$/i, '');

      // prepend the pathPrefix to all relative links
      node.url = `${pathPrefix === '/' ? '' : pathPrefix}${node.url}`;
    }
  });
};
