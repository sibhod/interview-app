import { ReactElement, useMemo } from 'react';
import { css } from '@emotion/react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { BLUE, DARK_GREY } from 'constants/colors';
import { SPACING } from 'constants/layout';
import { routeStyles } from 'constants/routeStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const navStyle = css`
  display: flex;
  align-items: center;
  gap: ${SPACING}px;
  height: 100%;
`;

const navItemStyle = css`
  text-decoration: none;
  user-select: none;
  color: ${DARK_GREY};
  cursor: pointer;
  height: 100%;
  display: flex;
  gap: 6px;
  align-items: center;
  position: relative;
  transition: color 0.2s ease;
  &:hover {
    color: ${BLUE};
  }
`;

const activeNavItemStyle = css`
  --active-color: ${BLUE};

  color: var(--active-color);
  pointer-events: none;
  transition: none;
  filter: none;
  font-weight: 600;
  letter-spacing: -0.275px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    bottom: -1px;
    left: 0;
    border-top: 1px solid var(--active-color);
  }
`;

export const Navigation = () => {
  const location = useLocation();
  const navItems = useMemo<ReactElement[]>(
    () =>
      routeStyles.map(({ title, route }) => {
        const active = !!matchPath(route, location.pathname);

        return (
          <Link
            css={[navItemStyle, active && activeNavItemStyle]}
            key={route}
            to={route}
          >
            {title}
          </Link>
        );
      }),
    [location]
  );

  return <nav css={navStyle}>{navItems}</nav>;
};
