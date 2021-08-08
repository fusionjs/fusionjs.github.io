import React, { useState } from 'react';
import Link from 'gatsby-link';
import {
  H1,
  Header,
  HeaderTitle,
  MainNavContainer,
  MobileNavContainer,
} from './styled-elements';
import {
  PageWidth,
  FlexContainer,
  FlexItem,
} from '../layouts/styled-elements';
import Burger from './burger-menu-button';
import NavItems from './nav-items';
import docsContents from '../nav-docs.yml';
import apiContents from '../nav-api.yml';

const PageHeader = ({
  location,
  pathPrefix,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const handlSetOpen = () => { setMobileMenuOpen(!mobileMenuOpen) };

  return (
    <Header>
      <Burger open={mobileMenuOpen} setOpen={handlSetOpen} />
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
            <MainNavContainer data-test="main-nav">
              <NavItems
                data={[docsContents, apiContents]}
                location={location}
                pathPrefix={pathPrefix}
              />
            </MainNavContainer>
          </FlexItem>
        </FlexContainer>
        {mobileMenuOpen && (
          <MobileNavContainer>
            <NavItems
              data={[docsContents, apiContents]}
              location={location}
              pathPrefix={pathPrefix}
            />
          </MobileNavContainer>
        )}
      </PageWidth>
    </Header>
  )
}

export default PageHeader;
