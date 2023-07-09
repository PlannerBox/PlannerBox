import { apiCall } from '../utils/api';

export type SignInProps = {
  username: string;
  password: string;
};

const signIn = async ({ username, password }: SignInProps) => {
  await apiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ username: username, password: password }),
  });
};

export { signIn };
