import { useMutation } from '@tanstack/react-query';
import {
  AddGroupMemberProps,
  AddGroupMemberResponse,
  addGroupMember,
} from 'api-client';
import { useCookies } from 'react-cookie';

type AddGroupMemberHookOptions = {
  onSuccess?: (data: AddGroupMemberResponse) => void;
  onError?: (error: unknown) => void;
};

const useAddGroupMember = ({
  onSuccess,
  onError,
}: AddGroupMemberHookOptions) => {
  const [cookies] = useCookies(['session']);
  return useMutation<AddGroupMemberResponse, unknown, AddGroupMemberProps>({
    mutationFn: async (data: AddGroupMemberProps) => {
      return await addGroupMember(data, cookies['session']);
    },
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
};

export { useAddGroupMember };
