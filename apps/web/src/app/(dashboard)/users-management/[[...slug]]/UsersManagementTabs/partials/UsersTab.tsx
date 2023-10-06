'use client';

import { EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Popover, Select, Space, Table, Tag } from 'antd';
import { PresetColorType, PresetStatusColorType } from 'antd/es/_util/colors';
import { LiteralUnion } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import { ListUsersProps, UserGroupData } from 'api-client';
import { Role } from 'api-client/enums/Role';
import { useEffect, useState } from 'react';
import { useListUsers } from '../../../../../../hooks/useListUsers';
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
  groups: UserGroupData[];
}

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
            <Tag color={group.color} key={group.groupId}>
              {group.groupName.toUpperCase()}
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

const filterByRoleData = [
  {
    value: Role.Any,
    label: "Tous les types d'utilisateurs",
  },
  {
    value: Role.Admin,
    label: 'Administrateurs',
  },
  {
    value: Role.InternTeacher,
    label: 'Formateurs internes',
  },
  {
    value: Role.ExternTeacher,
    label: 'Formateurs externes',
  },
  {
    value: Role.Student,
    label: 'Apprenants',
  },
];

export default function UsersTab({ step = 'list' }: UsersTabProps) {
  const [openForm, setOpenForm] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window?.innerWidth || 0,
    height: window?.innerHeight || 0,
  });

  const [listUsersOptions, setListUsersOptions] = useState<ListUsersProps>({
    filter: undefined,
    limit: 9,
    page: 1,
  });

  const { data: usersList } = useListUsers(listUsersOptions);
  const data: DataType[] = usersList
    ? usersList.data.map((user) => ({
        key: user.id,
        lastname: user.lastname,
        firstname: user.firstname,
        mail: user.username,
        groups: user.groups,
      }))
    : [];

  const handleResize = () => {
    setDimensions({
      width: window?.innerWidth,
      height: window?.innerHeight,
    });
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  const handleOpenFormChange = (newOpen: boolean) => {
    setOpenForm(newOpen);
  };

  const handleFilterByRole = (value: Role) => {
    setListUsersOptions((old) => ({
      limit: old.limit,
      page: 1,
      filter: {
        role: value,
      },
    }));
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
              defaultValue={Role.Any}
              bordered={false}
              options={filterByRoleData}
              onChange={handleFilterByRole}
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
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: 150 }}
            pagination={{
              total: usersList?.meta.totalItems,
              pageSize: listUsersOptions.limit,
              onChange: (page, pageSize) => {
                setListUsersOptions((old) => ({
                  filter: old.filter,
                  limit: pageSize,
                  page: page,
                }));
              },
            }}
          />
        </>
      )}
    </div>
  );
}
