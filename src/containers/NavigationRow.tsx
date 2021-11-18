import { css } from '@emotion/react';
import { OFF_WHITE, LIGHT_GREY, BLUE } from 'constants/colors';
import { SITE_WIDTH, SPACING } from 'constants/layout';
import { OpenSpaceLogo } from 'components/OpenSpaceLogo';
import { Navigation } from 'components/Navigation';

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  background-color: ${OFF_WHITE};
  border-bottom: solid 1px ${LIGHT_GREY};
`;

const headerSectionStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${SITE_WIDTH}px;
  height: 100%;
  color: white;
`;

const headerTitleStyle = css`
  color: ${BLUE};
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 700;
`;

export const NavigationRow = () => {
  return (
    <header css={headerStyle}>
      <section css={headerSectionStyle}>
        <aside css={headerTitleStyle}>
          <OpenSpaceLogo /> OpenSpace Interview
        </aside>
        <Navigation />
      </section>
    </header>
  );
};
