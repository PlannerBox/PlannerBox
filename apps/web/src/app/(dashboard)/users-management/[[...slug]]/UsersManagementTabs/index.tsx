'use client';

import { Tabs, TabsProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import GroupsTab from './partials/GroupsTab';
import PermissionsTab from './partials/PermissionsTab';
import UsersTab from './partials/UsersTab';

export default function UsersManagementTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const validTabs = ['users', 'groups', 'permissions'];
  const currentTabPathname = pathname
    .replace('/users-management', '')
    .replace('/', '');

  const shallowRedirect = (key: string) => {
    router.push(`/users-management/${key}`, { shallow: true });
  };

  useEffect(() => {
    // Redirect to 'users' by default
    if (currentTabPathname === '') {
      shallowRedirect('users');
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

  return (
    <Tabs
      defaultActiveKey={currentTab}
      items={items}
      onChange={shallowRedirect}
    />
  );
}
