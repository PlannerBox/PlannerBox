'use client';

import { EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import { PresetColorType, PresetStatusColorType } from 'antd/es/_util/colors';
import { LiteralUnion } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';

type GroupType = {
  name: string;
  color: LiteralUnion<PresetColorType | PresetStatusColorType>;
};

interface DataType {
  key: string;
  lastname: string;
  firstname: string;
  mail: string;
  groups: GroupType[];
}

const fakeGroups = [
  {
    name: 'MS2D-AL',
    color: 'green',
  },
  {
    name: 'Bac+5',
    color: 'blue',
  },
  {
    name: '2023',
    color: 'red',
  },
  {
    name: 'BGs',
    color: 'yellow',
  },
];

const fakeUsers = [
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    groups: fakeGroups.slice(0, Math.floor(Math.random() * fakeGroups.length)),
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    groups: fakeGroups.slice(0, Math.floor(Math.random() * fakeGroups.length)),
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    groups: fakeGroups.slice(0, Math.floor(Math.random() * fakeGroups.length)),
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    groups: fakeGroups.slice(0, Math.floor(Math.random() * fakeGroups.length)),
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    groups: fakeGroups.slice(0, Math.floor(Math.random() * fakeGroups.length)),
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    groups: fakeGroups.slice(0, Math.floor(Math.random() * fakeGroups.length)),
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    groups: fakeGroups.slice(0, Math.floor(Math.random() * fakeGroups.length)),
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    groups: fakeGroups.slice(0, Math.floor(Math.random() * fakeGroups.length)),
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    groups: fakeGroups.slice(0, Math.floor(Math.random() * fakeGroups.length)),
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    groups: fakeGroups.slice(0, Math.floor(Math.random() * fakeGroups.length)),
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    groups: fakeGroups.slice(0, Math.floor(Math.random() * fakeGroups.length)),
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Nom',
    dataIndex: 'lastname',
    key: 'lastname',
  },
  {
    title: 'Prénom',
    dataIndex: 'firstname',
    key: 'firstname',
  },
  {
    title: 'Adresse mail',
    dataIndex: 'mail',
    key: 'mail',
    responsive: ['md'],
  },
  {
    title: 'Groupe(s)',
    key: 'groups',
    dataIndex: 'groups',
    responsive: ['md'],
    render: (_, { groups }) => (
      <>
        {groups.map((group) => {
          return (
            <Tag color={group.color} key={group.name}>
              {group.name.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Actions',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <EditOutlined />
        <MoreOutlined />
      </Space>
    ),
  },
];

const data: DataType[] = fakeUsers.map((user, index) => ({
  key: index.toString(),
  ...user,
}));

export default function UsersTab() {
  return (
    <div>
      <Table columns={columns} dataSource={data} scroll={{ x: 150 }} />
    </div>
  );
}
