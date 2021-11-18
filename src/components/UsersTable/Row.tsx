import { useCallback, useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { User, UserKey } from 'types/User';
import { ROW_HEIGHT, userColumnOrder } from 'constants/userTableStyles';
import { Cell } from 'components/UsersTable';
import { formatDate } from 'util/formatDate';
import { BLUE, OFF_WHITE } from 'constants/colors';
import { SITE_WIDTH } from 'constants/layout';

type Props = {
  rowIndex: number;
  user: User;
};

const RowCell = styled(Cell)`
  height: ${ROW_HEIGHT}px;
  line-height: ${ROW_HEIGHT}px;

  &:nth-of-type(8n-3) {
    position: relative;
    overflow: initial;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      width: ${SITE_WIDTH - 6}px;
      background-color: ${OFF_WHITE};
      opacity: 0.5;
      z-index: -1;
    }
  }
`;

const EmailLink = styled.a`
  color: ${BLUE};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Row = ({ user }: Props) => {
  const renderCellContent = useCallback(
    (key: UserKey) => {
      switch (key) {
        case 'date_joined':
          return formatDate(user.date_joined);
        case 'email':
          return (
            <EmailLink href={`mailto:${user.email}`}>{user.email}</EmailLink>
          );
        case 'full_name':
          return (
            <span>
              {user.first_name}&nbsp;<b>{user.last_name}</b>
            </span>
          );

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
