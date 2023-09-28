import { useQuery } from '@tanstack/react-query';
import { ListGroupsProps, ListGroupsResponse, listGroups } from 'api-client';
import { useCookies } from 'react-cookie';

type ListGroupsHookOptions = {
  onSuccess?: (data: ListGroupsResponse) => void;
  onError?: (error: unknown) => void;
};
/*
const useListGroups = ({ onSuccess, onError }: ListGroupsHookOptions) => {
  return useMutation<ListGroupsResponse, unknown, ListGroupsProps>({
    mutationFn: async (data: ListGroupsProps) => {
      return await listGroups({ ...data });
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
*/

const useListGroups = (props: ListGroupsProps) => {
  const [cookies] = useCookies(['session']);
  return useQuery({
    queryKey: ['listGroups', props],
    queryFn: () => listGroups(props, cookies['session']),
  });
};

export { useListGroups };
