'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Form,
  Input,
  Popover,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from 'antd';
import type { DefaultOptionType } from 'antd/es/cascader';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import UsersList from '../../../../../components/UsersList';
import { UserElementProps } from '../../../../../components/UsersList/partials/UserElement';

type UsersTabProps = {
  step?: 'list' | 'create' | 'manage';
};

interface GroupDataType {
  key: string;
  uuid: string;
  name: string;
  responsible: string;
  members_count: number;
}

const fakeGroups = [
  {
    uuid: 'dkdkd-dkddkd-jsdjqdsbn',
    name: 'MS2D-AL',
    responsible: 'Roberto Alberto',
    members_count: 43,
  },
  {
    uuid: 'dkdkd-dkddkd-jsdjqdsjq',
    name: 'MS2D-JQ',
    responsible: 'Roberto Alberto',
    members_count: 12,
  },
  {
    uuid: 'dkdkd-dkddkd-jsdjqdsjp',
    name: 'Bac+5',
    responsible: 'Roberto Alberto',
    members_count: 83,
  },
  {
    uuid: 'dkdkd-dkddkd-jsdjqdsjr',
    name: '2023',
    responsible: 'Roberto Alberto',
    members_count: 50,
  },
  {
    uuid: 'dkdkd-dkddkd-jsdjqdsja',
    name: '2022',
    responsible: 'Roberto Alberto',
    members_count: 22,
  },
];

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

const groupData: GroupDataType[] = fakeGroups.map((group) => ({
  key: group.uuid,
  ...group,
}));

interface Group {
  value: string;
  label: string;
  disabled?: boolean;
}

const fakeGroupOptions: Group[] = [
  {
    value: 'MS2D-AL',
    label: 'MS2D-AL',
  },
  {
    value: 'Bac+5',
    label: 'Bac+5',
  },
  {
    value: '2023',
    label: '2023',
  },
  {
    value: 'BGs',
    label: 'BGs',
  },
];

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
    responsible: false,
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    responsible: false,
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    responsible: true,
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    responsible: false,
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    responsible: false,
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    responsible: false,
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    responsible: false,
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    responsible: false,
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    responsible: false,
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
    responsible: false,
  },
  {
    lastname: 'Roberto',
    firstname: 'Alberto',
    mail: 'alberto@gmail.com',
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

const membersData: MembersDataType[] = fakeGroupMembers
  .sort((value) => (value.responsible ? -1 : 1))
  .map((member, index) => ({
    key: index.toString(),
    ...member,
  }));

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function GroupsTab({ step = 'list' }: UsersTabProps) {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
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

  const addMemberPopoverContent = () => {
    const [users, setUsers] = useState<UserElementProps[]>([]);
    const fakeUsers: UserElementProps[] = [
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
      {
        firstname: 'Roberto',
        lastname: 'Alberto',
        email: 'robert@albert.com',
      },
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-12)',
        }}
      >
        <Input
          placeholder='Rechercher un utilisateur'
          onChange={(input) =>
            input.currentTarget.value.length > 0
              ? setUsers(fakeUsers)
              : setUsers([])
          }
        />
        <UsersList users={users} />
      </div>
    );
  };

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
            <Button type='primary' onClick={() => shallowRedirect('create')}>
              Créer un groupe
            </Button>
          </div>
          <Table
            columns={groupColumns}
            dataSource={groupData}
            scroll={{ x: 150 }}
          />
        </>
      )}
      {step === 'create' && (
        <Form
          {...layout}
          form={form}
          name='control-hooks'
          onFinish={onFinish}
          style={{ maxWidth: '100%' }}
          labelCol={{ style: { width: 200 } }}
          wrapperCol={{ style: { width: '100%' } }}
        >
          <Form.Item name='type' label='Type' rules={[{ required: true }]}>
            <Select placeholder='Sélectionner une option' allowClear>
              <Option value='student'>Apprenant</Option>
              <Option value='internal_teacher'>Formateur interne</Option>
              <Option value='external_teacher'>Formateur externe</Option>
              <Option value='admin'>Administrateur</Option>
            </Select>
          </Form.Item>
          <Form.Item name='lastname' label='Nom' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='firstname'
            label='Prénom'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='mail'
            label='Adresse mail'
            rules={[{ required: true, type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='organisational_way'
            label="Méthode d'organisation"
            rules={[{ required: true }]}
          >
            <Select placeholder='Sélectionner une option' allowClear>
              <Option value='standard'>Présentiel</Option>
              <Option value='full_remote'>Distanciel</Option>
              <Option value='partial_remote'>
                Mixte présentiel/distanciel
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='groups'
            label='Groupe(s)'
            rules={[{ required: false }]}
          >
            <Cascader
              options={fakeGroupOptions}
              placeholder='Sélectionner un ou plusieurs groupes'
              showSearch={{ filter: filterGroups }}
              onSearch={(value) => console.log(value)}
              maxTagCount='responsive'
              multiple
            />
          </Form.Item>
          <Form.Item
            name='switch'
            label='État'
            valuePropName='checked'
            help={
              'Un compte activé permet à l’utilisateur de se connecter, tandis qu’un compte désactivé bloque sa connexion.'
            }
            rules={[{ required: true }]}
          >
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
            wrapperCol={{
              style: { margin: 'auto', marginTop: 'var(--spacing-24)' },
            }}
          >
            <Button
              type='ghost'
              onClick={() => shallowRedirect('/users')}
              style={{ marginRight: 'var(--spacing-24)' }}
            >
              <ArrowLeftOutlined /> Retour
            </Button>
            <Button type='primary' htmlType='submit'>
              Créer l&apos;utilisateur
            </Button>
          </Form.Item>
        </Form>
      )}
      {step === 'manage' && (
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
              placement='leftTop'
              title='Sélectionner le membre'
              content={addMemberPopoverContent}
              trigger='click'
            >
              <Button type='primary'>Ajouter un membre</Button>
            </Popover>
          </div>
          <Table
            columns={membersColumns}
            dataSource={membersData}
            scroll={{ x: 150 }}
          />
        </>
      )}
    </div>
  );
}
