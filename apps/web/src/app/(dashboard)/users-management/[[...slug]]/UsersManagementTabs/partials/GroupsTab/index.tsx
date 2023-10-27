'use client';

import {
  Button,
  Form,
  Input,
  Popover,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';
import { ColumnsType } from 'antd/es/table';
import {
  GetUserDetailsProps,
  ListGroupsProps,
  ListUsersProps,
} from 'api-client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useListGroups } from '../../../../../../../hooks/useListGroups';
import { useListUsers } from '../../../../../../../hooks/useListUsers';
import UsersList from '../../../../../../components/UsersList';
import GroupCreation from './GroupCreation';

type UsersTabProps = {
  step?: 'list' | 'manage' | 'create';
  idManaged?: string;
};

interface GroupDataType {
  key: string;
  id: string;
  name: string;
  responsible?: GetUserDetailsProps;
  members_count: number;
}

const groupColumns: ColumnsType<GroupDataType> = [
  {
    title: 'Nom',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Référent',
    dataIndex: 'responsible',
    key: 'responsible',
  },
  {
    title: 'Nombre de membres',
    dataIndex: 'members_count',
    key: 'members_count',
  },
  {
    title: 'Actions',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <Button
          type='link'
          href={`/users-management/groups/${record.key}/manage`}
        >
          Gérer les membres
        </Button>
      </Space>
    ),
  },
];

interface Group {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MembersDataType {
  key: string;
  lastname: string;
  firstname: string;
  mail: string;
  responsible: boolean;
}

const fakeGroupMembers: Omit<MembersDataType, 'key'>[] = [
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    responsible: true,
  },
  {
    firstname: 'Johnny',
    lastname: 'Sino',
    mail: 'johnny@sino.com',
    responsible: false,
  },
  {
    firstname: 'Porel',
    lastname: 'Rtus',
    mail: 'robert@albert.com',
    responsible: false,
  },
  {
    firstname: 'Franscesca',
    lastname: 'Gragjda',
    mail: 'franscesca@gragjda.com',
    responsible: false,
  },
  {
    firstname: 'Poiro',
    lastname: 'Trotro',
    mail: 'trotro@poiro.com',
    responsible: false,
  },
  {
    firstname: 'Ariette',
    lastname: 'Salvette',
    mail: 'ariette@salvette.com',
    responsible: false,
  },
  {
    firstname: 'Paul',
    lastname: 'Krush',
    mail: 'paul@krush.com',
    responsible: false,
  },
];

const membersColumns: ColumnsType<MembersDataType> = [
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
    render: (_, { mail, responsible }) => (
      <>
        {mail}
        {responsible === true && (
          <>
            <Tag color='blue' style={{ marginLeft: 'var(--spacing-12)' }}>
              Responsable
            </Tag>
          </>
        )}
      </>
    ),
  },
];

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function GroupsTab({ step = 'list', idManaged }: UsersTabProps) {
  const [form] = Form.useForm();
  const router = useRouter();

  const defaultListGroupsOptions = {
    filter: undefined,
    limit: 1000,
  };

  const [listGroupsOptions, setListGroupsOptions] = useState<ListGroupsProps>(
    defaultListGroupsOptions
  );

  const { data: groupsList, isLoading: isGroupsListLoading } =
    useListGroups(listGroupsOptions);

  const groupData: GroupDataType[] = groupsList
    ? groupsList.data.map((group) => ({
        key: group.id,
        id: group.id,
        name: group.name,
        responsible: group.groupMembers.find((g) => g.isOwner),
        members_count: group.groupMembers.length,
      }))
    : [];

  const [membersData, setMembersData] = useState<MembersDataType[]>([]);

  useEffect(() => {
    if (step === 'manage' && !!groupsList) {
      setMembersData(
        groupsList.data[0].groupMembers
          .sort((value) => (value.isOwner ? -1 : 1))
          .map((member, index) => ({
            key: index.toString(),
            lastname: member.account.lastname,
            firstname: member.account.firstname,
            mail: member.account.username,
            responsible: member.isOwner,
          }))
      );
    }
  }, [groupsList, step]);

  const onFinish = (values: any) => {
    console.log(values);
  };

  const defaultUsersOptions = {
    filter: undefined,
    limit: 1000,
  };
  const [usersOptions, setUsersOptions] =
    useState<ListUsersProps>(defaultUsersOptions);

  const { data: users, isLoading: usersLoading } = useListUsers(usersOptions);
  useEffect(() => {
    console.log('users test:', { users });
  }, [users]);

  const onUsersSearch = (value: string) => {
    if (value.length > 0) {
      setUsersOptions({
        search: value,
        filter: undefined,
        limit: 1000,
      });
    } else {
      setUsersOptions(defaultUsersOptions);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const filterGroups = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  const shallowRedirect = useCallback(
    (key: string) => {
      router.push(`/users-management/groups/${key}`, { shallow: true });
    },
    [router]
  );

  const { Text } = Typography;

  const MemberPopoverContent = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-12)',
      }}
    >
      <Input
        placeholder='Rechercher un utilisateur'
        onChange={(input) => onUsersSearch(input.currentTarget.value)}
      />
      <UsersList users={users?.data} isLoading={usersLoading} />
    </div>
  );

  const [openForm, setOpenForm] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: !!window ? window.innerWidth : 0,
    height: !!window ? window.innerHeight : 0,
  });

  const handleResize = () => {
    setDimensions({
      width: !!window ? window.innerWidth : 0,
      height: !!window ? window.innerHeight : 0,
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

  useEffect(() => {
    if (step === 'manage') {
      setListGroupsOptions({
        filter: {
          id: idManaged,
        },
        limit: 1,
      });
    } else {
      setListGroupsOptions(defaultListGroupsOptions);
    }
  }, [step]);

  useEffect(() => {
    console.log({ membersData });
  }, [membersData]);

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
            <Popover
              placement={dimensions.width >= 650 ? 'leftTop' : 'bottomRight'}
              title='Créer un groupe'
              content={<GroupCreation closePopover={() => closeForm()} />}
              trigger='click'
              open={openForm}
              onOpenChange={handleOpenFormChange}
            >
              <Button type='primary'>Créer un groupe</Button>
            </Popover>
          </div>
          <Table
            columns={groupColumns}
            dataSource={groupData}
            scroll={{ x: 150 }}
            loading={isGroupsListLoading}
          />
        </>
      )}
      {step === 'manage' && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 'var(--spacing-16) var(--spacing-8)',
            }}
          >
            <Text strong>Membres du groupe</Text>
            <Popover
              placement='leftTop'
              title='Sélectionner le membre'
              content={MemberPopoverContent}
              trigger='click'
            >
              <Button type='primary'>Ajouter un membre</Button>
            </Popover>
          </div>
          <Table
            columns={membersColumns}
            dataSource={membersData}
            scroll={{ x: 150 }}
            loading={isGroupsListLoading}
          />
        </>
      )}
    </div>
  );
}
