import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  FundProjectionScreenOutlined,
  IdcardOutlined,
  ProfileOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Divider, Form, notification } from 'antd';
import { DeleteEventResponse } from 'api-client';
import { ReactNode, useState } from 'react';
import { useDeleteEvent } from '../../../../../../hooks/useDeleteEvent';
import { EventsWithDetailsType } from '../../../../../components/Calendar';
import ScheduledEventEdit from '../ScheduledEventEdit.tsx';
import styles from './styles.module.scss';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface ScheduledEventDetailsProps {
  event: EventsWithDetailsType;
}

type OpenNotificationProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

const ScheduledEventDetails = ({ event }: ScheduledEventDetailsProps) => {
  const availableMaterial = [
    { label: 'Postes informatiques', value: 'computers' },
    { label: 'Places assises', value: 'seats' },
    { label: 'Connexion internet', value: 'internet' },
    { label: 'Caméra', value: 'camera' },
    { label: 'Microphone', value: 'microphone' },
  ];

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

  const handleSuccess = (data: DeleteEventResponse) => {
    console.log('Success:', data);
    if (!!data) {
      openNotification({
        title: 'Evenement supprimé avec succès !',
        icon: <CheckCircleOutlined />,
      });
      queryClient.invalidateQueries({ queryKey: ['listEvents'] });
    } else {
      openNotification({
        title:
          "Une erreur est survenue lors de la suppression de l'événement !",
        icon: <CloseCircleOutlined />,
      });
    }
  };

  const handleError = () => {
    console.log('Failed');
    openNotification({
      title: "Une erreur est survenue lors de la suppression de l'événement !",
      icon: <CloseCircleOutlined />,
    });
  };

  const { mutate: deleteEvent } = useDeleteEvent({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const [display, setDisplay] = useState<'details' | 'edit'>('details');

  if (display === 'edit') {
    return (
      <ScheduledEventEdit
        event={event.event.extendedProps}
        eventId={event.event.extendedProps.id}
      />
    );
  }

  return (
    <Form
      {...layout}
      name='schedule-event-form'
      style={{ maxWidth: '80vw' }}
      labelCol={{ style: { width: 200 } }}
      wrapperCol={{ style: { width: '100%' } }}
    >
      {notificationContextHolder}
      <Form.Item name='skill' className={styles.formItem}>
        {event.event.title}
        <Button
          type='text'
          icon={<EditOutlined />}
          onClick={() => setDisplay('edit')}
        />
        <Button
          type='text'
          icon={
            <DeleteOutlined
              onClick={() => deleteEvent({ id: event.event.extendedProps.id })}
            />
          }
        />
      </Form.Item>

      <Form.Item name='dateRange' className={styles.formItem}>
        {new Date(event.event.extendedProps.startDate).toLocaleString()} ⋅{' '}
        {new Date(event.event.extendedProps.startDate).getHours()}h à{' '}
        {new Date(event.event.extendedProps.endDate).getHours()}h
      </Form.Item>

      <Divider />

      <Form.Item name='groupId' className={styles.formItem}>
        <TeamOutlined size={16} color='' />
        {event.event.extendedProps.group.name}
      </Form.Item>

      <Form.Item name='teachers' className={styles.formItem}>
        <IdcardOutlined
          size={16}
          style={{ color: event.event.extendedProps.group.color }}
        />
        <div>
          {event.event.extendedProps.teachers.map((t) => (
            <>
              {t.firstname} {t.lastname.toUpperCase()}
              <br />
            </>
          ))}
        </div>
      </Form.Item>

      <Form.Item name='material' className={styles.formItem}>
        <ProfileOutlined size={16} /> Aucun matériel requis
      </Form.Item>

      <Form.Item name='room' className={styles.formItem}>
        <FundProjectionScreenOutlined size={16} />
        {event.event.extendedProps.room.name}
      </Form.Item>
    </Form>
  );
};

export default ScheduledEventDetails;
