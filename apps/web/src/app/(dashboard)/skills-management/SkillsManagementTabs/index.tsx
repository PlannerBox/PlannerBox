'use client';

import { Tabs, TabsProps } from 'antd';
import SkillsTab from './partials/SkillsTab';

export default function UsersManagementTabs() {
  const items: TabsProps['items'] = [
    {
      key: 'skills',
      label: `Compétences`,
      children: <SkillsTab step='list' />,
    },
    {
      key: 'formations',
      label: `Remises à niveau et formations`,
    },
  ];

  return <Tabs defaultActiveKey='skills' items={items} />;
}
