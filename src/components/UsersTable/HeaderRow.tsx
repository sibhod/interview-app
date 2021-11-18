import { useCallback, useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { UserKey, UserTableSort } from 'types/User';
import {
  userColumnStyles,
  userColumnOrder,
  HEADER_HEIGHT,
} from 'constants/userTableStyles';
import { Cell } from 'components/UsersTable';
import { BORDER } from 'constants/styles';
import { BLUE, LIGHT_GREY, OFF_WHITE } from 'constants/colors';

type Props = {
  sort: UserTableSort;
  onColumnClick?: (key: UserKey) => void;
};

const activeHeaderCellStyle = css`
  font-weight: 600;
  letter-spacing: -0.275px;
`;

const HeaderCell = styled(Cell)`
  position: relative;
  padding: 0 10px;
  cursor: pointer;
  height: ${HEADER_HEIGHT}px;
  line-height: ${HEADER_HEIGHT}px;
  user-select: none;
  box-sizing: border-box;
  font-size: 1.125em;

  &:not(:last-of-type) {
    border-right: ${BORDER};
    border-right-style: dotted;
  }

  &:hover {
    background-color: ${OFF_WHITE};
    & > span {
      color: ${BLUE};
    }
  }
`;

const SortIcon = styled.span`
  position: absolute;
  right: 12px;
`;

export const HeaderRow = ({
  sort: { key: sortKey, direction },
  onColumnClick,
}: Props) => {
  const renderHeaderColumn = useCallback(
    (key: UserKey, index: number) => {
      const { title } = userColumnStyles[key]!;
      const isActiveSort = key === sortKey;

      return (
        <HeaderCell
          css={isActiveSort && activeHeaderCellStyle}
          key={`header-column-${index}`}
          onClick={() => onColumnClick?.(key)}
        >
          {title}
          {isActiveSort && (
            <SortIcon>
              <FontAwesomeIcon
                size='1x'
                icon={direction === 'asc' ? faSortDown : faSortUp}
              />
            </SortIcon>
          )}
        </HeaderCell>
      );
    },
    [sortKey, direction, onColumnClick]
  );

  const columnCells = useMemo(
    () => userColumnOrder.map(renderHeaderColumn),
    [renderHeaderColumn]
  );

  return <>{columnCells}</>;
};
