/* eslint-env node */
const {lstatSync, readdirSync} = require('fs');
const path = require('path');

function getPackages(source) {
  const isDirectory = dir =>
    lstatSync(source).isDirectory(path.join(source, dir));
  return readdirSync(source).filter(isDirectory);
}

function createSourcePlugins() {
  return getPackages(path.join(__dirname, './fusion')).map(pkg => {
    const pkgOriginal = pkg === 'fusion-docs' ? 'fusionjs.github.io' : '';
    return {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `package|${pkg}${pkgOriginal ? `|${pkgOriginal}` : ''}`,
        path: path.join(__dirname, './fusion', pkg),
      },
    };
  });
}

function isDevEnv() {
  return process.env['NODE_ENV'] === 'development';
}

module.exports = {
  siteMetadata: {
    title: 'Fusion.js Development',
  },
  pathPrefix: '/',
  plugins: [
    'gatsby-plugin-react-next',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: path.join(__dirname, './documentation/docs'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'api',
        path: path.join(__dirname, './documentation/api'),
      },
    },
    ...createSourcePlugins(),
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-transform-links',
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false,
              maxWidth: 600,
              wrapperStyle: 'border: 1px solid #ddd;',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'gatsby-remark-',
            },
          },
        ],
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-123210196-1',
      },
    },
  ],
};
