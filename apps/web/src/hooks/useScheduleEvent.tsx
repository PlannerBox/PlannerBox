import { useMutation } from '@tanstack/react-query';
import {
  ScheduleEventProps,
  ScheduleEventResponse,
  scheduleEvent,
} from 'api-client';
import { useCookies } from 'react-cookie';

type ScheduleEventHookOptions = {
  onSuccess?: (data: ScheduleEventResponse) => void;
  onError?: (error: unknown) => void;
};

const useScheduleEvent = ({ onSuccess, onError }: ScheduleEventHookOptions) => {
  const [cookies] = useCookies(['session']);
  return useMutation<ScheduleEventResponse, unknown, ScheduleEventProps>({
    mutationFn: async (data: ScheduleEventProps) => {
      console.log({ data });
      return await scheduleEvent(data, cookies['session']);
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

export { useScheduleEvent };
