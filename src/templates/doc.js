import React from 'react';
import {styled} from 'styletron-react';
import {extractChildMarkdownRemark} from '../utils';

const DocsWrapper = styled('div', {
  position: 'relative',
});

const DocsContainer = styled('div', {
  paddingTop: '52px',
  paddingBottom: '52px',
});

class DocTemplate extends React.Component {
  render() {
    const {data, pathContext} = this.props;
    let html = extractChildMarkdownRemark(data).html || '';
console.log('pathContext', pathContext);
    return (
      <DocsWrapper className="docSearch-content">
        <DocsContainer
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{__html: html}}
        />
      </DocsWrapper>
    );
  }
}

export const query = graphql`
  query DocQuery($relativePath: String!) {
    allFile(filter: {relativePath: {eq: $relativePath}}) {
      edges {
        node {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;

export default DocTemplate;
