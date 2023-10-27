import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  FundProjectionScreenOutlined,
  IdcardOutlined,
  ProfileOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Select,
  TimePicker,
  notification,
} from 'antd';
import {
  EventType,
  GroupData,
  ListRoomsData,
  Role,
  ScheduleEventResponse,
  UserDetailsData,
  formatDateToISO8601,
} from 'api-client';
import { ReactNode, useEffect } from 'react';
import { useListRooms } from '../../../../../../hooks/useListRooms';
import { useListSkills } from '../../../../../../hooks/useListSkills';
import { useListUsers } from '../../../../../../hooks/useListUsers';
import { useUpdateScheduledEvent } from '../../../../../../hooks/useUpdateScheduledEvent';
import styles from './styles.module.scss';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface ScheduleEventFormProps {
  initialGroup?: GroupData;
  event: ScheduleEventFormData;
  eventId: string;
}

type TimeRangeType = {
  $H: string;
  $m: string;
  $d: string;
};

type ScheduleEventFormData = {
  skill: string;
  dateRange: string[];
  timeRange: TimeRangeType[];
  groupId: string;
  teachers: UserDetailsData[];
  material: string[];
  room: ListRoomsData;
};

type OpenNotificationProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

const ScheduledEventEdit = ({
  initialGroup,
  event,
  eventId,
}: ScheduleEventFormProps) => {
  const [form] = Form.useForm();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  const queryClient = useQueryClient();

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

  const {
    data: skills,
    isLoading: isSkillsLoading,
    refetch: refetchSkills,
  } = useListSkills({});
  const listUsersOptions = {
    filter: {
      roles: [Role.ExternTeacher, Role.InternTeacher],
    },
    limit: 1000,
    page: 1,
  };
  const {
    data: teachers,
    isLoading: isTeachersLoading,
    refetch: refetchTeachers,
  } = useListUsers(listUsersOptions);
  const {
    data: rooms,
    isLoading: isRoomsLoading,
    refetch: refetchRooms,
  } = useListRooms({});

  function handleSuccess(data: ScheduleEventResponse) {
    if (!!data) {
      openNotification({
        title: 'Événement planifié avec succès !',
        icon: <CheckCircleOutlined />,
      });
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['listEvents'] });
    } else {
      openNotification({
        title:
          "Une erreur est survenue lors de la planification de l'événement !",
        icon: <CloseCircleOutlined />,
      });
    }
  }

  function handleError() {
    openNotification({
      title: "Une erreur est survenue lors de la création de l'utilisateur !",
      icon: <CloseCircleOutlined />,
    });
  }

  const { mutate: scheduleEvent, isLoading } = useUpdateScheduledEvent({});

  const onFinish = (values: ScheduleEventFormData) => {
    // Schedule event
    console.log({ values });
    let startTime = new Date(values.timeRange[0].$d);
    let endTime = new Date(values.timeRange[1].$d);

    let from = new Date(values.dateRange[0]);
    let to = new Date(values.dateRange[1]);

    let startDate = new Date(values.dateRange[0]);
    startDate.setHours(startTime.getHours());
    startDate.setMinutes(startTime.getMinutes());
    startDate.setSeconds(0);

    let endDate = new Date(values.dateRange[1]);
    endDate.setHours(endTime.getHours());
    endDate.setMinutes(endTime.getMinutes());
    endDate.setSeconds(0);

    const selectedSkill = skills?.data.find((s) => s.id === values.skill);

    const generateChildren = (
      from: Date,
      to: Date,
      startTime: Date,
      endTime: Date
    ) => {
      const children = [];

      // Créez une copie de la date `from` pour la boucle
      const currentDate = new Date(from);

      while (currentDate < to) {
        // Créez une copie de la date courante en utilisant les heures et minutes de `startTime`
        const startDate = new Date(currentDate);
        startDate.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);

        // Créez une copie de la date courante en utilisant les heures et minutes de `endTime`
        const endDate = new Date(currentDate);
        endDate.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

        children.push({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        });

        // Avancez d'un jour
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return children;
    };

    scheduleEvent({
      id: eventId,
      skills: [selectedSkill?.id || ''],
      teachers: [...values.teachers],
      group: initialGroup!,
      room: values.room,
      startDate: formatDateToISO8601(startDate),
      endDate: formatDateToISO8601(endDate),
      name: selectedSkill?.name || '',
      eventType: EventType.Class,
    });
  };

  useEffect(() => {}, [form]);

  const availableMaterial = [
    { label: 'Postes informatiques', value: 'computers' },
    { label: 'Places assises', value: 'seats' },
    { label: 'Connexion internet', value: 'internet' },
    { label: 'Caméra', value: 'camera' },
    { label: 'Microphone', value: 'microphone' },
  ];

  const fullWidth = {
    width: '100%',
  };

  return (
    <>
      {notificationContextHolder}
      <Form
        {...layout}
        form={form}
        name='schedule-event-form'
        onFinish={onFinish}
        style={{ maxWidth: '80vw' }}
        labelCol={{ style: { width: 200 } }}
        wrapperCol={{ style: { width: '100%' } }}
      >
        <Form.Item
          name='skill'
          rules={[{ required: true }]}
          className={styles.formItem}
          initialValue={event.skill}
        >
          <Select
            placeholder='Sélectionner la compétence enseignée'
            loading={isSkillsLoading}
            style={fullWidth}
            onChange={(newValue) =>
              form.setFieldsValue({
                skill: newValue,
              })
            }
          >
            {skills?.data.map((skill) => (
              <Option key={skill.id} value={skill.id}>
                {skill.name}
              </Option>
            ))}
          </Select>
          <Button type='primary' htmlType='submit' icon={<CheckOutlined />} />
        </Form.Item>

        <Form.Item
          name='dateRange'
          rules={[{ required: true }]}
          className={styles.formItem}
          initialValue={event.dateRange}
        >
          <DatePicker.RangePicker
            style={fullWidth}
            onChange={(newValue) =>
              form.setFieldsValue({
                dateRange: newValue,
              })
            }
            format='DD/MM/YYYY'
          />
        </Form.Item>

        <Form.Item
          name='timeRange'
          rules={[{ required: true }]}
          className={styles.formItem}
          initialValue={event.timeRange}
        >
          <TimePicker.RangePicker
            format='HH:mm'
            style={fullWidth}
            onChange={(newValue) =>
              form.setFieldsValue({
                timeRange: newValue,
              })
            }
          />
        </Form.Item>

        <Divider />

        <Form.Item
          name='groupId'
          initialValue={event.groupId}
          className={styles.formItem}
        >
          <TeamOutlined size={16} style={{ color: initialGroup?.color }} />{' '}
          {initialGroup?.name}
        </Form.Item>

        <Form.Item
          name='teachers'
          rules={[{ required: true }]}
          className={styles.formItem}
          initialValue={event.teachers}
        >
          <IdcardOutlined size={16} />
          <Select
            mode='multiple'
            placeholder='Sélectionner le(s) formateur(s)'
            loading={isTeachersLoading}
            style={fullWidth}
            onChange={(newValue) =>
              form.setFieldsValue({
                teachers: newValue,
              })
            }
          >
            {teachers?.data.map((teacher) => (
              <Option key={teacher.id} value={teacher.id}>
                {teacher.firstname} {teacher.lastname}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name='material'
          rules={[{ required: true }]}
          className={styles.formItem}
          initialValue={event.material}
        >
          <ProfileOutlined size={16} />
          <Checkbox.Group
            options={availableMaterial}
            style={fullWidth}
            onChange={(newValue) =>
              form.setFieldsValue({
                material: newValue,
              })
            }
          />
        </Form.Item>

        <Form.Item
          name='room'
          rules={[{ required: true }]}
          className={styles.formItem}
          initialValue={event.room}
        >
          <FundProjectionScreenOutlined size={16} />
          <Select
            placeholder='Sélectionner une salle'
            loading={isRoomsLoading}
            style={fullWidth}
            onChange={(newValue) =>
              form.setFieldsValue({
                room: newValue,
              })
            }
          >
            {rooms?.data.map((room) => (
              <Option key={room.id} value={room.id}>
                {room.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};

export default ScheduledEventEdit;
