import { useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useGetUsers } from 'hooks/useGetUsers';
import { BlueButton } from 'components/BlueButton';
import { FlexSpinner } from 'components/FlexSpinner';
import { UsersTable } from 'components/UsersTable';
import { SearchInput } from 'components/SearchInput';
import { GridSection } from 'containers/GridSection';
import { escapeRegExp } from 'util/escapeRegExp';
import { Note } from 'components/Note';
import { BAHAMA_BLUE, KHAKI_BLUE, RED } from 'constants/colors';

const bodyStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 24px;
`;

export const UsersView = () => {
  const { isFetchingUsers, users } = useGetUsers();
  const [search, setSearch] = useState<string>('');

  const filteredUsers = useMemo(() => {
    if (!users?.length || !search) return users;

    const regex = new RegExp(escapeRegExp(search), 'i');
    return users.filter(
      (user) =>
        regex.test(user.full_name) ||
        regex.test(user.email) ||
        regex.test(user.country)
    );
  }, [users, search]);

  return (
    <div css={bodyStyle}>
      <GridSection
        css={css`
          grid-template-rows: auto 1fr;
          height: 100%;
          max-height: 60vh;
          overflow: hidden;
          font-size: 0.75em;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <BlueButton>
            <FontAwesomeIcon icon={faUserPlus} />
            &nbsp;Add User
          </BlueButton>
          <SearchInput value={search} onChange={setSearch} />
        </div>
        {isFetchingUsers ? (
          <FlexSpinner />
        ) : (
          <UsersTable users={filteredUsers} />
        )}
      </GridSection>
      <Note
        header={
          <>
            <span style={{ color: BAHAMA_BLUE }}>Redux</span>, selectors, and
            sort|filtering|rendering tabular data
          </>
        }
        body={
          <>
            <p>
              This page introduces Redux and Reselect to load and maintain the{' '}
              <code>users</code> data, (although it's still provided through a
              mock fetch).
            </p>
            <p>
              The challenge here will involve more complex hooks, solving
              various Redux and selector mistakes, and finally searching,
              sorting, and rendering the table data.
            </p>
            <p>
              For example, I will request that the <code>full_name</code>{' '}
              columns is sorted by <i>last</i> name, that the date columns is
              formated UTC, and the email cells actually link a{' '}
              <code>mailto:</code>
            </p>
            <p>
              I am planning to add UI and functionality to add and remove users,
              and updating the Redux state.
            </p>
          </>
        }
      />
    </div>
  );
};
