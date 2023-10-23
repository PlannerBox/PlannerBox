import { apiCall } from '../utils/api';

export type DefineStudentGroupManagerProps = {
  accountId: string;
  groupId: string;
  isOwner: boolean;
};

export type DefineStudentGroupManagerResponse = {};

const defineStudentGroupManager = async ({
  accountId,
  isOwner,
}: DefineStudentGroupManagerProps): Promise<DefineStudentGroupManagerResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/group-management/group/${props.groupId}/update/${props.accountId}`,
    {
      method: 'POST',
      body: JSON.stringify({ accountId, isOwner }),
    }
  );
};

export { defineStudentGroupManager };
