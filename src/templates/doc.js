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

const EditLink = styled('a', {
  paddingTop: '4px',
  paddingBottom: '4px',
  paddingLeft: '8px',
  paddingRight: '8px',
  position: 'absolute',
  top: '16px',
  right: 0,
});

class DocTemplate extends React.Component {
  render() {
    const {data, pathContext} = this.props;
    let html = extractChildMarkdownRemark(data).html || '';

    return (
      <DocsWrapper className="docSearch-content">
        {pathContext.remoteUrl ? (
          <EditLink href={pathContext.remoteUrl}>Edit</EditLink>
        ) : null}
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
