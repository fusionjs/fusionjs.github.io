/* eslint-env node */
const path = require('path');
const {buildPagePath} = require('./src/utils');

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;
  return new Promise((resolve, reject) => {
    const apiTemplate = path.resolve('./src/templates/api.js');
    const docTemplate = path.resolve('./src/templates/doc.js');
    const templates = {
      api: apiTemplate,
      docs: docTemplate,
    };

    resolve(
      graphql(`
        {
          allFile(filter: {extension: {eq: "md"}}) {
            edges {
              node {
                sourceInstanceName
                childMarkdownRemark {
                  html
                  frontmatter {
                    title
                    path
                  }
                }
                relativePath
                absolutePath
                dir
                name
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
        }
        // Create docs pages
        result.data.allFile.edges.forEach(({node}) => {
          const {localPath, remoteUrl} = buildPagePath(node);
          createPage({
            path: localPath,
            component: templates[node.sourceInstanceName] || templates.api,
            context: {
              // Needed for api doc query
              absolutePath: node.absolutePath,
              // Needed for api doc query
              remoteUrl,
              // Used to query for HTML data on the actual page
              relativePath: node.relativePath,
            },
          });
        });
        return null;
      })
    );
  });
};
