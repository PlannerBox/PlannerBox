import { useMutation } from '@tanstack/react-query';
import { DeleteUserResponse, deleteUser } from 'api-client';

type DeleteUserHookOptions = {
  onSuccess?: (data: DeleteUserResponse) => void;
  onError?: (error: unknown) => void;
};

const useDeleteUser = ({ onSuccess, onError }: DeleteUserHookOptions) => {
  return useMutation<DeleteUserResponse, unknown, void>({
    mutationFn: async () => {
      return await deleteUser();
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

export { useDeleteUser };
