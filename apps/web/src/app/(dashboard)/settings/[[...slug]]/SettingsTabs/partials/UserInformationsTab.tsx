'use client';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, notification } from 'antd';
import {
  ListUsersProps,
  UpdateUserProps,
  UpdateUserResponse,
} from 'api-client';
import { ReactNode, useState } from 'react';
import { useListUsers } from '../../../../../../hooks/useListUsers';
import { useUpdateUser } from '../../../../../../hooks/useUpdateUser';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

type OpenNotificationProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export default function UserInformationsTab() {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

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

  const [listUsersOptions, setListUsersOptions] = useState<ListUsersProps>({
    filter: undefined,
    limit: 9,
    page: 1,
  });

  const { data: userInformations } = useListUsers(listUsersOptions);

  const { mutate: updateUser } = useUpdateUser({
    onSuccess: handleUpdateUserSuccess,
    onError: handleUpdateUserStateError,
  });

  function handleUpdateUserSuccess(data: UpdateUserResponse) {
    if (!!data) {
      openNotification({
        title: 'Informations personnelles mises à jour !',
        icon: <CheckCircleOutlined />,
      });
      queryClient.invalidateQueries({ queryKey: ['listUsers'] });
    } else {
      openNotification({
        title:
          'Une erreur est survenue lors de la mise à jour des informations personnelles !',
        icon: <CloseCircleOutlined />,
      });
    }
  }

  function handleUpdateUserStateError() {
    openNotification({
      title:
        'Une erreur est survenue lors de la mise à jour des informations personnelles !',
      icon: <CloseCircleOutlined />,
    });
  }

  const onFinish = (values: UpdateUserProps) => {
    updateUser({
      id: userInformations!.data[0].id,
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
    });
    console.log(values);
  };

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
      <Form.Item name='lastname' label='Nom' rules={[{ required: true }]}>
        <Input defaultValue='Alberto' />
      </Form.Item>
      <Form.Item name='firstname' label='Prénom' rules={[{ required: true }]}>
        <Input defaultValue='Roberto' />
      </Form.Item>
      <Form.Item
        name='username'
        label='Adresse mail'
        rules={[{ required: true, type: 'email' }]}
      >
        <Input defaultValue='roberto.alberto@gmail.com' />
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
          Enregistrer les modifications
        </Button>
      </Form.Item>
    </Form>
  );
}
