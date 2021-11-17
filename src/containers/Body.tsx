import { FC } from 'react';
import { css } from '@emotion/react';
import { SITE_WIDTH } from 'constants/layout';

const contentStyle = css`
width: ${SITE_WIDTH}px;
height: 100%;
margin: auto;
overflow-y: auto;
`;

export const Body: FC = ({ children }) => (
  <section css={contentStyle}>{children}</section>
);
