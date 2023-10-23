import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from 'api-client';
import { useCookies } from 'react-cookie';

const useUserDetails = (accountId: string) => {
  const [cookies] = useCookies(['session']);
  console.log('useUserDetails');
  return useQuery({
    queryKey: ['userDetails', accountId],
    queryFn: () => getUserDetails(accountId, cookies['session']),
  });
};

export { useUserDetails };
