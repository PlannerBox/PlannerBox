import { AccountType } from '../UserManagement';
import { addQueryParams, apiCall } from '../utils/api';

type FilterType = {
  name?: string;
  id?: string;
};

export type ListGroupsProps = {
  filter?: FilterType;
  limit?: number;
};

export type GroupMemberType = {
  groupId: string;
  accountId: string;
  isOwner: boolean;
  account: AccountType;
};

export type GroupData = {
  id: string;
  name: string;
  color: string;
  groupMembers: GroupMemberType[];
};

type MetaData = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type ListGroupsResponse = {
  data: GroupData[];
  meta: MetaData;
};

const listGroups = async (
  props: ListGroupsProps,
  session: string
): Promise<ListGroupsResponse> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/group-management/group/list-paginated`;
  if (props.filter?.name) {
    url = addQueryParams(url, 'filter.name', `$ilike:${props.filter.name}`);
  }
  if (props.filter?.id) {
    url = addQueryParams(url, 'filter.uuid', `$ilike:${props.filter.id}`);
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

export { listGroups };
