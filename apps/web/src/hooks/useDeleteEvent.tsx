import { useMutation } from '@tanstack/react-query';
import { DeleteEventProps, DeleteEventResponse, deleteEvent } from 'api-client';

type DeleteEventHookOptions = {
  onSuccess?: (data: DeleteEventResponse) => void;
  onError?: (error: unknown) => void;
};

const useDeleteEvent = ({ onSuccess, onError }: DeleteEventHookOptions) => {
  return useMutation<DeleteEventResponse, unknown, DeleteEventProps>({
    mutationFn: async (data: DeleteEventProps) => {
      return await deleteEvent(data);
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

export { useDeleteEvent };
