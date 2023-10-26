import { GroupData } from '../GroupManagement';
import { UserDetailsData } from '../UserManagement';
import { EventType } from '../enums/EventType';
import { apiCall } from '../utils/api';
import { ListRoomsData } from './listRooms';

export type ScheduledEventType = {
  skills: string[];
  teachers: UserDetailsData[];
  group: GroupData;
  room: ListRoomsData;
  startDate: string;
  endDate: string;
  name: string;
  eventType: EventType;
};

export type ScheduleEventProps = {
  parent: ScheduledEventType;
  children: {
    startDate: string;
    endDate: string;
  }[];
};

export type ScheduleEventResponse = {
  statusCode: number;
  message: string;
};

const scheduleEvent = async (
  requestData: ScheduleEventProps,
  session: string
): Promise<ScheduleEventResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/event-management/event/create`,
    {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: new Headers({
        'Content-Type': 'application/json',
        Cookie: `session=${session}`,
      }),
      credentials: 'include',
      redirect: 'follow',
    }
  );
};

export { scheduleEvent };
