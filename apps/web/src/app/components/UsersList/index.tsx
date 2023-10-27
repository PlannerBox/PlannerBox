import { Spin } from 'antd';
import { UserData } from 'api-client';
import UserElement from './partials/UserElement';

export type UsersListProps = {
  users?: UserData[];
  isLoading?: boolean;
  addMember: (accountId: string) => void;
};

export default function UsersList({
  users,
  isLoading = false,
  addMember,
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
        <UserElement
          {...userInformations}
          key={userInformations.username}
          onClick={() => addMember(userInformations.id)}
        />
      ))}
      {isLoading && <Spin />}
    </div>
  );
}
