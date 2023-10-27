import { Button, Typography } from 'antd';
import { UserData } from 'api-client';
import styles from './styles.module.scss';

export type UserElementProps = UserData;

export default function UserElement({
  firstname,
  lastname,
  username,
}: UserElementProps) {
  const { Text } = Typography;

  return (
    <Button className={styles.userElement} type='text'>
      <Text>
        {firstname} {lastname}
      </Text>
      <Text type='secondary'>{username}</Text>
    </Button>
  );
}
