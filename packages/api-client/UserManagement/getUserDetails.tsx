import { Role } from '../enums/Role';
import { addQueryParams, apiCall } from '../utils/api';
import { RolePermissionData } from './listRolePermissions';
import { UserData } from './listUsers';

type FilterType = {
  id?: string;
  username?: string;
};

export type GetUserDetailsProps = {
  filter?: FilterType;
  limit?: number;
  page?: number;
  accountId: string;
};

export type UserDetailsData = UserData & {
  id: string;
  role: Role;
  permissions: RolePermissionData[];
};

type MetaData = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

export type GetUserDetailsResponse = {
  data: UserDetailsData[];
  meta: MetaData;
};

const getUserDetails = async (
  props: GetUserDetailsProps,
  session: string
): Promise<GetUserDetailsResponse> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/user-management/users/details/${props.accountId}`;
  if (props.limit !== undefined) {
    url = addQueryParams(url, 'limit', props.limit.toString());
  }

  if (props.page !== undefined) {
    url = addQueryParams(url, 'page', props.page.toString());
  }

  if (props.filter?.id && props.filter.id !== '') {
    url = addQueryParams(url, 'filter.id', `$eq:${props.filter.id}`);
  }

  if (props.filter?.username && props.filter.username !== '') {
    url = addQueryParams(
      url,
      'filter.username',
      `$eq:${props.filter.username}`
    );
  }

  return await apiCall(url, {
    method: 'GET',
    headers: new Headers({
      Cookie: `session=${session}`,
    }),
    credentials: 'include',
    redirect: 'follow',
  });
};

export { getUserDetails };
