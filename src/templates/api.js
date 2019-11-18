import React from 'react';
import {styled} from 'styletron-react';
import {extractChildMarkdownRemark} from '../utils';

const ApiWrapper = styled('div', {
  position: 'relative',
});

const ApiContainer = styled('div', {
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

class ApiTemplate extends React.Component {
  render() {
    const {data, pathContext} = this.props;
    let html = extractChildMarkdownRemark(data).html || '';

    return (
      <ApiWrapper className="apiSearch-content">
        {pathContext.remoteUrl ? (
          <EditLink href={pathContext.remoteUrl}>Edit</EditLink>
        ) : null}
        <ApiContainer
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{__html: html}}
        />
      </ApiWrapper>
    );
  }
}

export const query = graphql`
  query ApiQuery($absolutePath: String!) {
    allFile(filter: {absolutePath: {eq: $absolutePath}}) {
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

export default ApiTemplate;
