import { useQuery } from '@tanstack/react-query';
import { ListScheduledEventsProps, listScheduledEvents } from 'api-client';
import { useCookies } from 'react-cookie';

const useListScheduledEvents = (props: ListScheduledEventsProps) => {
  const [cookies] = useCookies(['session']);
  return useQuery({
    queryKey: ['listScheduledEvents', props],
    queryFn: () => listScheduledEvents(props, cookies['session']),
  });
};

export { useListScheduledEvents };
