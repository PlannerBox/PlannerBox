import { GroupData } from '../GroupManagement';
import { ListSkillsData } from '../SkillManagement';
import { UserData } from '../UserManagement';
import { EventType } from '../enums';
import { addQueryParams, apiCall } from '../utils/api';
import { Room } from './listRooms';

type FilterType = {
  group?: {
    id: string;
  };
  startDate?: string;
  endDate?: string;
};

export type ListScheduledEventsProps = {
  filter?: FilterType;
  limit?: number;
  page?: number;
};

export type ListScheduledEventsData = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  eventType: EventType;
  group: GroupData;
  skills: ListSkillsData[];
  teachers: UserData[];
  room: Room;
};

type MetaData = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

export type ListScheduledEventsResponse = {
  data: ListScheduledEventsData[];
  meta: MetaData;
};

const listScheduledEvents = async (
  props: ListScheduledEventsProps,
  session: string
): Promise<ListScheduledEventsResponse> => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/event-management/event/list-paginated`;
  if (props.limit !== undefined) {
    url = addQueryParams(url, 'limit', props.limit.toString());
  }

  if (props.page !== undefined) {
    url = addQueryParams(url, 'page', props.page.toString());
  }

  if (props.filter?.group?.id && props.filter.group.id !== '') {
    url = addQueryParams(
      url,
      'filter.group.id',
      `$eq:${props.filter.group.id}`
    );
  }

  if (props.filter?.startDate && props.filter.startDate !== '') {
    url = addQueryParams(
      url,
      'filter.startDate',
      `$gt:${props.filter.startDate}`
    );
  }

  if (props.filter?.endDate && props.filter.endDate !== '') {
    url = addQueryParams(url, 'filter.endDate', `$lt:${props.filter.endDate}`);
  }

  return await apiCall(url, {
    method: 'GET',
    headers: new Headers({
      Cookie: `session=${session}`,
    }),
    credentials: 'include',
    redirect: 'follow',
  });
};

export { listScheduledEvents };
