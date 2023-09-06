'use client';

import { EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popover, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

type SkillsTabProps = {
  step?: 'list';
};

interface SkillsDataType {
  key: string;
  name: string;
  internal_teachers: number;
  external_teachers: number;
}

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
    render: () => (
      <Space size='middle'>
        <EditOutlined />
        <MoreOutlined />
      </Space>
    ),
  },
];

const skillsData: SkillsDataType[] = [
  {
    key: '1',
    name: 'Big Data',
    internal_teachers: 0,
    external_teachers: 3,
  },
  {
    key: '2',
    name: 'Big Data',
    internal_teachers: 42,
    external_teachers: 12,
  },
  {
    key: '3',
    name: 'Big Data',
    internal_teachers: 32,
    external_teachers: 99,
  },
];

type SkillFieldType = {
  name?: string;
};

export default function SkillsTab({ step = 'list' }: SkillsTabProps) {
  const [form] = Form.useForm<SkillFieldType>();
  const skillNameValue = Form.useWatch('name', form);

  const onSkillCreationFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onSkillCreationFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onSkillCreationReset = () => {
    form.resetFields();
  };

  const addSkillPopoverContent = () => (
    <Form
      name='basic'
      initialValues={{}}
      onFinish={onSkillCreationFinish}
      onFinishFailed={onSkillCreationFinishFailed}
      autoComplete='off'
      form={form}
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
          disabled={(skillNameValue?.length || 0) <= 0}
        >
          Créer
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div>
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
            dataSource={skillsData}
            scroll={{ x: 150 }}
          />
        </>
      )}
    </div>
  );
}
