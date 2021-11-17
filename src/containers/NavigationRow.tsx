import { css } from '@emotion/react';
import { DARK_PURPLE } from 'constants/colors';
import { SITE_WIDTH, SPACING } from 'constants/layout';
import { OpenSpaceLogo } from 'components/OpenSpaceLogo';
import { Navigation } from 'components/Navigation';

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  background-color: ${DARK_PURPLE};
`;

const headerSectionStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${SITE_WIDTH};
  height: 100%;
  color: white;
`;

const headerTitleStyle = css`
  display: flex;
  gap: ${SPACING}px;
  align-items: center;
  font-weight: 700;
`;

export const NavigationRow = () => {
  return (
    <header css={headerStyle}>
      <section css={headerSectionStyle}>
        <aside css={headerTitleStyle}>
          <OpenSpaceLogo /> ToDo
        </aside>
        <Navigation />
      </section>
    </header>
  );
};
