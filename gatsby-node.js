/* eslint-env node */
const path = require('path');
const {buildPagePath} = require('./src/utils');

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;
  return new Promise((resolve, reject) => {
    const docTemplate = path.resolve('./src/templates/doc.js');
    const templates = {
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
                    date(formatString: "MMMM DD, YYYY")
                    category
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
            component: templates[node.sourceInstanceName] || templates.docs,
            context: {
              localPath: localPath,
              metadata: node.childMarkdownRemark.frontmatter,
              html: node.childMarkdownRemark.html,
              remoteUrl,
            },
          });
        });
        return null;
      })
    );
  });
};
