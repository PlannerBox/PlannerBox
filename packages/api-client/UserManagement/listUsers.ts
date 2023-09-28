import { Role } from '../enums/Role';
import { addQueryParams, apiCall } from '../utils/api';

type FilterType = {
  role: Role;
};

export type ListUsersProps = {
  filter?: FilterType;
  limit?: number;
};

export type AccountType = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  birthDate: string;
  birthPlace: string;
  lastLogin: null;
  active: true;
};

export type UserGroupData = {
  groupId: string;
  groupMemberCount: number;
  groupName: string;
  isOwner: boolean;
  color: string;
};

export type UserData = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  birthDate: string;
  birthPlace: string;
  active: boolean;
  role: Role;
  groups: UserGroupData[];
};

type MetaData = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type ListUsersResponse = {
  data: UserData[];
  meta: MetaData;
};

const listUsers = async (
  props: ListUsersProps,
  session: string
): Promise<ListUsersResponse> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/user-management/user/list-paginated`;
  if (props.filter?.role) {
    url = addQueryParams(
      url,
      'filter.rolePermissions.role',
      `$eq:${props.filter.role}`
    );
  }

  if (props.limit !== undefined) {
    url = addQueryParams(url, 'limit', props.limit.toString());
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

export { listUsers };
