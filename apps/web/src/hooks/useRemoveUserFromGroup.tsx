import { useMutation } from '@tanstack/react-query';
import { RemoveUserFromGroupResponse, removeUserFromGroup } from 'api-client';

type RemoveUserFromGroupHookOptions = {
  onSuccess?: (data: RemoveUserFromGroupResponse) => void;
  onError?: (error: unknown) => void;
};

const useRemoveUserFromGroup = ({
  onSuccess,
  onError,
}: RemoveUserFromGroupHookOptions) => {
  return useMutation<RemoveUserFromGroupResponse, unknown, void>({
    mutationFn: async () => {
      return await removeUserFromGroup();
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

export { useRemoveUserFromGroup };
