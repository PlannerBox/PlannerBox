'use client';

import { Tabs, TabsProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import GroupsTab from './partials/GroupsTab';
import PermissionsTab from './partials/PermissionsTab';
import UsersTab from './partials/UsersTab';

export default function UsersManagementTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const validTabs = ['users', 'groups', 'permissions'];
  const currentTabSplittedPathname = pathname.split('/');
  const currentTabPathname = currentTabSplittedPathname[2] ?? '';

  const shallowRedirect = useCallback(
    (key: string) => {
      router.push(`/users-management/${key}`, { shallow: true });
    },
    [router]
  );

  useEffect(() => {
    // Redirect to 'users' by default
    if (currentTabPathname === '') {
      shallowRedirect('users');
    }
  }, [shallowRedirect, currentTabPathname]);

  const currentTab = validTabs.includes(currentTabPathname)
    ? currentTabPathname
    : 'users';

  const items: TabsProps['items'] = [
    {
      key: 'users',
      label: `Utilisateurs`,
      children: (
        <UsersTab
          step={currentTabSplittedPathname[3] === 'create' ? 'create' : 'list'}
        />
      ),
    },
    {
      key: 'groups',
      label: `Groupes`,
      children: (
        <GroupsTab
          step={currentTabSplittedPathname[3] === 'create' ? 'create' : 'list'}
        />
      ),
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
