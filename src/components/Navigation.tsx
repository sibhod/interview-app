import { ReactElement, useMemo } from 'react';
import { css } from '@emotion/react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { TEAL } from 'constants/colors';
import { SPACING } from 'constants/layout';
import { routeStyles } from 'constants/routeStyles';

const navStyle = css`
  display: flex;
  align-items: center;
  gap: ${SPACING}px;
  height: 100%;
`;

const navItemStyle = css`
  text-decoration: none;
  user-select: none;
  color: white;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    inset: -6px;
    background-color: rgba(255 255 255 / 10%);
    pointer-events: none;
    opacity: 0;
    transform: scaleY(0);
    transition: all 0.15s ease;
  }

  &:hover::after {
    opacity: 1;
    transform: scaleY(1);
  }
`;

const activeNavItemStyle = css`
  --active-color: ${TEAL};

  color: var(--active-color);
  pointer-events: none;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    border-top: 2px solid var(--active-color);
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
