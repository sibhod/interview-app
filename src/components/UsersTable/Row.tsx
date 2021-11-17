import { useCallback, useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { User, UserKey } from 'types/User';
import { ROW_HEIGHT, userColumnOrder } from 'constants/userTableStyles';
import { Cell } from 'components/UsersTable';

type Props = {
  user: User;
};

const RowCell = styled(Cell)`
  height: ${ROW_HEIGHT}px;
  line-height: ${ROW_HEIGHT}px;
`;

export const Row = ({ user }: Props) => {
  const renderCellContent = useCallback(
    (key: UserKey) => {
      switch (key) {
        case 'full_name':
          return [user.first_name, user.last_name].join(' ');

        default: {
          return user[key].toString();
        }
      }
    },
    [user]
  );

  const renderCell = useCallback(
    (key: UserKey, index: number) => {
      return (
        <RowCell key={`${user.full_name}-${index}`}>
          {renderCellContent(key)}
        </RowCell>
      );
    },
    [user]
  );

  const cells = useMemo(() => userColumnOrder.map(renderCell), [user]);

  return <>{cells}</>;
};
