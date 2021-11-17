import { css } from '@emotion/react';
import { SITE_WIDTH } from 'constants/layout';
import { NavigationRow } from 'containers/NavigationRow';
import { Outlet } from 'react-router-dom';

const layoutStyle = css`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  overflow: hidden;
`;

const bodyStyle = css`
  margin: auto;
  width: ${SITE_WIDTH}px;
  height: 100%;
`;

export const Layout = () => {
  return (
    <div css={layoutStyle}>
      <NavigationRow />
      <section css={bodyStyle}>
        <Outlet />
      </section>
    </div>
  );
};
