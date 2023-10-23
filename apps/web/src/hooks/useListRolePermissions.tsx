import { useQuery } from '@tanstack/react-query';
import { listRolePermissions } from 'api-client';
import { useCookies } from 'react-cookie';

const useListRolePermissions = () => {
  const [cookies] = useCookies(['session']);
  console.log('useListRolePermissions');
  return useQuery({
    queryKey: ['listRolePermissions'],
    queryFn: () => listRolePermissions(cookies['session']),
  });
};

export { useListRolePermissions };
