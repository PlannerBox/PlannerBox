import { apiCall } from 'api-client/utils/api';
import { NextPage } from 'next';

const Dashboard: NextPage = async () => {
  try {
    const isAuthenticated = await apiCall(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/is_authenticated`,
      {
        method: 'GET',
      }
    );
    console.log({ isAuthenticated });
  } catch (error) {
    console.error({ error });
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
