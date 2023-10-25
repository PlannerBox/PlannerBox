import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  FundProjectionScreenOutlined,
  IdcardOutlined,
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
import { EventType, GroupData, Role, ScheduleEventResponse } from 'api-client';
import { ReactNode, useEffect } from 'react';
import { useListRooms } from '../../../../../../hooks/useListRooms';
import { useListSkills } from '../../../../../../hooks/useListSkills';
import { useListUsers } from '../../../../../../hooks/useListUsers';
import { useScheduleEvent } from '../../../../../../hooks/useScheduleEvent';
import styles from './styles.module.scss';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface ScheduleEventFormProps {
  initialGroup?: GroupData;
  initialEventType: EventType;
}

type TimeRangeType = {
  $H: string;
  $m: string;
};

type ScheduleEventFormData = {
  skill: string;
  dateRange: string[];
  timeRange: TimeRangeType[];
  groupId: string;
  teachers: string[];
  material: string[];
  room: string;
};

type OpenNotificationProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

const ScheduleEventForm = ({
  initialGroup,
  initialEventType,
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
        title: 'Utilisateur créé avec succès !',
        icon: <CheckCircleOutlined />,
      });
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['listEvents'] });
    } else {
      openNotification({
        title: "Une erreur est survenue lors de la création de l'utilisateur !",
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

  const {
    mutate: scheduleEvent,
    isLoading,
    isSuccess,
    error,
  } = useScheduleEvent({ onSuccess: handleSuccess, onError: handleError });

  const onFinish = (values: ScheduleEventFormData) => {
    // Schedule event
    console.log({ values });
    let startDate = new Date(values.dateRange[0].toString());
    startDate.setHours(parseInt(values.timeRange[0].$H));
    startDate.setMinutes(parseInt(values.timeRange[0].$m));

    let endDate = new Date(values.dateRange[0].toString());
    startDate.setHours(parseInt(values.timeRange[1].$H));
    startDate.setMinutes(parseInt(values.timeRange[1].$m));

    const selectedSkill = skills?.data.find((s) => s.id === values.skill);

    scheduleEvent({
      parent: {
        skills: [selectedSkill?.id || ''],
        teachers: [...values.teachers],
        groupId: initialGroup?.id || '',
        roomId: values.room,
        startDate: startDate.toLocaleDateString(),
        endDate: endDate.toLocaleDateString(),
        name: selectedSkill?.name || '',
        eventType: EventType.Class,
      },
      children: [],
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
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name='skill'
          rules={[{ required: true }]}
          className={styles.formItem}
        >
          <Select
            placeholder='Select a skill'
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
        >
          <DatePicker.RangePicker
            style={fullWidth}
            onChange={(newValue) =>
              form.setFieldsValue({
                dateRange: newValue,
              })
            }
          />
        </Form.Item>

        <Form.Item
          name='timeRange'
          rules={[{ required: true }]}
          className={styles.formItem}
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
          initialValue={initialGroup?.id}
          className={styles.formItem}
        >
          <TeamOutlined size={16} color={initialGroup?.color} />{' '}
          {initialGroup?.name}
        </Form.Item>

        <Form.Item
          name='teachers'
          rules={[{ required: true }]}
          className={styles.formItem}
        >
          <IdcardOutlined size={16} />
          <Select
            mode='multiple'
            placeholder='Select teachers'
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
          name='room'
          rules={[{ required: true }]}
          className={styles.formItem}
        >
          <FundProjectionScreenOutlined size={16} />
          <Select
            placeholder='Select a room'
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

        <Form.Item
          name='material'
          rules={[{ required: true }]}
          className={styles.formItem}
        >
          <FundProjectionScreenOutlined size={16} />
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
      </Form>
    </>
  );
};

export default ScheduleEventForm;
