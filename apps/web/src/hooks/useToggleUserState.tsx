import { useMutation } from '@tanstack/react-query';
import {
  ToggleUserStateProps,
  ToggleUserStateResponse,
  toggleUserState,
} from 'api-client';

type ToggleUserStateHookOptions = {
  onSuccess?: (data: ToggleUserStateResponse) => void;
  onError?: (error: unknown) => void;
};

const useToggleUserState = ({
  onSuccess,
  onError,
}: ToggleUserStateHookOptions) => {
  return useMutation<ToggleUserStateResponse, unknown, ToggleUserStateProps>({
    mutationFn: async (data: ToggleUserStateProps) => {
      return await toggleUserState({ ...data });
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

export { useToggleUserState };
