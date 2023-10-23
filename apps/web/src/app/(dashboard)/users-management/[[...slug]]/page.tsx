import { Metadata, NextPage } from 'next';
import UsersManagementTabs from './UsersManagementTabs/partials/UsersTab';

export const metadata: Metadata = {
  title: 'PlannerBox - Gestion des utilisateurs',
};

const UsersManagement: NextPage = () => <UsersManagementTabs />;

export default UsersManagement;
