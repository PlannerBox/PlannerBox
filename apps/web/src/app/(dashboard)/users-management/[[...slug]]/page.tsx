'use client';

import { Tabs, type TabsProps } from 'antd';
import { NextPage } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import GroupsTab from './partials/GroupsTab';
import PermissionsTab from './partials/PermissionsTab';
import UsersTab from './partials/UsersTab';

const UsersManagement: NextPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  const validTabs = ['users', 'groups', 'permissions'];
  const currentTabPathname = pathname
    .replace('/users-management', '')
    .replace('/', '');

  useEffect(() => {
    // Redirect to 'users' by default
    if (currentTabPathname === '') {
      router.push('/users-management/users', { shallow: true });
    }
  }, [router, currentTabPathname]);

  const currentTab = validTabs.includes(currentTabPathname)
    ? currentTabPathname
    : 'users';

  const items: TabsProps['items'] = [
    {
      key: 'users',
      label: `Utilisateurs`,
      children: <UsersTab />,
    },
    {
      key: 'groups',
      label: `Groupes`,
      children: <GroupsTab />,
    },
    {
      key: 'permissions',
      label: `Permissions`,
      children: <PermissionsTab />,
    },
  ];

  const shallowRedirect = (key: string) => {
    router.push(`/users-management/${key}`, { shallow: true });
  };

  return (
    <Tabs
      defaultActiveKey={currentTab}
      items={items}
      onChange={shallowRedirect}
    />
  );
};

export default UsersManagement;
