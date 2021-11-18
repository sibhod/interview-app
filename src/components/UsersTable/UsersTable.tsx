import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HeaderRow, Row } from 'components/UsersTable';
import {
  defaultSort,
  getSortKey,
  HEADER_HEIGHT,
  tableGridTemplateColumns,
} from 'constants/userTableStyles';
import { useCallback, useMemo, useState } from 'react';
import { getOppositeDirection } from 'types/Sort';
import { User, UserKey, UserTableSort } from 'types/User';
import { tracklessScrollBarStyle } from 'constants/mixins';
import { BLUE, DARK_GREY, MEDIUM_GREY, LIGHT_GREY } from 'constants/colors';
import { BORDER_RADIUS } from 'constants/layout';
import { BORDER } from 'constants/styles';

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${tableGridTemplateColumns};
  padding: 2px;
`;

type Props = {
  users?: User[];
};

export const UsersTable = ({ users }: Props) => {
  const [sort, setSort] = useState<UserTableSort>(defaultSort);

  const handleSortClick = useCallback(
    (clickedKey: UserKey) => {
      const { key, direction } = sort;

      setSort({
        key: clickedKey,
        direction:
          clickedKey === key
            ? getOppositeDirection(direction)
            : defaultSort.direction,
      });
    },
    [sort]
  );

  const userRows = useMemo(() => {
    if (!users?.length) {
      return users;
    }
    const { key, direction } = sort;
    const dirNormal = direction === 'asc' ? -1 : 1;
    const sortKey = getSortKey(key);

    return users
      .sort((a, b) => {
        return a[sortKey] > b[sortKey] ? dirNormal : -dirNormal;
      })
      .map((user, index) => (
        <Row key={user.full_name} rowIndex={index} user={user} />
      ));
  }, [sort, users]);

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        position: relative;
        border: ${BORDER};
        border-radius: ${BORDER_RADIUS};
      `}
    >
      <Grid
        css={css`
          border-bottom: ${BORDER};
          border-bottom-style: dotted;
        `}
      >
        <HeaderRow onColumnClick={handleSortClick} sort={sort} />
      </Grid>
      <div
        css={[
          css`
            overflow: hidden auto;
            position: absolute;
            inset: ${HEADER_HEIGHT + 8}px 0 4px 0;
          `,
          tracklessScrollBarStyle,
        ]}
      >
        <Grid>{userRows}</Grid>
      </div>
    </div>
  );
};
