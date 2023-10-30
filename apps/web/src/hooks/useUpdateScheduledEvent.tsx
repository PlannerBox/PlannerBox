import { useMutation } from '@tanstack/react-query';
import {
  UpdateScheduledEventProps,
  UpdateScheduledEventResponse,
  updateScheduledEvent,
} from 'api-client';

type UpdateScheduledEventHookOptions = {
  onSuccess?: (data: UpdateScheduledEventResponse) => void;
  onError?: (error: unknown) => void;
};

const useUpdateScheduledEvent = ({
  onSuccess,
  onError,
}: UpdateScheduledEventHookOptions) => {
  return useMutation<
    UpdateScheduledEventResponse,
    unknown,
    UpdateScheduledEventProps
  >({
    mutationFn: async (data: UpdateScheduledEventProps) => {
      return await updateScheduledEvent(data);
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

export { useUpdateScheduledEvent };
