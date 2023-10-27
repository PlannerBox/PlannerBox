import { apiCall } from '../utils/api';
import { ScheduledEventType } from './scheduleEvent';

export type UpdateScheduledEventProps = ScheduledEventType & {
  id: string;
};

export type UpdateScheduledEventResponse = {};

const updateScheduledEvent = async (
  props: UpdateScheduledEventProps,
  session: string
): Promise<UpdateScheduledEventResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/event-management/event/update`,
    {
      method: 'POST',
      body: JSON.stringify({ ...props }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Cookie: `session=${session}`,
      }),
      credentials: 'include',
      redirect: 'follow',
    }
  );
};

export { updateScheduledEvent };
