import { apiCall } from '../utils/api';

export type ToggleUserStateProps = {
  username: string;
};

export type ToggleUserStateResponse = {};

const toggleUserState = async ({
  username,
}: ToggleUserStateProps): Promise<ToggleUserStateResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user-management/account-state`,
    {
      method: 'POST',
      body: JSON.stringify({ username }),
    }
  );
};

export { toggleUserState };
