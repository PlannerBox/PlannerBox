import { addQueryParams, apiCall } from '../utils/api';

export type ToggleUserStateProps = {
  username: string;
  session: string;
};

export type ToggleUserStateResponse = {};

const toggleUserState = async ({
  username,
  session,
}: ToggleUserStateProps): Promise<ToggleUserStateResponse> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/user-management/account-state`;
  url = addQueryParams(url, 'username', username);

  return await apiCall(url, {
    method: 'POST',
    headers: new Headers({
      Cookie: `session=${session}`,
    }),
    credentials: 'include',
  });
};

export { toggleUserState };
