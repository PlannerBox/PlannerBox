import { useMutation } from '@tanstack/react-query';
import { SignInProps, signIn } from 'api-client';

type SignInHookOptions = {
  onSuccess?: () => void;
};

const useSignIn = ({ onSuccess }: SignInHookOptions) => {
  return useMutation<any, unknown, SignInProps>({
    mutationFn: async ({ username, password }: SignInProps) => {
      return await signIn({ username, password });
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};

export { useSignIn };
