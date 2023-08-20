'use client';

import { Tabs, TabsProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import UserInformationsTab from './partials/UserInformationsTab';

export default function SettingsTab() {
  const pathname = usePathname();
  const router = useRouter();

  const validTabs = ['user-informations'];
  const currentTabSplittedPathname = pathname.split('/');
  const currentTabPathname = currentTabSplittedPathname[2] ?? '';

  const shallowRedirect = useCallback(
    (key: string) => {
      router.push(`/settings/${key}`, { shallow: true });
    },
    [router]
  );

  useEffect(() => {
    // Redirect to 'user-informations' by default
    if (currentTabPathname === '') {
      shallowRedirect('user-informations');
    }
  }, [shallowRedirect, currentTabPathname]);

  const currentTab = validTabs.includes(currentTabPathname)
    ? currentTabPathname
    : 'user-informations';

  const items: TabsProps['items'] = [
    {
      key: 'user-informations',
      label: `Informations personnelles`,
      children: <UserInformationsTab />,
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
