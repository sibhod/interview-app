import { css } from '@emotion/react';
import { FlexSection } from 'containers/FlexSection';

const sectionStyle = css`
  color: #333;

  & p {
    margin: 0;
    padding: 0 0.25em;
  }
`;

const headerStyle = css`
  color: #444;
  font-size: 1.25em;
  margin: 0;
  padding: 0;
  padding-bottom: 0.25em;
  border-bottom: dashed 1px currentColor;
`;

export const HomeView = () => {
  return (
    <FlexSection css={sectionStyle}>
      <h3 css={headerStyle}>Welcome to the OpenSpace coding challenge</h3>
      <p>
        This sample React/Redux app is full of broken or incomplete
        functionality. The goal is to fix the errors and improve the code. The
        tasks are categorized by language and discipline, so feel free to
        address as many or few you feel comfortable with.
      </p>
      <p>
        To begin, search this project for <code>// TODO:</code>. Each todo will
        list it's languages, and describe the problem. There's not necessarily a
        "correct" answer, just a desired result. To confirm a solution is
        satisfactory, run the command <code>yarn test</code>. A satisfactory
        solution should pass the corresponding test.
      </p>
      <p>
        Feel free to search, use API docs, stack overflow, etc.; whatever you
        normally use.
      </p>
    </FlexSection>
  );
};
