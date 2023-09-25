'use client';

import { EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Popover, Select, Space, Table, Tag } from 'antd';
import { PresetColorType, PresetStatusColorType } from 'antd/es/_util/colors';
import { LiteralUnion } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import UserCreation from './UsersTab/partials/UserCreation';

type UsersTabProps = {
  step?: 'list';
};

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

const filterByRoleData = [
  {
    value: 'all',
    label: 'Tous types',
  },
  {
    value: 'admin',
    label: 'Administrateurs',
  },
  {
    value: 'internal_teacher',
    label: 'Formateurs internes',
  },
  {
    value: 'external_teacher',
    label: 'Formateurs externes',
  },
  {
    value: 'student',
    label: 'Apprenants',
  },
];

export default function UsersTab({ step = 'list' }: UsersTabProps) {
  const [openForm, setOpenForm] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window?.innerWidth || 0,
    height: window?.innerHeight || 0,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  const handleOpenFormChange = (newOpen: boolean) => {
    setOpenForm(newOpen);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);

  return (
    <div>
      {step === 'list' && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 'var(--spacing-16) var(--spacing-8)',
            }}
          >
            <Select
              defaultValue='all'
              bordered={false}
              options={filterByRoleData}
            />
            <Popover
              placement={dimensions.width >= 650 ? 'leftTop' : 'bottomRight'}
              title='Créer un utilisateur'
              content={<UserCreation closePopover={() => closeForm()} />}
              trigger='click'
              open={openForm}
              onOpenChange={handleOpenFormChange}
            >
              <Button type='primary'>Créer un utilisateur</Button>
            </Popover>
          </div>
          <Table columns={columns} dataSource={data} scroll={{ x: 150 }} />
        </>
      )}
    </div>
  );
}
