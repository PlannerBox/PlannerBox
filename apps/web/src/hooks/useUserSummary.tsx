import { useQuery } from '@tanstack/react-query';
import { UserSummaryProps, getUserSummary } from 'api-client';
import { useCookies } from 'react-cookie';

const useUserSummary = (props: UserSummaryProps) => {
  const [cookies] = useCookies(['session']);
  console.log('useUserSummary');
  return useQuery({
    queryKey: ['userSummary', props],
    queryFn: () => getUserSummary(props, cookies['session']),
  });
};

export { useUserSummary };
