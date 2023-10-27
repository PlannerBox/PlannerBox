import { Spin } from 'antd';
import { UserData } from 'api-client';
import UserElement from './partials/UserElement';

export type UsersListProps = {
  users?: UserData[];
  isLoading?: boolean;
};

export default function UsersList({
  users,
  isLoading = false,
}: UsersListProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-12)',
        overflowY: 'auto',
        maxHeight: '50vh',
      }}
    >
      {users?.map((userInformations) => (
        <UserElement {...userInformations} key={userInformations.username} />
      ))}
      {isLoading && <Spin />}
    </div>
  );
}
