import { css } from '@emotion/react';
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
import {
  transparentScrollBarStyle,
  tracklessScrollBarStyle,
} from 'constants/mixins';

const gridStyle = css`
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
      .map((user) => <Row key={user.full_name} user={user} />);
  }, [sort, users]);

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        position: relative;
        border: solid 1px #ccc;
        border-radius: 4px;
      `}
    >
      <div
        css={[
          gridStyle,
          css`
            border-bottom: solid 1px #eee;
          `,
        ]}
      >
        <HeaderRow onColumnClick={handleSortClick} sort={sort} />
      </div>
      <div
        css={[
          css`
            overflow: hidden auto;
            position: absolute;
            inset: ${HEADER_HEIGHT + 2}px 0 0 0;
          `,
          tracklessScrollBarStyle,
        ]}
      >
        <div css={[gridStyle]}>{userRows}</div>
      </div>
    </div>
  );
};
