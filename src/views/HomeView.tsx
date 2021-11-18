import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BORDER, BOX_SHADOW_LIGHT } from 'constants/styles';
import {
  BAHAMA_BLUE,
  BLUE,
  LIGHT_GREY,
  MEDIUM_GREY,
  OFF_WHITE,
} from 'constants/colors';

import { FlexSection } from 'containers/FlexSection';
import { Note } from 'components/Note';
import { BORDER_RADIUS } from 'constants/layout';

const Link = styled.a`
  font-weight: 600;
  text-decoration: none;
  color: ${BLUE};
  border-radius: 6px;
  display: inline-block;
  padding: 0px 3px 1px;
  &:hover,
  &:active {
    color: white;
    background-color: ${BLUE};
  }
`;

export const HomeView = () => {
  return (
    <FlexSection>
      <Note
        header={
          <>
            A proposal for an <span style={{ color: BLUE }}>OpenSpace</span>{' '}
            interview coding challenge
          </>
        }
        body={
          <>
            <p>
              Since we are doing-away with the idea of take-home tests for
              engineer candidates, I wanted to make a coding challenge option
              that offers tasks across all the disciplines with require or want
              in a potential hire.
            </p>
            <p>
              The goal is to have challenges in JavaScript, CSS, React, Redux,{' '}
              <code>{'<canvas />'}</code>, and TypeScript so candidates can pick
              their poison. (I outline this more in-depth in my{' '}
              <Link
                href='https://docs.google.com/document/d/1EC8LNGUM-0oieOZfPE9JZQs13TTuIpmAZ1YzSuPP1XI/edit'
                target='_blank'
              >
                concepts doc
              </Link>
              ).
            </p>
            <p>
              I've started this project by actually building the core
              funtionality we want to test for, which I will then remove,
              disable, or break the functionality and create the challenge. I
              figured working on an existing, working app going to be much more
              familiar to engineers that starting a new project from scratch.
            </p>
            <p>
              The challenges will range in size: from tweaking an element's
              alignment in CSS; to refactoring a React class component to a
              functional one, or building a debounce util to prevent event
              spamming on scroll. Each challenge will be marked in the codebase
              with a corresponding <code>// TODO:</code>, describing the issue
              and what is considered "success". There's not necessarily a
              "correct" answer, just a desired result.
            </p>{' '}
            <p>
              I will also be adding unit and E2E tests for the challenges to
              help candidates to pinpoint the issues and better understand
              success.
            </p>
            <p>
              I've added rough outlines to each page describing my plans. Feel
              free to send me feedback!
            </p>
          </>
        }
      />
    </FlexSection>
  );
};
