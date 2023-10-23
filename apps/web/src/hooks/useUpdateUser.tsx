import { useMutation } from '@tanstack/react-query';
import { UpdateUserProps, UpdateUserResponse, updateUser } from 'api-client';

type UpdateUserHookOptions = {
  onSuccess?: (data: UpdateUserResponse) => void;
  onError?: (error: unknown) => void;
};

const useUpdateUser = ({ onSuccess, onError }: UpdateUserHookOptions) => {
  return useMutation<UpdateUserResponse, unknown, UpdateUserProps>({
    mutationFn: async (data: UpdateUserProps) => {
      return await updateUser(data);
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

export { useUpdateUser };
