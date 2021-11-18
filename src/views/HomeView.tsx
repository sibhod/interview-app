import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BORDER, BOX_SHADOW_LIGHT } from 'constants/styles';
import { BLUE, LIGHT_GREY, MEDIUM_GREY, OFF_WHITE } from 'constants/colors';

import { FlexSection } from 'containers/FlexSection';
import { Note } from 'components/Note';

// const sectionStyle = css`
//   color: #333;

//   & p {
//     margin: 0;
//     padding: 0 0.25em;
//   }
// `;

// const headerStyle = css`
//   color: #444;
//   font-size: 1.25em;
//   margin: 0;
//   padding: 0;
//   padding-bottom: 0.5em;
//   border-bottom: dashed 1px ${MEDIUM_GREY};
// `;

// const Note = styled.div`
//   border: ${BORDER};
//   background-color: ${OFF_WHITE};
//   box-shadow: ${BOX_SHADOW_LIGHT};
//   display: flex;
//   flex-direction: column;
//   font-size: 1em;
//   gap: 1em;
//   padding: 1em 1em 2em;
//   position: relative;
//   overflow: hidden;
//   &::before {
//     content: '';
//     display: block;
//     position: absolute;
//     inset: 0px -4px;
//     border: solid 4px ${LIGHT_GREY};
//     opacity: 0.25;
//   }
//   &::after {
//     content: '';
//     display: block;
//     position: absolute;
//     inset: -4px -1px;
//     border: dotted 4px ${LIGHT_GREY};
//     opacity: 0.5;
//   }
// `;

export const HomeView = () => {
  return (
    <FlexSection>
      <Note
        header={
          <>
            Welcome to the <span style={{ color: BLUE }}>OpenSpace</span> coding
            challenge
          </>
        }
        body={
          <>
            <p>
              This sample React/Redux app is full of broken or incomplete
              functionality. The goal is to fix the errors and improve the code.
              The tasks are categorized by language and discipline, so feel free
              to address as many or few you feel comfortable with.
            </p>
            <p>
              To begin, search this project for <code>// TODO:</code>. Each todo
              will list it's languages, and describe the problem. There's not
              necessarily a "correct" answer, just a desired result. To confirm
              a solution is satisfactory, run the command <code>yarn test</code>
              . A satisfactory solution should pass the corresponding test.
            </p>
            <p>
              Feel free to search, use API docs, stack overflow, etc.; whatever
              you normally use.
            </p>
          </>
        }
      />
    </FlexSection>
  );
};
