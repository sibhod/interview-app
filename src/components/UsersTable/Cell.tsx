import styled from '@emotion/styled';
import { DARK_GREY } from 'constants/colors';

export const Cell = styled.div`
  color: ${DARK_GREY};
  padding: 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
