import { apiCall } from '../utils/api';

export type AddGroupMemberProps = {
  accountId: string;
  isOwner: boolean;
  groupId: string;
};

export type AddGroupMemberResponse = {};

const addGroupMember = async (
  props: AddGroupMemberProps,
  session: string
): Promise<AddGroupMemberResponse> => {
  const { accountId, isOwner, groupId } = props;
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/group-management/group/${groupId}/add`,
    {
      method: 'POST',
      body: JSON.stringify({ accountId, isOwner, groupId }),
      headers: new Headers({
        Cookie: `session=${session}`,
      }),
      credentials: 'include',
      redirect: 'follow',
    }
  );
};

export { addGroupMember };
