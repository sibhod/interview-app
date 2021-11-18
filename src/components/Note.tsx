import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { BORDER, BOX_SHADOW_LIGHT } from 'constants/styles';
import { BLUE, LIGHT_GREY, MEDIUM_GREY, OFF_WHITE } from 'constants/colors';

const NoteElement = styled.div`
  border: ${BORDER};
  background-color: ${OFF_WHITE};
  box-shadow: ${BOX_SHADOW_LIGHT};
  display: flex;
  flex-direction: column;
  font-size: 1em;
  gap: 1em;
  padding: 1em 1em 2em;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    position: absolute;
    inset: 0px -4px;
    border: solid 4px ${LIGHT_GREY};
    opacity: 0.25;
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    inset: -4px -1px;
    border: dotted 4px ${LIGHT_GREY};
    opacity: 0.5;
  }
`;

const BodySection = styled.div`
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 1em;

  & > * {
    margin: 0;
    padding: 0 0.25em;
  }
`;

const HeaderSection = styled.div`
  color: #444;
  font-size: 1.25em;
  font-weight: bold;
  margin: 0;
  padding: 0;
  padding-bottom: 0.5em;
  border-bottom: dashed 1px ${MEDIUM_GREY};
`;

type Props = {
  header: ReactNode;
  body: ReactNode;
};

export const Note = ({ header, body }: Props) => {
  return (
    <NoteElement>
      <HeaderSection>{header}</HeaderSection>
      <BodySection>{body}</BodySection>
    </NoteElement>
  );
};
