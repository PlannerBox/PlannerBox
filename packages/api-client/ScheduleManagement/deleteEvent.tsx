import { apiCall } from '../utils/api';

export type DeleteEventProps = {
  id: string;
};

export type DeleteEventResponse = {};

const deleteEvent = async ({
  id,
}: DeleteEventProps): Promise<DeleteEventResponse> => {
  return await apiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/api/event-management/event/delete/${id}`,
    {
      method: 'DELETE',
    }
  );
};

export { deleteEvent };
