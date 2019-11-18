const path = require('path');
const get = require('just-safe-get');

function getPath(prefix = '', childItem) {
  if (childItem.path) {
    return `${prefix}${childItem.path}`;
  } else if (childItem.children && childItem.children.length) {
    return getPath(
      `${prefix}${childItem.pathPrefix || ''}`,
      childItem.children[0]
    );
  }
  return '/';
}

exports.getPath = getPath;

exports.stripTrailingSlash = s => {
  if (typeof s === 'string' && s && s.charAt(s.length - 1) === '/') {
    return s.substr(0, s.length - 1);
  }
  return s;
};

exports.buildPagePath = node => {
  let pathPrefix = node.sourceInstanceName;
  let pkgName = '';
  let pkgNameOriginal = '';
  let localPath = '';
  let remoteUrl = '';
  if (node.sourceInstanceName.startsWith('package|')) {
    const sourceNameArr = node.sourceInstanceName.split('|');
    pathPrefix = '/api';
    pkgName = sourceNameArr[1];
    pkgNameOriginal = sourceNameArr[2] || pkgName;
  }
  if (
    node.name.toLowerCase() === 'readme' ||
    node.name.toLowerCase() === 'index'
  ) {
    localPath = path.join(
      '/',
      pathPrefix,
      pkgName,
      path.dirname(node.relativePath),
      // https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/cache-dir/find-page.js#L62
      '/'
    );
  } else {
    localPath = path.join(
      '/',
      pathPrefix,
      pkgName,
      path.dirname(node.relativePath),
      node.name,
      // https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/cache-dir/find-page.js#L62
      '/'
    );
  }
  if (pkgName) {
    remoteUrl = `https://github.com${path.join(
      '/fusionjs',
      pkgNameOriginal,
      '/blob/master',
      node.relativePath
    )}`;
  }
  return {
    localPath,
    remoteUrl,
  };
};

exports.buildPageName = node => {
  const pkgName = node.sourceInstanceName.startsWith('package|')
    ? node.sourceInstanceName.split('|')[1]
    : '';
  if (
    node.name.toLowerCase() === 'readme' ||
    node.name.toLowerCase() === 'index'
  ) {
    if (node.relativePath.split('/').length > 1) {
      return `${pkgName}/${
        node.relativePath.split('/')[node.relativePath.split('/').length - 2]
      }`;
    }
    return pkgName;
  } else {
    return `${pkgName ? `${pkgName}-` : ''}${node.name}`;
  }
};

exports.extractChildMarkdownRemark = blob => {
  const edges = get(blob, 'allFile.edges');
  if (edges.length) {
    return get(edges[0], 'node.childMarkdownRemark') || {};
  }
  return {};
};
