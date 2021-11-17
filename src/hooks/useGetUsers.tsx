import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { isFetchingUsersSelector, usersSelector } from 'redux/users/selectors';
import { fetchUsers } from 'redux/users/actions';
import Bluebird from 'bluebird';

export const useGetUsers = () => {
  const isFetchingUsers = useSelector(isFetchingUsersSelector);
  const users = useSelector(usersSelector);
  const promiseRef = useRef<Bluebird<any> | null>(null);

  // If `users == null` and `!isFetchingUsers`, call `fetchUsers();`
  useEffect(() => {
    if (!users && !isFetchingUsers) {
      promiseRef.current?.cancel();
      promiseRef.current = fetchUsers();
    }
  }, [isFetchingUsers, users]);

  // On unmount, cancel the fetch promise to prevent memory leaking
  useEffect(() => () => promiseRef.current?.cancel(), []);

  return {
    isFetchingUsers,
    users,
  };
};
