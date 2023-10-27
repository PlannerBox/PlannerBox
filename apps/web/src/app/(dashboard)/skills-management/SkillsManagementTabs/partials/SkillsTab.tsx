'use client';

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, Popover, Space, Table, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  CreateSkillProps,
  CreateSkillResponse,
  UpdateSkillProps,
} from 'api-client';
import { ReactNode } from 'react';
import { useCreateSkill } from '../../../../../hooks/useCreateSkill';
import { useListSkills } from '../../../../../hooks/useListSkills';
import { useUpdateSkill } from '../../../../../hooks/useUpdateSkill';

type SkillsTabProps = {
  step?: 'list';
};

type OpenNotificationProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export default function SkillsTab({ step = 'list' }: SkillsTabProps) {
  interface SkillsDataType {
    key: string;
    id: string;
    name: string;
    internal_teachers: number;
    external_teachers: number;
  }

  type SkillFieldType = {
    name?: string;
  };

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

  const { data: skills, isLoading: skillsLoading } = useListSkills({});
  const data = skills
    ? skills.data.map((s) => ({
        key: s.id,
        name: s.name,
        internal_teachers: s.internTeachersNumber,
        external_teachers: s.externTeachersNumber,
      }))
    : [];

  const [creationForm] = Form.useForm<CreateSkillProps>();
  const skillNameCreationValue = Form.useWatch('name', creationForm);

  const onSkillCreationSuccess = (data: CreateSkillResponse) => {
    console.log('Success:', data);
    if (!!data) {
      openNotification({
        title: 'Compétence créée avec succès !',
        icon: <CheckCircleOutlined />,
      });
      creationForm.resetFields();
      queryClient.invalidateQueries({ queryKey: ['useListSkills'] });
    } else {
      openNotification({
        title: 'Une erreur est survenue lors de la création de la compétence !',
        icon: <CloseCircleOutlined />,
      });
    }
  };

  const onSkillCreationFailed = () => {
    console.log('Failed');
    openNotification({
      title: 'Une erreur est survenue lors de la création de la compétence !',
      icon: <CloseCircleOutlined />,
    });
  };

  const onSkillCreationReset = () => {
    creationForm.resetFields();
  };

  const { mutate: fetchSkillCreation, isLoading: skillCreationLoading } =
    useCreateSkill({
      onSuccess: onSkillCreationSuccess,
      onError: onSkillCreationFailed,
    });

  const onSkillCreationFinish = (values: CreateSkillProps) => {
    fetchSkillCreation(values);
  };

  const addSkillPopoverContent = () => (
    <Form
      name='basic'
      initialValues={{}}
      onFinish={onSkillCreationFinish}
      autoComplete='off'
      form={creationForm}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-12)',
      }}
    >
      <Form.Item<SkillFieldType> name='name' style={{ margin: 0 }}>
        <Input />
      </Form.Item>

      <Form.Item style={{ margin: 0 }}>
        <Button
          type='primary'
          htmlType='submit'
          disabled={(skillNameCreationValue?.length || 0) <= 0}
          loading={skillCreationLoading}
        >
          Créer
        </Button>
      </Form.Item>
    </Form>
  );

  const [editForm] = Form.useForm<UpdateSkillProps>();
  const skillNameEditValue = Form.useWatch('name', editForm);

  const onSkillUpdateSuccess = (data: CreateSkillResponse) => {
    console.log('Success:', data);
    if (!!data) {
      openNotification({
        title: 'Compétence modifiée avec succès !',
        icon: <CheckCircleOutlined />,
      });
      editForm.resetFields();
      queryClient.invalidateQueries({ queryKey: ['useListSkills'] });
    } else {
      openNotification({
        title:
          'Une erreur est survenue lors de la modification de la compétence !',
        icon: <CloseCircleOutlined />,
      });
    }
  };

  const onSkillUpdateFailed = () => {
    console.log('Failed');
    openNotification({
      title:
        'Une erreur est survenue lors de la modification de la compétence !',
      icon: <CloseCircleOutlined />,
    });
  };

  const { mutate: fetchEditSkill } = useUpdateSkill({
    onSuccess: onSkillUpdateSuccess,
    onError: onSkillUpdateFailed,
  });

  const onSkillEditFinish = (values: UpdateSkillProps) => {
    fetchEditSkill(values);
  };

  const onSkillEditReset = () => {
    editForm.resetFields();
  };

  const editSkillPopoverContent = (id: string, defaultValue: string) => (
    <Form
      name='basic'
      initialValues={{}}
      onFinish={onSkillEditFinish}
      autoComplete='off'
      form={editForm}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-12)',
      }}
    >
      <Form.Item<SkillFieldType> name='name' style={{ margin: 0 }}>
        <Input defaultValue={defaultValue} />
      </Form.Item>

      <Form.Item name='id' noStyle>
        <Input value={id} type='hidden' />
      </Form.Item>

      <Form.Item style={{ margin: 0 }}>
        <Button
          type='primary'
          htmlType='submit'
          disabled={(skillNameEditValue?.length || 0) <= 0}
        >
          Modifier
        </Button>
      </Form.Item>
    </Form>
  );

  const skillsColumns: ColumnsType<SkillsDataType> = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Formateurs internes',
      dataIndex: 'internal_teachers',
      key: 'internal_teachers',
    },
    {
      title: 'Formateurs externes',
      dataIndex: 'external_teachers',
      key: 'external_teachers',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Popover
            placement='leftTop'
            title='Nom de la compétence'
            content={() => editSkillPopoverContent(record.id, record.name)}
            trigger='click'
            onOpenChange={onSkillEditReset}
          >
            <EditOutlined />
          </Popover>
          <MoreOutlined />
        </Space>
      ),
    },
  ];

  return (
    <div>
      {notificationContextHolder}
      {step === 'list' && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              margin: 'var(--spacing-16) var(--spacing-8)',
            }}
          >
            <Popover
              placement='leftTop'
              title='Nom de la compétence'
              content={addSkillPopoverContent}
              trigger='click'
              onOpenChange={onSkillCreationReset}
            >
              <Button type='primary'>Créer une compétence</Button>
            </Popover>
          </div>
          <Table
            columns={skillsColumns}
            dataSource={data}
            scroll={{ x: 150 }}
            loading={skillsLoading}
          />
        </>
      )}
    </div>
  );
}
