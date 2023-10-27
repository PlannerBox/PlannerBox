'use client';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Input,
  Popover,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  notification,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  AddGroupMemberResponse,
  GetUserDetailsProps,
  ListGroupsProps,
  ListUsersProps,
  UserData,
} from 'api-client';
import { ReactNode, useEffect, useState } from 'react';
import { useAddGroupMember } from '../../../../../../../hooks/useAddGroupMember';
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

type OpenNotificationProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export default function GroupsTab({ step = 'list', idManaged }: UsersTabProps) {
  const queryClient = useQueryClient();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  const openNotification = ({
    title,
    description,
    icon,
  }: OpenNotificationProps) => {
    notificationApi.open({
      message: title,
      description: description,
      icon: icon,
      placement: 'top',
    });
  };

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

  const { Text } = Typography;

  const { mutate: fetchAddMember } = useAddGroupMember({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  function handleSuccess(data: AddGroupMemberResponse) {
    if (!!data) {
      openNotification({
        title: 'Nouveau membre ajouté avec succès !',
        icon: <CheckCircleOutlined />,
      });
      queryClient.invalidateQueries({ queryKey: ['listGroups'] });
    } else {
      openNotification({
        title: "Une erreur est survenue lors de l'ajout du membre !",
        icon: <CloseCircleOutlined />,
      });
    }
  }

  function handleError() {
    openNotification({
      title: "Une erreur est survenue lors de l'ajout du membre !",
      icon: <CloseCircleOutlined />,
    });
  }

  const addMember = (accountId: string) =>
    fetchAddMember({
      accountId: accountId,
      isOwner: false,
      groupId: idManaged!,
    });

  const [usersWithoutMembers, setUsersWithoutMembers] = useState<UserData[]>(
    []
  );
  useEffect(() => {
    if (step === 'manage' && !!membersData && !!users) {
      setUsersWithoutMembers(
        users.data.filter(
          (user) => !membersData.some((member) => member.mail === user.username)
        )
      );
    } else {
      setUsersWithoutMembers([]);
    }
  }, [step, membersData, users, idManaged]);

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
      <UsersList
        users={usersWithoutMembers}
        isLoading={usersLoading}
        addMember={addMember}
      />
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

  return (
    <div>
      {notificationContextHolder}
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
