'use client';

import {
  ArrowLeftOutlined,
  EditOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from 'antd';
import { PresetColorType, PresetStatusColorType } from 'antd/es/_util/colors';
import { LiteralUnion } from 'antd/es/_util/type';
import type { DefaultOptionType } from 'antd/es/cascader';
import { ColumnsType } from 'antd/es/table';
import { SignUpProps, SignUpResponse } from 'api-client';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FormationMode } from '../../../../../../enums/FormationMode';
import { Role } from '../../../../../../enums/Role';
import { useSignUp } from './UsersTab/hooks/useSignUp';

type UsersTabProps = {
  step?: 'list' | 'create';
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

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function UsersTab({ step = 'list' }: UsersTabProps) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>([]);

  const {
    mutate: fetchSignUp,
    isLoading,
    isSuccess,
  } = useSignUp({ onSuccess: handleSuccess, onError: handleError });

  function handleSuccess(data: SignUpResponse) {
    if (!!data) {
    } else {
      setErrorMessage(
        'Une erreur est survenue lors de la connexion. Veuillez réessayer'
      );
    }
  }

  function handleError() {
    setErrorMessage('Adresse mail');
  }

  const onFinish = (values: SignUpProps) => {
    console.log(values);
    fetchSignUp(values);
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

  const shallowRedirect = useCallback(
    (key: string) => {
      router.push(`/users-management/${key}`, { shallow: true });
    },
    [router]
  );

  const onRoleChange = (value: Role) => {
    if (
      value === Role.Admin ||
      value === Role.InternTeacher ||
      value === Role.ExternTeacher
    ) {
      form.setFieldsValue({ formationMode: undefined, groups: undefined });
    }
  };

  const userAlreadyCreated =
    errors.find((error) => error === 'User already created') !== undefined;

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
            <Button
              type='primary'
              onClick={() => shallowRedirect('/users/create')}
            >
              Créer un utilisateur
            </Button>
          </div>
          <Table columns={columns} dataSource={data} scroll={{ x: 150 }} />
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
          <Form.Item name='role' label='Type' rules={[{ required: true }]}>
            <Select
              placeholder='Sélectionner une option'
              allowClear
              onChange={onRoleChange}
            >
              <Option value={Role.Student}>Apprenant</Option>
              <Option value={Role.InternTeacher}>Formateur interne</Option>
              <Option value={Role.ExternTeacher}>Formateur externe</Option>
              <Option value={Role.Admin}>Administrateur</Option>
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
            name='username'
            label='Adresse mail'
            rules={[{ required: true, type: 'email' }]}
            help={
              userAlreadyCreated
                ? 'Adresse mail déjà utilisée par un utilisateur'
                : undefined
            }
            status={userAlreadyCreated ? 'error' : undefined}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='password'
            label='Mot de passe'
            rules={[{ required: true, type: 'string' }]}
          >
            <Input type='password' />
          </Form.Item>
          <Form.Item
            name='birthDate'
            label='Date de naissance'
            rules={[{ required: true, type: 'date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name='birthPlace'
            label='Lieu de naissance'
            rules={[{ required: true, type: 'string' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.role !== currentValues.role
            }
          >
            {({ getFieldValue }) =>
              getFieldValue('role') === 'student' && (
                <>
                  <Form.Item
                    name='formationMode'
                    label="Méthode d'organisation"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder='Sélectionner une option' allowClear>
                      <Option value={FormationMode.Presentiel}>
                        Présentiel
                      </Option>
                      <Option value={FormationMode.Distanciel}>
                        Distanciel
                      </Option>
                      <Option value={FormationMode.Hybride}>
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
                </>
              )
            }
          </Form.Item>
          <Form.Item
            name='switch'
            label='État'
            valuePropName='checked'
            help={
              'Un compte activé permet à l’utilisateur de se connecter, tandis qu’un compte désactivé bloque sa connexion.'
            }
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
    </div>
  );
}
