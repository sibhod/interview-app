import { ComponentProps } from 'react';
import { Button } from 'components/Button';
import styled from '@emotion/styled';

type CircleButtonProps = {
  size: number;
  stroke: number;
  backgroundColor: string;
};

export const CircleButton = styled(Button)<CircleButtonProps>(
  (props) => `
  background-color: ${props.backgroundColor};
  color: ${props.color};
  width: ${props.size}px;
  height: ${props.size}px;
  border-radius: ${props.size / 2}px;
  border-width: ${props.stroke}px;
  padding: 0;

  opacity: 0.85;
  transition: all 0.15s ease;
  transform: scale(0.95);

  &:hover {
    opacity: 1;
    transform: scale(1.2);
    background-color: ${props.color};
    color: ${props.backgroundColor};
  }

  &:active {
    filter: brightness(0.85) contrast(1.5);
    transform: scale(1);
  }
`
);
