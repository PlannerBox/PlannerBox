'use client';

import { EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';

type SkillsTabProps = {
  step?: 'list';
};

interface DataType {
  key: string;
  name: string;
  internal_teachers: number;
  external_teachers: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Nom',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Formateurs internes',
    dataIndex: 'internal_teachers',
    key: 'internal_teachers',
  },
  {
    title: 'Formateurs externes',
    dataIndex: 'external_teachers',
    key: 'external_teachers',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size='middle'>
        <EditOutlined />
        <MoreOutlined />
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Big Data',
    internal_teachers: 0,
    external_teachers: 3,
  },
  {
    key: '2',
    name: 'Big Data',
    internal_teachers: 42,
    external_teachers: 12,
  },
  {
    key: '3',
    name: 'Big Data',
    internal_teachers: 32,
    external_teachers: 99,
  },
];

export default function SkillsTab({ step = 'list' }: SkillsTabProps) {
  return (
    <div>
      {step === 'list' && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              margin: 'var(--spacing-16) var(--spacing-8)',
            }}
          >
            <Button type='primary'>Créer une compétence</Button>
          </div>
          <Table columns={columns} dataSource={data} />
        </>
      )}
    </div>
  );
}
