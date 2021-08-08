import React from 'react';
import Link from 'gatsby-link';
import {
  H1,
  Header,
  HeaderTitle,
} from './styled-elements';
import {
  PageWidth,
  FlexContainer,
  FlexItem,
} from '../layouts/styled-elements';
import MainNav from './main-nav';
import docsContents from '../nav-docs.yml';
import apiContents from '../nav-api.yml';

const PageHeader = ({
  location,
  pathPrefix,
}) => {
  return (
    <Header>
      <PageWidth>
        <FlexContainer>
          <FlexItem>
            <H1>
              <Link to="/" style={{ backgroundColor: 'transparent' }}>
                <HeaderTitle>Fusion.js</HeaderTitle>
              </Link>
            </H1>
          </FlexItem>
          <FlexItem>
            <MainNav
              data={[docsContents, apiContents]}
              location={location}
              pathPrefix={pathPrefix}
            />
          </FlexItem>
        </FlexContainer>
      </PageWidth>
    </Header>
  )
}

export default PageHeader;
