import {
  FundProjectionScreenOutlined,
  IdcardOutlined,
  ProfileOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Divider, Form } from 'antd';
import { EventsWithDetailsType } from '../../../../../components/Calendar';
import styles from './styles.module.scss';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface ScheduledEventDetailsProps {
  event: EventsWithDetailsType;
}

const ScheduledEventDetails = ({ event }: ScheduledEventDetailsProps) => {
  const availableMaterial = [
    { label: 'Postes informatiques', value: 'computers' },
    { label: 'Places assises', value: 'seats' },
    { label: 'Connexion internet', value: 'internet' },
    { label: 'Caméra', value: 'camera' },
    { label: 'Microphone', value: 'microphone' },
  ];

  return (
    <Form
      {...layout}
      name='schedule-event-form'
      style={{ maxWidth: '80vw' }}
      labelCol={{ style: { width: 200 } }}
      wrapperCol={{ style: { width: '100%' } }}
    >
      <Form.Item name='skill' className={styles.formItem}>
        {event.event.title}
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
