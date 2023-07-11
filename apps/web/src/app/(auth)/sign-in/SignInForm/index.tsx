'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { SignInResponse } from 'api-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { removeAfterSemicolon } from '../../../../utils/string';
import { useSignIn } from './hooks';
import styles from './styles.module.scss';

export default function SignInForm() {
  const router = useRouter();
  const { Text } = Typography;
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [form] = Form.useForm();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined
  );
  const isDisabled = username.length === 0 && password.length === 0;

  const [cookies, setCookie] = useCookies(['session', 'session_refresher']);

  const {
    data,
    mutate: fetchSignIn,
    isLoading,
    isSuccess,
  } = useSignIn({ onSuccess: handleSuccess, onError: handleError });

  function handleSuccess(data: SignInResponse) {
    if (!!data) {
      setCookie('session', removeAfterSemicolon(data.access_token), {
        path: '/',
        secure: false,
      });
      setCookie('session_refresher', removeAfterSemicolon(data.refresh_token), {
        path: '/',
        secure: false,
      });
      router.push('/dashboard');
    } else {
      setErrorMessage(
        'Une erreur est survenue lors de la connexion. Veuillez réessayer'
      );
    }
  }

  function handleError() {
    setErrorMessage('Adresse mail ou mot de passe incorrect');
  }

  const onFinish = () => {
    setErrorMessage(undefined);
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
      {!!errorMessage && (
        <div className={styles.error}>
          <Alert message={errorMessage} type='error' showIcon />
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
          loading={isLoading || (isSuccess && !errorMessage)}
          disabled={isDisabled}
        >
          Se connecter
        </Button>
        <Button type='link'>Mot de passe oublié</Button>
      </div>
    </Form>
  );
}
