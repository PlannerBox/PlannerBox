'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Input, Typography } from 'antd';
import { useState } from 'react';
import styles from './styles.module.scss';

export default function SignInForm() {
  const { Text } = Typography;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className={styles.wrapper}>
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
        <Input placeholder="Nom d'utilisateur" prefix={<UserOutlined />} />
        <Input.Password
          placeholder='Mot de passe'
          prefix={<LockOutlined />}
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
        />
      </div>
      <div className={styles.actions}>
        <Button type='primary' disabled>
          Se connecter
        </Button>
        <Button type='link'>Mot de passe oublié</Button>
      </div>
    </div>
  );
}
