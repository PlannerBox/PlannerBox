import { useQuery } from '@tanstack/react-query';
import { ListUsersProps, listUsers } from 'api-client';
import { useCookies } from 'react-cookie';

const useListUsers = (props: ListUsersProps) => {
  const [cookies] = useCookies(['session']);
  return useQuery({
    queryKey: ['listUsers', props],
    queryFn: () => listUsers(props, cookies['session']),
  });
};

export { useListUsers };
