import React from 'react';
import {styled} from 'styletron-react';
import {white60Color} from '../../components/style-settings';
import team from '../../team';
import sway from '../../images/sway.svg';

const Container = styled('div', {
  paddingTop: '52px',
  paddingBottom: '52px',
  display: 'grid',
  gridGap: '24px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gridTemplateRows: 'repeat(3, auto)',
  '@media (max-width: 600px)': {
    paddingTop: '24px',
    paddingBottom: '24px',
  },
});
const FlexContainer = styled('div', {
  display: 'flex',
});
const BlockLeft = styled('div', {
  display: 'inline-block',
  borderRight: `1px solid ${white60Color}`,
  paddingLeft: '16px',
  paddingRight: '32px',
  paddingTop: '24px',
  paddingBottom: '24px',
  '@media (max-width: 600px)': {
    width: '140px',
    paddingRight: '24px',
    paddingTop: '12px',
    paddingBottom: '12px',
  },
});
const BlockRight = styled('div', {
  display: 'inline-block',
  paddingLeft: '32px',
  paddingRight: '16px',
  paddingTop: '24px',
  paddingBottom: '24px',
  '@media (max-width: 600px)': {
    width: 'calc(100% - 140px)',
    paddingLeft: '24px',
    paddingTop: '12px',
    paddingBottom: '12px',
  },
});
const Photo = styled('img', {
  width: '100px',
  height: '100px',
  position: 'relative',
  top: '50%',
  marginTop: '-50px',
  borderRadius: '50%',
  border: `1px solid ${white60Color}`,
});
const BoldText = styled('span', {
  fontWeight: 500,
});

const Team = () => {
  return (
    <Container>
      {team.map((person, idx) => {
        return (
          <FlexContainer key={idx}>
            <BlockLeft>
              <span />
              <Photo
                src={person.face}
                alt={`${person.name} | Fusion.js engineer`}
                height="100px"
              />
            </BlockLeft>
            <BlockRight>
              <p>
                <BoldText>{person.name}</BoldText>
              </p>
              <p>
                <a href={`https://github.com/${person.username}`}>{`@${
                  person.username
                }`}</a>
              </p>
            </BlockRight>
          </FlexContainer>
        );
      })}
      <FlexContainer>
        <BlockLeft>
          <span />
          <Photo src={sway} alt="Join us!" height="100px" />
        </BlockLeft>
        <BlockRight>
          <p>
            <BoldText>You?</BoldText>
          </p>
          <p>
            <a href="/join-us">Join Us!</a>
          </p>
        </BlockRight>
      </FlexContainer>
    </Container>
  );
};

export default Team;
