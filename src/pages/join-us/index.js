import React from 'react';
import { styled } from 'styletron-react';

const Container = styled('div', {
  paddingTop: '52px',
  paddingBottom: '52px',
  '@media (max-width: 890px)': {
    paddingTop: '16px',
    paddingBottom: '16px',
  },
});

const Title = styled('h2', {
  fontWeight: '200',
  fontSize: '2.6rem',
  lineHeight: '1.25',
  '@media (max-width: 890px)': {
    width: '100%',
    fontSize: '2.2em',
  },
});

const Link = styled('a', {
  backgroundColor: '#11939a',
  textDecoration: 'none',
  padding: '11px 20px'
});

const LinkText = styled('span', {
  color: '#fff',
  lineHeight: '18px',
  fontSize: '14px',
  textTransform: 'uppercase',
  ':hover': {
    textDecoration: 'underline',
  },
});

const youWill = [
  'Build the underlying architectural foundation for all of Uber’s 500+ web applications',
  'Create developer tools to increase productivity and quality of our product teams',
  'Continue to refine and define our tech stack, utilizing open source tools' +
      ' generalizing product-specific code and/or building novel solutions to needs we encounter',
  'Contribute features and fixes back to open source software, or create and promote our own open source tools',
  'Communicate and collaborate within and across teams to drive company-wide, large-scale projects',
  'Mentor, educate and support those around you, as well as other web engineers within the company'
];

const focusAreas = [
  'Application Architecture - Experience building web architectures, tooling and interfaces used by other engineers to improve the productivity and quality of complex web applications',
  'Networking & Data Fetching - Experience with modern networking stacks (e.g. HTTP/2) and data access/modeling tools',
  'Testing & Deployment Infrastructure - Experience with cross-browser, visual and integration testing systems or Docker, Node.js and other developer tools',
  'Experimentation, Monitoring & Analytics - Experience with experimentation in complex web applications, as well as performance monitoring and user/marketing analytics across websites',
  'UI & Design Platform - Experience working with designers and building shared interfaces, UI component libraries and UI productivity tools'
];

const joinUs =
  <Link href="http://t.uber.com/web-platform-join">
    <LinkText>Join us!</LinkText>
  </Link>;

const Component = () => {
  return (
    <Container>
      <Title>
        Do you want to work on Open Source and build the web platform at Uber? Join us, we are hiring!
      </Title>
      <div>
        <h3>
          The role
        </h3>

        <p>
          As a Web Platform engineer at Uber, you’ll help build the foundation for all web applications at Uber. This team focuses on
          providing a high-performance, secure and reliable web ecosystem for all of our users (riders, drivers, eaters and our
          internal operations & logistics teams) through the creation and support of developer tools, systems and frameworks.
          The team’s main goal is to make Uber’s web engineers productive and its web applications high quality utilizing
          a modern tech stack (React.js & Redux, ES2017+, RPC, and Node.js).
        </p>

        {joinUs}

        <h4>
          You will:
        </h4>

        <ul>
          {youWill.map((text, index) =>
            <li key={index}>{text}</li>
          )}
        </ul>

        <h3>
          Focus areas
        </h3>

        <ul>
          {focusAreas.map((text, index) =>
            <li key={index}>{text}</li>
          )}
        </ul>

        {joinUs}
      </div>
    </Container>
  );
};

export default Component;
