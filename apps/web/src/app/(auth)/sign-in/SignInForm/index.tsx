'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSignIn } from './hooks';
import styles from './styles.module.scss';

export default function SignInForm() {
  const router = useRouter();
  const { Text } = Typography;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [form] = Form.useForm();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isDisabled = username.length === 0 && password.length === 0;

  const handleSuccess = () => {
    router.push('/dashboard');
  };

  const {
    data,
    mutate: fetchSignIn,
    isLoading,
    isError,
    isSuccess,
  } = useSignIn({ onSuccess: handleSuccess });

  const onFinish = () => {
    fetchSignIn({ username: username, password: password });
  };

  return (
    <Form
      form={form}
      layout='vertical'
      className={styles.wrapper}
      onFinish={onFinish}
      hideRequiredMark
    >
      <Text className={styles.title}>Bon retour parmi nous !</Text>
      <Text className={styles.details} type='secondary'>
        Merci de vous connecter pour accéder à la plateforme
      </Text>
      {isError && (
        <div className={styles.error}>
          <Alert
            message='Adresse mail ou mot de passe incorrect'
            type='error'
            showIcon
          />
        </div>
      )}
      <div className={styles.inputs}>
        <Form.Item name='username' label="Nom d'utilisateur" required>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item label='Mot de passe' name='password' required>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Mot de passe'
            prefix={<LockOutlined />}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: () => setPasswordVisible(!passwordVisible),
            }}
          />
        </Form.Item>
      </div>
      <div className={styles.actions}>
        <Button
          htmlType='submit'
          type='primary'
          loading={isLoading || isSuccess}
          disabled={isDisabled}
        >
          Se connecter
        </Button>
        <Button type='link'>Mot de passe oublié</Button>
      </div>
    </Form>
  );
}
