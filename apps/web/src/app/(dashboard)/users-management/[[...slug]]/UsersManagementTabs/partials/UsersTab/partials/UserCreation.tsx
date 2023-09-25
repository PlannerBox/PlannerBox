import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  Select,
  Switch,
} from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { SignUpProps, SignUpResponse } from 'api-client';
import { FormationMode } from '../../../../../../../../enums/FormationMode';
import { Role } from '../../../../../../../../enums/Role';
import { useSignUp } from '../hooks/useSignUp';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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

const UserCreation = () => {
  const [form] = Form.useForm();

  const {
    mutate: fetchSignUp,
    isLoading,
    isSuccess,
    error,
  } = useSignUp({ onSuccess: handleSuccess, onError: handleError });

  const userAlreadyCreated = false;

  function handleSuccess(data: SignUpResponse) {
    if (!!data) {
    } else {
      ('Une erreur est survenue lors de la connexion. Veuillez réessayer');
    }
  }

  function handleError() {
    ('Adresse mail');
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

  const onRoleChange = (value: Role) => {
    if (
      value === Role.Admin ||
      value === Role.InternTeacher ||
      value === Role.ExternTeacher
    ) {
      form.setFieldsValue({ formationMode: undefined, groups: undefined });
    }
  };

  const filterGroups = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  return (
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
      <Form.Item name='firstname' label='Prénom' rules={[{ required: true }]}>
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
                  <Option value={FormationMode.Presentiel}>Présentiel</Option>
                  <Option value={FormationMode.Distanciel}>Distanciel</Option>
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
        <Button type='primary' htmlType='submit'>
          Créer l&apos;utilisateur
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserCreation;
