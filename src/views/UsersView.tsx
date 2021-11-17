import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useGetUsers } from 'hooks/useGetUsers';
import { FlexSpinner } from 'components/FlexSpinner';
import { UsersTable } from 'components/UsersTable';
import { SearchInput } from 'components/SearchInput';
import { GridSection } from 'containers/GridSection';

export const UsersView = () => {
  const { isFetchingUsers, users } = useGetUsers();
  const [search, setSearch] = useState<string>('');

  return (
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
        justify-context: flex-end;
      `}
      >
        <SearchInput value={search} onChange={setSearch} />
      </div>
      {isFetchingUsers ? <FlexSpinner /> : <UsersTable users={users} />}
    </GridSection>
  );
};
