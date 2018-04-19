import React from 'react';
import {styled} from 'styletron-react';

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
    const {pathContext, location} = this.props;
    return (
      <DocsWrapper>
        {pathContext.remoteUrl ? (
          <EditLink href={pathContext.remoteUrl}>Edit</EditLink>
        ) : null}
        <DocsContainer
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{__html: pathContext.html}}
        />
      </DocsWrapper>
    );
  }
}

export default DocTemplate;
