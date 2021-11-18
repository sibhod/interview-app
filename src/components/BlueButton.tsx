import styled from '@emotion/styled';
import { Button } from 'components/Button';

export const BlueButton = styled(Button)`
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(1.1) contrast(0.95);
  }

  &:active {
    filter: brightness(0.85) contrast(1.5);
  }
`;
